<script>
  import { onMount } from 'svelte';
  import LaceBorder from './LaceBorder.svelte';
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const ui = $derived(i18n.wedding.ui);

  const ROWS = 4;
  const COLS = 10;
  const BRICK_GAP_RATIO = 0.01;
  const BRICK_TOP_RATIO = 0.06;
  const BRICK_HEIGHT_RATIO = 0.065;
  const BALL_RADIUS_RATIO = 0.018;
  const SPEED_BUMP = 1.045;
  const PADDLE_WIDTH_RATIO = 0.15;
  const PADDLE_HEIGHT_RATIO = 0.02;
  const PADDLE_BOTTOM_RATIO = 0.05;
  const CREEP_PX_RATIO = 0.008;
  const CREEP_BASE_INTERVAL = 300;
  const CREEP_MIN_INTERVAL = 60;
  const MAX_LIVES = 5;

  /**
   * Classic Breakout started as a solid wall, then later games (Arkanoid-style)
   * used patterned screens. These keep our 4×10 grid and open lanes / shapes.
   * 1 = heart brick, 0 = empty.
   */
  const LEVELS = [
    // 1 — full wall
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // 2 — center corridor (classic “breakout” lane)
    [
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
    ],
    // 3 — checkerboard
    [
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
    ],
    // 4 — pyramid / V
    [
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1]
    ],
    // 5 — twin towers
    [
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1]
    ],
    // 6 — heart silhouette
    [
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    // 7 — stairs / zig
    [
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 1]
    ],
    // 8 — diamond
    [
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1]
    ]
  ];

  let canvas;
  let ctx;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let gameState = $state('idle');
  let lives = $state(MAX_LIVES);
  let level = $state(0);
  let animFrame;
  let frameCount = 0;
  let nextCreepFrame = CREEP_BASE_INTERVAL;
  let destroyedCount = 0;
  let multiBallSpawned = false;
  let currentSpeed = 0;
  let totalBricks = 0;

  let heartImg;
  let ballImg;
  let imagesLoaded = $state(false);

  let balls = [];
  let paddle = { x: 0, y: 0, w: 0, h: 0 };
  let paddleVx = 0;
  let bricks = [];

  const levelNumber = $derived(level + 1);

  function makeBall(x, y, dx, dy) {
    return { x, y, dx, dy, r: w * BALL_RADIUS_RATIO };
  }

  /** Wider boards used to feel too fast; phones too slow — keep speed near constant. */
  function getBaseSpeed() {
    const mobile = 4.8;
    const desktop = 3.15;
    const t = Math.min(1, Math.max(0, (w - 360) / 520));
    return mobile + (desktop - mobile) * t;
  }

  function multiBallThreshold() {
    return Math.max(3, Math.ceil(totalBricks / 2));
  }

  function initSizes() {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    w = rect.width;
    h = w * 0.75;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;
  }

  function buildBricks() {
    const gap = w * BRICK_GAP_RATIO;
    const brickW = (w - gap * (COLS + 1)) / COLS;
    const brickH = h * BRICK_HEIGHT_RATIO;
    const topOffset = h * BRICK_TOP_RATIO;
    const layout = LEVELS[level];

    bricks = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!layout[r][c]) continue;
        bricks.push({
          r,
          c,
          x: gap + c * (brickW + gap),
          y: topOffset + r * (brickH + gap),
          w: brickW,
          h: brickH,
          alive: true
        });
      }
    }
    totalBricks = bricks.length;
  }

  function placePaddleAndBall() {
    paddle.w = w * PADDLE_WIDTH_RATIO;
    paddle.h = h * PADDLE_HEIGHT_RATIO;
    paddle.y = h - h * PADDLE_BOTTOM_RATIO - paddle.h;
    paddle.x = w / 2 - paddle.w / 2;
    balls = [makeBall(w / 2, paddle.y - w * BALL_RADIUS_RATIO - 2, 0, 0)];
  }

  function resetLevelState({ resetLives = false } = {}) {
    initSizes();
    buildBricks();
    placePaddleAndBall();
    frameCount = 0;
    nextCreepFrame = CREEP_BASE_INTERVAL;
    destroyedCount = 0;
    multiBallSpawned = false;
    currentSpeed = getBaseSpeed();
    if (resetLives) lives = MAX_LIVES;
    draw();
  }

  function initGame() {
    level = 0;
    gameState = 'idle';
    resetLevelState({ resetLives: true });
  }

  function advanceLevel() {
    if (level >= LEVELS.length - 1) return;
    level += 1;
    gameState = 'idle';
    resetLevelState({ resetLives: false });
  }

  function resetBall() {
    balls = [makeBall(paddle.x + paddle.w / 2, paddle.y - w * BALL_RADIUS_RATIO - 2, 0, 0)];
    multiBallSpawned = destroyedCount >= multiBallThreshold();
    currentSpeed = getBaseSpeed();
  }

  function launchBall(ball, speed) {
    const s = speed ?? currentSpeed;
    const angle = (Math.random() * 60 + 60) * (Math.PI / 180);
    const dir = Math.random() < 0.5 ? -1 : 1;
    ball.dx = Math.cos(angle) * s * dir;
    ball.dy = -Math.sin(angle) * s;
  }

  function spawnSecondBall() {
    if (balls.length >= 2 || multiBallSpawned) return;
    multiBallSpawned = true;
    const primary = balls[0];
    const baseSpeed = getBaseSpeed();
    const angle = (Math.random() * 60 + 60) * (Math.PI / 180);
    const dir = primary.dx > 0 ? -1 : 1;
    balls.push(
      makeBall(
        primary.x,
        primary.y,
        Math.cos(angle) * baseSpeed * dir,
        -Math.sin(angle) * baseSpeed
      )
    );
  }

  function startGame() {
    if (gameState === 'playing') return;
    if (gameState === 'won' || gameState === 'lost') initGame();
    if (gameState === 'levelClear') {
      advanceLevel();
    }
    gameState = 'playing';
    launchBall(balls[0]);
    loop();
  }

  function pauseGame() {
    if (gameState !== 'playing') return;
    gameState = 'paused';
    cancelAnimationFrame(animFrame);
  }

  function resumeGame() {
    if (gameState !== 'paused') return;
    gameState = 'playing';
    loop();
  }

  function togglePause() {
    if (gameState === 'playing') pauseGame();
    else if (gameState === 'paused') resumeGame();
  }

  function loop() {
    if (gameState !== 'playing') return;
    update();
    draw();
    animFrame = requestAnimationFrame(loop);
  }

  function updateBall(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.r < 0) {
      ball.x = ball.r;
      ball.dx = Math.abs(ball.dx);
    }
    if (ball.x + ball.r > w) {
      ball.x = w - ball.r;
      ball.dx = -Math.abs(ball.dx);
    }
    if (ball.y - ball.r < 0) {
      ball.y = ball.r;
      ball.dy = Math.abs(ball.dy);
    }

    if (
      ball.dy > 0 &&
      ball.y + ball.r >= paddle.y &&
      ball.y + ball.r <= paddle.y + paddle.h + Math.abs(ball.dy) &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.w
    ) {
      ball.y = paddle.y - ball.r;
      const hit = (ball.x - paddle.x) / paddle.w;
      const angle = (150 - hit * 120) * (Math.PI / 180);
      const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
      ball.dx = Math.cos(angle) * speed + paddleVx * 0.3;
      ball.dy = -Math.sin(angle) * speed;
    }

    for (const brick of bricks) {
      if (!brick.alive) continue;
      if (
        ball.x + ball.r > brick.x &&
        ball.x - ball.r < brick.x + brick.w &&
        ball.y + ball.r > brick.y &&
        ball.y - ball.r < brick.y + brick.h
      ) {
        brick.alive = false;
        destroyedCount++;

        const overlapLeft = ball.x + ball.r - brick.x;
        const overlapRight = brick.x + brick.w - (ball.x - ball.r);
        const overlapTop = ball.y + ball.r - brick.y;
        const overlapBottom = brick.y + brick.h - (ball.y - ball.r);
        const minOverlapX = Math.min(overlapLeft, overlapRight);
        const minOverlapY = Math.min(overlapTop, overlapBottom);

        if (minOverlapX < minOverlapY) ball.dx *= -1;
        else ball.dy *= -1;

        ball.dx *= SPEED_BUMP;
        ball.dy *= SPEED_BUMP;
        currentSpeed = Math.max(currentSpeed, Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy));

        if (destroyedCount === multiBallThreshold() && !multiBallSpawned) {
          spawnSecondBall();
        }
        break;
      }
    }
  }

  function update() {
    for (const ball of balls) updateBall(ball);

    balls = balls.filter((b) => b.y - b.r <= h);

    if (balls.length === 0) {
      lives--;
      if (lives <= 0) {
        gameState = 'lost';
        cancelAnimationFrame(animFrame);
        return;
      }
      resetBall();
      launchBall(balls[0]);
    }

    frameCount++;
    if (frameCount >= nextCreepFrame && totalBricks > 0) {
      const alive = bricks.filter((b) => b.alive).length;
      const progress = 1 - alive / totalBricks;
      const t = progress * progress * (3 - 2 * progress);
      const creepPx = h * CREEP_PX_RATIO;
      for (const brick of bricks) brick.y += creepPx;
      nextCreepFrame =
        frameCount +
        Math.round(CREEP_MIN_INTERVAL + (CREEP_BASE_INTERVAL - CREEP_MIN_INTERVAL) * (1 - t));
    }

    const lowestBrick = bricks.reduce(
      (low, b) => (b.alive && b.y + b.h > low ? b.y + b.h : low),
      0
    );
    if (lowestBrick >= paddle.y) {
      gameState = 'lost';
      cancelAnimationFrame(animFrame);
      return;
    }

    if (bricks.length && bricks.every((b) => !b.alive)) {
      cancelAnimationFrame(animFrame);
      if (level >= LEVELS.length - 1) gameState = 'won';
      else gameState = 'levelClear';
    }
  }

  function drawBall(ball) {
    if (imagesLoaded) {
      const ballSize = ball.r * 2.5;
      ctx.drawImage(ballImg, ball.x - ballSize / 2, ball.y - ballSize / 2, ballSize, ballSize);
    } else {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1a1a';
      ctx.fill();
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    for (const brick of bricks) {
      if (!brick.alive) continue;
      if (imagesLoaded) ctx.drawImage(heartImg, brick.x, brick.y, brick.w, brick.h);
      else {
        ctx.fillStyle = '#092F33';
        ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
      }
    }

    for (const ball of balls) drawBall(ball);

    ctx.fillStyle = '#092F33';
    const radius = 2;
    ctx.beginPath();
    ctx.moveTo(paddle.x + radius, paddle.y);
    ctx.lineTo(paddle.x + paddle.w - radius, paddle.y);
    ctx.quadraticCurveTo(paddle.x + paddle.w, paddle.y, paddle.x + paddle.w, paddle.y + radius);
    ctx.lineTo(paddle.x + paddle.w, paddle.y + paddle.h);
    ctx.lineTo(paddle.x, paddle.y + paddle.h);
    ctx.lineTo(paddle.x, paddle.y + radius);
    ctx.quadraticCurveTo(paddle.x, paddle.y, paddle.x + radius, paddle.y);
    ctx.closePath();
    ctx.fill();

    if (imagesLoaded && heartImg.complete) {
      const lifeSize = w * 0.025;
      for (let i = 0; i < lives; i++) {
        ctx.drawImage(heartImg, 6 + i * (lifeSize + 4), 6, lifeSize, lifeSize);
      }
    }

    ctx.fillStyle = '#092F33';
    ctx.font = `${Math.max(11, w * 0.028)}px Cinzel, serif`;
    ctx.textAlign = 'right';
    ctx.fillText(`${ui.levelLabel} ${levelNumber}`, w - 10, 18);
  }

  function relocateBricksKeepProgress() {
    const gap = w * BRICK_GAP_RATIO;
    const brickW = (w - gap * (COLS + 1)) / COLS;
    const brickH = h * BRICK_HEIGHT_RATIO;
    const topOffset = h * BRICK_TOP_RATIO;
    for (const brick of bricks) {
      brick.x = gap + brick.c * (brickW + gap);
      brick.y = topOffset + brick.r * (brickH + gap);
      brick.w = brickW;
      brick.h = brickH;
    }
  }

  function movePaddle(clientX) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const newX = Math.max(0, Math.min(w - paddle.w, x - paddle.w / 2));
    paddleVx = newX - paddle.x;
    paddle.x = newX;
    if (gameState === 'idle' && balls[0]) {
      balls[0].x = paddle.x + paddle.w / 2;
      draw();
    }
  }

  function handleMouse(e) {
    movePaddle(e.clientX);
  }

  function handleTouch(e) {
    e.preventDefault();
    movePaddle(e.touches[0].clientX);
  }

  function handleMouseLeave() {
    if (gameState === 'playing') pauseGame();
  }

  onMount(() => {
    heartImg = new Image();
    ballImg = new Image();
    let loaded = 0;
    function checkLoaded() {
      loaded++;
      if (loaded === 2) {
        imagesLoaded = true;
        draw();
      }
    }
    heartImg.onload = checkLoaded;
    ballImg.onload = checkLoaded;
    heartImg.src = '/images/game/heart.svg?v=denim';
    ballImg.src = '/images/game/soccer-ball.png';

    initGame();

    const resizeObserver = new ResizeObserver(() => {
      const oldW = w;
      initSizes();
      if (oldW && oldW !== w) {
        const scale = w / oldW;
        for (const ball of balls) {
          ball.x *= scale;
          ball.y *= scale;
          ball.dx *= scale;
          ball.dy *= scale;
          ball.r = w * BALL_RADIUS_RATIO;
        }
        currentSpeed = getBaseSpeed();
        paddle.w = w * PADDLE_WIDTH_RATIO;
        paddle.h = h * PADDLE_HEIGHT_RATIO;
        paddle.y = h - h * PADDLE_BOTTOM_RATIO - paddle.h;
        paddle.x = Math.min(paddle.x * scale, w - paddle.w);
        relocateBricksKeepProgress();
        draw();
      }
    });
    if (canvas?.parentElement) resizeObserver.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
    };
  });
