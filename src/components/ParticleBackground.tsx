import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 6000
const MOUSE_RADIUS = 90
const MOUSE_FORCE = 14

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 300

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Mouse tracking
    const mouse = new THREE.Vector2(9999, 9999)
    const raycaster = new THREE.Raycaster()
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const mouseWorld = new THREE.Vector3()

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(mousePlane, mouseWorld)
    }

    const handleMouseLeave = () => {
      mouseWorld.set(9999, 9999, 0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Particles
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const opacities = new Float32Array(PARTICLE_COUNT)

    // Logo exclusion zone — tight box around the logo
    const exW = 85 // half-width of exclusion rect
    const exH = 18 // half-height of exclusion rect

    // Ring sits just outside the logo
    const ringRadius = 95
    const ringThickness = 12

    // Visible world extents at z=0
    const vFov = (60 * Math.PI) / 180
    const visH = 2 * 300 * Math.tan(vFov / 2) // ~346
    const visW = visH * (window.innerWidth / window.innerHeight)

    const palette = [
      [0.75, 0.85, 1.0],
      [1.0, 0.95, 0.88],
      [0.6, 0.8, 1.0],
      [0.85, 0.7, 1.0],
      [0.5, 0.9, 0.95],
      [1.0, 0.82, 0.65],
    ]

    const birthFrame = new Float32Array(PARTICLE_COUNT)
    const FADE_IN_DURATION = 60
    const RING_COUNT = 800

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      let x: number, y: number

      if (i < RING_COUNT) {
        // === Dense inner ring ===
        const r =
          ringRadius +
          (Math.random() - 0.5) * ringThickness
        const theta = Math.random() * Math.PI * 2
        x = Math.cos(theta) * r
        y = Math.sin(theta) * r

        sizes[i] = Math.random() * 3.5 + 1.5
        opacities[i] = Math.random() * 0.3 + 0.7
        const c = palette[Math.random() < 0.6 ? 0 : 1]
        colors[i3] = c[0]
        colors[i3 + 1] = c[1]
        colors[i3 + 2] = c[2]

        // Ring appears first
        birthFrame[i] = Math.random() * 60
      } else {
        // === Scattered field — fills the whole page ===
        // Place randomly across the full visible area, outside the ring
        do {
          x = (Math.random() - 0.5) * visW * 0.95
          y = (Math.random() - 0.5) * visH * 0.95
        } while (Math.sqrt(x * x + y * y) < ringRadius + ringThickness)

        const dist = Math.sqrt(x * x + y * y)
        const t = Math.min(dist / (visH * 0.5), 1)
        sizes[i] = Math.random() * 3.0 + 1.2
        opacities[i] = Math.random() * 0.3 + 0.6

        const ci = Math.floor(Math.random() * palette.length)
        colors[i3] = palette[ci][0]
        colors[i3 + 1] = palette[ci][1]
        colors[i3 + 2] = palette[ci][2]

        // Field appears after ring, staggered by distance
        birthFrame[i] = 40 + t * 100 + Math.random() * 40
      }

      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = (Math.random() - 0.5) * 80

      // Orbital velocity
      const r = Math.sqrt(x * x + y * y)
      const orbSpeed = 0.07 * Math.sqrt(120 / Math.max(r, 30))
      const a = Math.atan2(y, x)
      velocities[i3] = -Math.sin(a) * orbSpeed
      velocities[i3 + 1] = Math.cos(a) * orbSpeed
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
    }

    // Fade multiplier — written per frame based on birth time
    const fadeMult = new Float32Array(PARTICLE_COUNT)

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aFade', new THREE.BufferAttribute(fadeMult, 1))

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        attribute float aFade;
        attribute vec3 aColor;
        varying float vOpacity;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
          vOpacity = aOpacity * aFade;
          vColor = aColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * aFade * uPixelRatio * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.0, d);
          float glow = exp(-d * 3.5) * 0.9;
          float alpha = (core + glow) * vOpacity;
          gl_FragColor = vec4(vColor * (1.0 + glow * 0.4), alpha);
        }
      `,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    let animationId: number
    let frame = 0

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      frame++

      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const fadeAttr = geometry.attributes.aFade as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array
      const fadeArray = fadeAttr.array as Float32Array
      const mx = mouseWorld.x
      const my = mouseWorld.y

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3

        // Staggered fade-in: each particle fades from 0→1 over FADE_IN_DURATION
        // frames, starting at its birthFrame
        const age = frame - birthFrame[i]
        if (age < 0) {
          fadeArray[i] = 0
          continue
        }
        fadeArray[i] = Math.min(age / FADE_IN_DURATION, 1)

        let x = posArray[i3]
        let y = posArray[i3 + 1]

        // Mouse repulsion
        const dmx = x - mx
        const dmy = y - my
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy)
        if (mouseDist < MOUSE_RADIUS && mouseDist > 0.1) {
          const force = (1 - mouseDist / MOUSE_RADIUS) * MOUSE_FORCE
          velocities[i3] += (dmx / mouseDist) * force
          velocities[i3 + 1] += (dmy / mouseDist) * force
        }

        x += velocities[i3]
        y += velocities[i3 + 1]
        posArray[i3 + 2] += velocities[i3 + 2]

        // Keplerian orbital target
        const dist = Math.sqrt(x * x + y * y)
        const angle = Math.atan2(y, x)
        const orbSpeed = 0.4 * Math.sqrt(120 / Math.max(dist, 30))
        const targetVx = -Math.sin(angle) * orbSpeed
        const targetVy = Math.cos(angle) * orbSpeed

        // Fast snap-back
        const damping = 0.18
        velocities[i3] += (targetVx - velocities[i3]) * damping
        velocities[i3 + 1] += (targetVy - velocities[i3 + 1]) * damping

        // Speed cap
        const spd = Math.sqrt(
          velocities[i3] * velocities[i3] +
            velocities[i3 + 1] * velocities[i3 + 1],
        )
        if (spd > 2) {
          velocities[i3] *= 2 / spd
          velocities[i3 + 1] *= 2 / spd
        }

        // Logo exclusion
        if (Math.abs(x) < exW + 8 && Math.abs(y) < exH + 8) {
          x += (x > 0 ? 1 : -1) * 1.5
          y += (y > 0 ? 1 : -1) * 1.5
        }

        // Soft boundary — allow particles up to viewport edges
        const bx = visW * 0.52
        const by = visH * 0.52
        if (Math.abs(x) > bx) x *= 0.97
        if (Math.abs(y) > by) y *= 0.97
        if (Math.abs(posArray[i3 + 2]) > 80) posArray[i3 + 2] *= 0.98

        posArray[i3] = x
        posArray[i3 + 1] = y
      }

      posAttr.needsUpdate = true
      fadeAttr.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
      }}
    />
  )
}
