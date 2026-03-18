"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const MAX_RIPPLES = 12

export default function WaterImage({ src }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()

    // ───────────── SCENE ─────────────
    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0,
      10
    )
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const texture = new THREE.TextureLoader().load(src)

    // ───────────── RIPPLE DATA ─────────────
    const ripples = Array.from({ length: MAX_RIPPLES }, () => ({
      pos: new THREE.Vector2(0, 0),
      strength: 0,
      life: 0
    }))

    let rippleIndex = 0

    // ───────────── SHADER ─────────────
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uResolution: { value: new THREE.Vector2(width, height) },
        uRipplePos: { value: Array(MAX_RIPPLES).fill(new THREE.Vector2()) },
        uRippleStrength: { value: new Float32Array(MAX_RIPPLES) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform sampler2D uTexture;
        uniform vec2 uRipplePos[${MAX_RIPPLES}];
        uniform float uRippleStrength[${MAX_RIPPLES}];

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 totalDistortion = vec2(0.0);

          for (int i = 0; i < ${MAX_RIPPLES}; i++) {
            float dist = distance(uv, uRipplePos[i]);
            float ripple =
              sin(dist * 40.0 - uRippleStrength[i] * 6.0) *
              exp(-dist * 15.0) *
              uRippleStrength[i];

            vec2 dir = normalize(uv - uRipplePos[i] + 0.0001);
            totalDistortion += dir * ripple * 0.025;
          }

          vec4 color = texture2D(uTexture, uv + totalDistortion);
          gl_FragColor = color;
        }
      `
    })

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height, 1, 1),
      material
    )
    scene.add(mesh)

    // ───────────── MOUSE ─────────────
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()

      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height

      const ripple = ripples[rippleIndex]
      ripple.pos.set(x, y)
      ripple.strength = 1.0
      ripple.life = 1.0

      rippleIndex = (rippleIndex + 1) % MAX_RIPPLES
    }

    container.addEventListener("mousemove", onMouseMove)

    // ───────────── ANIMATION ─────────────
    const animate = () => {
      ripples.forEach((r, i) => {
        r.life *= 0.92
        r.strength *= 0.92

        material.uniforms.uRipplePos.value[i] = r.pos
        material.uniforms.uRippleStrength.value[i] = r.strength
      })

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // ───────────── CLEANUP ─────────────
    return () => {
      container.removeEventListener("mousemove", onMouseMove)
      container.removeChild(renderer.domElement)
      renderer.dispose()
      material.dispose()
      mesh.geometry.dispose()
    }
  }, [src])

  return <div ref={containerRef} style={{ zIndex:"10000000" }} className="min-w-[80vw] min-h-[80vw]" />
}
