<script>
  import { onMount } from 'svelte';
  import { riverPoints, ribbonShape } from './river-path.js';

  export let mode = 'horizontal';
  export let paused = false;

  let host;
  let canvas;
  let width = 400;
  let height = 560;
  let rem = 16;
  let ready = false;
  let rebuild = () => {};
  let syncPlayback = () => {};
  $: shape = ribbonShape(riverPoints(mode, width, height, rem));
  $: rebuild(shape, width, height);
  $: syncPlayback(paused);

  onMount(() => {
    let disposed = false;
    let renderer;
    let geometry;
    let material;
    let mesh;
    let scene;
    let camera;
    let THREE;
    let animation = 0;
    let visible = false;
    let lastFrame = 0;
    let elapsed = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const canAnimate = () => visible && !document.hidden && !paused && !reduced.matches;

    function draw(now) {
      animation = 0;
      if (disposed || !renderer) return;
      if (canAnimate()) {
        if (now - lastFrame >= 1000 / 30) {
          elapsed += Math.min((now - lastFrame) / 1000, 0.06);
          lastFrame = now;
          material.uniforms.uTime.value = elapsed;
          renderer.render(scene, camera);
        }
        animation = requestAnimationFrame(draw);
      } else {
        renderer.render(scene, camera);
      }
    }

    function playback() {
      if (!renderer || disposed) return;
      cancelAnimationFrame(animation);
      lastFrame = performance.now();
      animation = requestAnimationFrame(draw);
    }
    syncPlayback = playback;

    const resize = new ResizeObserver(([entry]) => {
      width = Math.max(1, entry.contentRect.width);
      height = Math.max(1, entry.contentRect.height);
      rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    });
    resize.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      playback();
    }, { rootMargin: '80px' });
    intersection.observe(host);
    document.addEventListener('visibilitychange', playback);
    reduced.addEventListener('change', playback);

    const contextLost = (event) => {
      event.preventDefault();
      ready = false;
      cancelAnimationFrame(animation);
    };
    const contextRestored = () => { ready = true; playback(); };
    canvas.addEventListener('webglcontextlost', contextLost);
    canvas.addEventListener('webglcontextrestored', contextRestored);

    async function init() {
      try {
        THREE = await import('three');
        if (disposed) return;
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(0, width, 0, height, -1, 1);
        material = new THREE.ShaderMaterial({
          transparent: true,
          depthTest: false,
          depthWrite: false,
          side: THREE.DoubleSide,
          uniforms: { uTime: { value: 0 } },
          vertexShader: `
            varying vec2 vUv;
            attribute float breadth;
            varying float vBreadth;
            void main() { vUv = uv; vBreadth = breadth; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
          `,
          fragmentShader: `
            precision highp float;
            uniform float uTime;
            varying vec2 vUv;
            varying float vBreadth;
            float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
            float noise(vec2 p) {
              vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
              return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
            }
            void main() {
              float t = uTime * 0.065;
              float x = vUv.x;
              float y = vUv.y;
              float n = noise(vec2(x * 0.65 - t, y * 3.1 + t * 0.12));
              float pigment = noise(vec2(x * 4.0 + t * 0.12, y * 24.0 - t * 0.3));
              vec3 deep = vec3(0.0745, 0.153, 0.471);
              vec3 cobalt = vec3(0.090, 0.184, 0.592);
              vec3 violet = vec3(0.200, 0.200, 0.557);
              vec3 turquoise = vec3(0.17, 0.40, 0.46);
              vec3 ivory = vec3(0.91, 0.90, 0.80);
              vec3 color = mix(deep, cobalt, n);
              color = mix(color, violet, smoothstep(0.46,0.83,noise(vec2(x * 0.21 + 3.0,y * 2.3))) * 0.56);
              color = mix(color, turquoise, smoothstep(0.61,0.87,n) * 0.19);
              // Still paper/pigment grain: texture belongs to the illustration,
              // while the broad washes and highlights move independently.
              float paper = noise(vec2(x*57.0,y*max(20.0,vBreadth)*0.72));
              float granules = noise(vec2(x*121.0+9.0,y*max(20.0,vBreadth)*1.15));
              float brush = noise(vec2(x*13.0,y*91.0));
              color += (pigment - 0.5) * vec3(0.02,0.033,0.065);
              color += (paper-0.5)*vec3(0.06,0.075,0.10);
              color += (granules-0.5)*0.025 + (brush-0.5)*vec3(0.018,0.028,0.048);
              float edge = abs(y - 0.5) * 2.0;
              color = mix(color, vec3(0.38,0.42,0.53), smoothstep(0.94,1.0,edge)*0.42);
              // Uneven groups of long, unbroken ink-like threads follow both banks.
              // Their slow lateral refraction and travelling brightness carry the current.
              float threads = 0.0;
              float softness = max(fwidth(y) * 0.75, 0.0006);
              for (int i=0; i<12; i++) {
                float fi = float(i);
                float lane = 0.045;
                if(i==1) lane=0.068; if(i==2) lane=0.102; if(i==3) lane=0.143;
                if(i==4) lane=0.23; if(i==5) lane=0.37; if(i==6) lane=0.54;
                if(i==7) lane=0.70; if(i==8) lane=0.827; if(i==9) lane=0.889;
                if(i==10) lane=0.927; if(i==11) lane=0.953;
                float envelope=sin(lane * 3.14159);
                float bend=sin(x * 0.48 - t + lane * 3.0) * 0.034 + sin(x * 0.19 + lane * 9.0 + t * 0.6) * 0.023;
                float inkWobble = (noise(vec2(x*8.0,fi*4.0))-0.5)*0.012;
                lane += bend * envelope + inkWobble;
                float thickness=(0.45 + 0.18*sin(fi*2.1)) * (0.6+noise(vec2(x*22.0,fi*7.0))*0.8) / max(20.0,vBreadth);
                float stroke=1.0-smoothstep(thickness,thickness+softness,abs(y-lane));
                float travelling=0.72 + 0.20 * sin(x * 0.8 - t * 3.0 + fi * 0.7);
                threads=max(threads,stroke*travelling*(0.78+0.22*paper));
              }
              color=mix(color,ivory,threads*0.84);
              // Broad translucent shifts suggest submerged layers without sparkle.
              float wash=sin(x * 0.65 - t * 1.7 + y * 17.0 + n * 1.3);
              color += vec3(0.009,0.018,0.028) * smoothstep(0.35,1.0,wash);
              float gold = smoothstep(0.77,0.95,noise(vec2(x * 0.36 + 7.0,y*3.0))) * smoothstep(0.88,0.99,edge);
              color = mix(color, vec3(0.59,0.48,0.30), gold * 0.28);
              float raggedEdge = edge + (noise(vec2(x*47.0,y*3.0))-0.5)*0.018;
              float alpha = (1.0-smoothstep(0.979,1.0,raggedEdge)) * 0.985;
              gl_FragColor = vec4(pow(max(color, vec3(0.0)), vec3(2.2)),alpha);
              #include <colorspace_fragment>
            }
          `
        });
        rebuild = (nextShape, w, h) => {
          if (disposed || !renderer) return;
          const positions = [];
          const uvs = [];
          const breadths = [];
          const indices = [];
          const segments = 14;
          const rowSize = segments + 1;
          nextShape.samples.forEach((p, i) => {
            const ax = Number.isFinite(p.ax) ? p.ax : p.x - p.nx * p.width / 2;
            const ay = Number.isFinite(p.ay) ? p.ay : p.y - p.ny * p.width / 2;
            const bx = Number.isFinite(p.bx) ? p.bx : p.x + p.nx * p.width / 2;
            const by = Number.isFinite(p.by) ? p.by : p.y + p.ny * p.width / 2;
            const breadth = Math.hypot(bx-ax,by-ay);
            for (let j=0; j<=segments; j++) {
              const across = j / segments;
              positions.push(ax+(bx-ax)*across, ay+(by-ay)*across, 0);
              uvs.push(p.distance / 130, across);
              breadths.push(breadth);
            }
            if (i < nextShape.samples.length - 1) {
              for(let j=0; j<segments; j++) {
                const a = i * rowSize + j;
                indices.push(a,a+1,a+rowSize,a+1,a+rowSize+1,a+rowSize);
              }
            }
          });
          geometry?.dispose();
          geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
          geometry.setAttribute('breadth', new THREE.Float32BufferAttribute(breadths, 1));
          geometry.setIndex(indices);
          if (mesh) mesh.geometry = geometry;
          else { mesh = new THREE.Mesh(geometry, material); scene.add(mesh); }
          camera.right = w; camera.bottom = h;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5, 4096 / w, 4096 / h));
          renderer.setSize(w, h, false);
          renderer.render(scene, camera);
          ready = true;
          playback();
        };
        rebuild(shape, width, height);
      } catch {
        // The SVG beneath the canvas is the complete static rendering.
        ready = false;
        renderer?.dispose();
        renderer = undefined;
      }
    }
    init();

    return () => {
      disposed = true;
      cancelAnimationFrame(animation);
      resize.disconnect(); intersection.disconnect();
      document.removeEventListener('visibilitychange', playback);
      reduced.removeEventListener('change', playback);
      canvas.removeEventListener('webglcontextlost', contextLost);
      canvas.removeEventListener('webglcontextrestored', contextRestored);
      geometry?.dispose(); material?.dispose(); renderer?.dispose();
      rebuild = () => {}; syncPlayback = () => {};
    };
  });
</script>

<div class="river-water" bind:this={host} aria-hidden="true">
  <svg class:concealed={ready} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
    <path d={shape.outline} fill="#172f97" stroke="#646880" stroke-width="1" />
    {#each shape.currents as current, i}
      <path d={current} fill="none" stroke={i % 2 ? '#e8e5cc' : '#cbcdbd'} stroke-width={i % 2 ? 0.8 : 1.2} opacity="0.78" />
    {/each}
  </svg>
  <canvas bind:this={canvas} class:visible={ready}></canvas>
</div>

<style>
  .river-water { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  svg, canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  svg { transition: opacity 250ms; }
  svg.concealed { opacity: 0; }
  canvas { opacity: 0; transition: opacity 350ms; }
  canvas.visible { opacity: 1; }
  @media (prefers-reduced-motion: reduce) { svg, canvas { transition: none; } }
</style>
