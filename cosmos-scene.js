// cosmos-scene.js
// Vanilla Three.js black-hole / accretion-disk background.
// Exposes window.initCosmos(canvas) -> controller { setPalette, setStrength, dispose }.
// Softer bloom than a raw Interstellar look so foreground text stays readable.

(function () {
  function hexToRGB(hex) {
    const c = new THREE.Color(hex);
    return new THREE.Vector3(c.r, c.g, c.b);
  }

  // Strength presets multiply bloom + disk brightness. Default tuned for readability.
  const STRENGTH = {
    off:       { bloom: 0.0, brightness: 0.0, stars: 0.4 },
    subtle:    { bloom: 0.6, brightness: 0.6, stars: 0.7 },
    balanced:  { bloom: 1.0, brightness: 0.92, stars: 0.95 },
    intense:   { bloom: 1.7, brightness: 1.3, stars: 1.2 },
  };

  window.initCosmos = function initCosmos(canvas, initial) {
    initial = initial || {};
    let palette = initial.palette || {
      inner: '#fbe7c2', mid: '#c8814a', outer: '#6e3320',
    };
    let strengthKey = initial.strength || 'subtle';

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.022);

    const camBaseX = 9, camBaseY = 9, camZ = 43;
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(camBaseX, camBaseY, camZ);
    // Aim left-of-centre so the bright core sits on the RIGHT half, clear of the headline.
    const lookAt = new THREE.Vector3(-11, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050505);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Post-processing: bloom
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      STRENGTH[strengthKey].bloom, 0.7, 0.22
    );
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Event horizon
    const blackHole = new THREE.Mesh(
      new THREE.SphereGeometry(5.5, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    scene.add(blackHole);

    // Accretion disk shader
    const vertexShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vRadius;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float r = length(pos.xz);
        vRadius = r;
        float turbulence = sin(r * 2.0 - uTime * 3.0) * cos(r * 1.5 + uTime * 2.0) * 0.3;
        turbulence *= smoothstep(6.0, 8.0, r) * (1.0 - smoothstep(25.0, 30.0, r));
        pos.y += turbulence;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;
    const fragmentShader = `
      uniform float uTime;
      uniform float uBrightness;
      uniform vec3 uInner;
      uniform vec3 uMid;
      uniform vec3 uOuter;
      varying vec2 vUv;
      varying float vRadius;
      float noise(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
      float smoothNoise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(noise(i), noise(i+vec2(1.0,0.0)), f.x),
                   mix(noise(i+vec2(0.0,1.0)), noise(i+vec2(1.0,1.0)), f.x), f.y);
      }
      void main(){
        float normalizedR = (vRadius - 6.0) / 24.0;
        vec3 baseColor = mix(uInner, uMid, smoothstep(0.0, 0.4, normalizedR));
        baseColor = mix(baseColor, uOuter, smoothstep(0.4, 1.0, normalizedR));
        float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
        float rotationSpeed = 1.0 + (1.0 - normalizedR) * 3.0;
        float movingAngle = angle + uTime * rotationSpeed * 0.2;
        vec2 nc = vec2(vRadius * 0.5, movingAngle * 2.0);
        float plasma = smoothNoise(nc)*0.5 + smoothNoise(nc*2.0)*0.25 + smoothNoise(nc*4.0)*0.125;
        float brightness = (1.2 + plasma * 1.8) * uBrightness;
        float alpha = smoothstep(5.5, 6.5, vRadius) * (1.0 - smoothstep(28.0, 32.0, vRadius));
        gl_FragColor = vec4(baseColor * brightness * 2.4, alpha * 0.78);
      }
    `;
    const diskUniforms = {
      uTime: { value: 0 },
      uBrightness: { value: STRENGTH[strengthKey].brightness },
      uInner: { value: hexToRGB(palette.inner) },
      uMid: { value: hexToRGB(palette.mid) },
      uOuter: { value: hexToRGB(palette.outer) },
    };
    const diskMaterial = new THREE.ShaderMaterial({
      uniforms: diskUniforms,
      vertexShader, fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const accretionDisk = new THREE.Mesh(new THREE.PlaneGeometry(64, 64, 200, 200), diskMaterial);
    accretionDisk.rotation.x = -Math.PI / 2;

    const diskGroup = new THREE.Group();
    diskGroup.add(accretionDisk);

    // Vertical lensing ring (shares uniforms)
    const lensing = new THREE.Mesh(new THREE.RingGeometry(6.0, 9.0, 128, 1), diskMaterial.clone());
    lensing.material.uniforms = diskUniforms;
    lensing.rotation.y = Math.PI / 2;
    lensing.scale.set(1, 2.5, 1);
    diskGroup.add(lensing);

    diskGroup.rotation.x = Math.PI * 0.16;
    diskGroup.rotation.z = Math.PI * -0.1;
    scene.add(diskGroup);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 4200;
    const starPos = new Float32Array(starsCount * 3);
    const starSizes = new Float32Array(starsCount);
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      const r = 150 + Math.random() * 350;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i3 + 2] = r * Math.cos(phi);
      starSizes[i] = Math.random() * 1.4 + 0.4;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    const starUniforms = { uColor: { value: new THREE.Color(0xffffff) }, uStrength: { value: STRENGTH[strengthKey].stars } };
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: starUniforms,
      vertexShader: `
        attribute float size;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor; uniform float uStrength;
        void main(){
          float d = distance(gl_PointCoord, vec2(0.5));
          if(d > 0.5) discard;
          gl_FragColor = vec4(uColor * (1.0 - d*1.5) * 4.0 * uStrength, 1.0);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starsGeometry, starMaterial);
    scene.add(starField);

    // Parallax
    let mouseX = 0, mouseY = 0;
    const halfX = window.innerWidth / 2, halfY = window.innerHeight / 2;
    function onMouse(e) {
      mouseX = (e.clientX - halfX) / halfX;
      mouseY = (e.clientY - halfY) / halfY;
    }
    document.addEventListener('mousemove', onMouse);

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let running = true;
    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      diskUniforms.uTime.value = t;
      starField.rotation.y += 0.0003;
      const targetX = mouseX * 10 + camBaseX;
      const targetY = -mouseY * 7 + camBaseY;
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.lookAt(lookAt);
      composer.render();
    }
    animate();

    return {
      setPalette(p) {
        palette = p;
        diskUniforms.uInner.value = hexToRGB(p.inner);
        diskUniforms.uMid.value = hexToRGB(p.mid);
        diskUniforms.uOuter.value = hexToRGB(p.outer);
      },
      setStrength(key) {
        if (!STRENGTH[key]) return;
        strengthKey = key;
        const s = STRENGTH[key];
        bloomPass.strength = s.bloom;
        diskUniforms.uBrightness.value = s.brightness;
        starUniforms.uStrength.value = s.stars;
        blackHole.visible = key !== 'off';
        diskGroup.visible = key !== 'off';
      },
      dispose() {
        running = false;
        document.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      },
    };
  };
})();