</script>

<section class="game-section">
  <header class="game-header">
    <h2 class="game-title">{ui.gameTitle}</h2>
  </header>

  <LaceBorder pattern={1} size="var(--game-lace-size)" color="#fff">
    <div class="game-container">
      <div class="canvas-wrapper">
        {#if gameState === 'playing' || gameState === 'paused'}
          <button
            class="pause-btn"
            type="button"
            onclick={togglePause}
            aria-label={gameState === 'playing' ? ui.pause : ui.resume}
          >
            {#if gameState === 'playing'}
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <rect x="5" y="3" width="5" height="18" rx="1" />
                <rect x="14" y="3" width="5" height="18" rx="1" />
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <polygon points="5,3 21,12 5,21" />
              </svg>
            {/if}
          </button>
        {/if}

        <canvas
          bind:this={canvas}
          onmousemove={handleMouse}
          onmouseleave={handleMouseLeave}
          ontouchmove={handleTouch}
          ontouchstart={handleTouch}
        ></canvas>

        {#if gameState === 'idle'}
          <div class="overlay">
            <p class="overlay-text">{ui.levelLabel} {levelNumber}</p>
            <button class="play-button" type="button" onclick={startGame}>{ui.play}</button>
          </div>
        {/if}

        {#if gameState === 'paused'}
          <div class="overlay">
            <p class="overlay-text">{ui.paused}</p>
            <button class="play-button" type="button" onclick={resumeGame}>{ui.resume}</button>
          </div>
        {/if}

        {#if gameState === 'levelClear'}
          <div class="overlay">
            <p class="overlay-text">{ui.levelClear}</p>
            <button class="play-button" type="button" onclick={startGame}>{ui.nextLevel}</button>
          </div>
        {/if}

        {#if gameState === 'won'}
          <div class="overlay">
            <p class="overlay-text">{ui.youWin}</p>
            <button class="play-button" type="button" onclick={startGame}>{ui.playAgain}</button>
          </div>
        {/if}

        {#if gameState === 'lost'}
          <div class="overlay">
            <p class="overlay-text">{ui.gameOver}</p>
            <button class="play-button" type="button" onclick={startGame}>{ui.tryAgain}</button>
          </div>
        {/if}
      </div>
    </div>
  </LaceBorder>
</section>

<style>
  .game-section {
    --game-lace-size: 50px;
    width: 100%;
    max-width: var(--content-narrow);
    margin-inline: auto;
    margin-top: clamp(2.5rem, 6vh, 4rem);
    margin-bottom: clamp(2.5rem, 6vh, 4.5rem);
    padding-inline: clamp(1.25rem, 4vw, 2.5rem);
  }

  @media (max-width: 768px) {
    .game-section {
      --game-lace-size: 20px;
      margin-top: clamp(2rem, 5vh, 3rem);
      margin-bottom: clamp(3rem, 8vh, 5rem);
      padding-bottom: 0.5rem;
    }
  }

  .game-header {
    text-align: center;
    margin-bottom: calc(var(--game-lace-size) + 1rem);
  }

  .game-title {
    font-family: var(--font-display);
    font-weight: var(--font-weight-normal);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-style: italic;
    color: var(--color-text);
    letter-spacing: 0.02em;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.75rem;
  }

  .canvas-wrapper {
    width: 100%;
    position: relative;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    overflow: hidden;
    touch-action: none;
  }

  canvas {
    display: block;
    width: 100%;
  }

  .pause-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
    background: rgba(241, 234, 223, 0.6);
    border: 1px solid var(--color-border);
    border-radius: 3px;
    color: var(--color-text);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity var(--duration-normal) var(--ease-elegant);
  }

  .pause-btn:hover {
    opacity: 1;
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: rgba(241, 234, 223, 0.7);
    z-index: 1;
  }

  .overlay-text {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-style: italic;
    color: var(--color-text);
    letter-spacing: 0.02em;
  }

  .play-button {
    font-family: var(--font-display);
    font-size: clamp(0.95rem, 2vw, 1.15rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1.5px solid var(--color-text);
    padding: 0.75em 2.5em;
    cursor: pointer;
    transition:
      background-color var(--duration-normal) var(--ease-elegant),
      color var(--duration-normal) var(--ease-elegant);
  }

  .play-button:hover {
    background-color: var(--color-text);
    color: var(--color-bg);
  }
</style>
