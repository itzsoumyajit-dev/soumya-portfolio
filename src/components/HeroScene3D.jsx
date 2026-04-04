import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    // Scene setup
    const scene = new THREE.Scene()
    const W = container.clientWidth
    const H = container.clientHeight

    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.z = 7
    camera.position.x = 1.2

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Colors matching portfolio palette
    const C1 = new THREE.Color('#38bdf8') // sky
    const C2 = new THREE.Color('#a78bfa') // violet
    const C3 = new THREE.Color('#f472b6') // pink
    const C4 = new THREE.Color('#34d399') // emerald

    // ── Main TorusKnot ──
    const torusGeo = new THREE.TorusKnotGeometry(1.0, 0.3, isMobile ? 64 : 128, isMobile ? 8 : 24)
    const torusMat = new THREE.MeshBasicMaterial({
      color: C1,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    })
    const torusKnot = new THREE.Mesh(torusGeo, torusMat)
    scene.add(torusKnot)

    // Inner glow mesh (solid, very transparent)
    const glowMat = new THREE.MeshBasicMaterial({
      color: C2,
      transparent: true,
      opacity: 0.02,
      side: THREE.DoubleSide,
    })
    const glowMesh = new THREE.Mesh(torusGeo, glowMat)
    scene.add(glowMesh)

    // ── Orbiting Icosahedrons ──
    const orbiters = []
    const orbiterCount = isMobile ? 3 : 6
    const orbiterColors = [C1, C2, C3, C4, C1, C3]
    for (let i = 0; i < orbiterCount; i++) {
      const size = 0.08 + Math.random() * 0.12
      const geo = new THREE.IcosahedronGeometry(size, 0)
      const mat = new THREE.MeshBasicMaterial({
        color: orbiterColors[i % orbiterColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })
      const mesh = new THREE.Mesh(geo, mat)

      // Orbit parameters
      const orbit = {
        mesh,
        radius: 2.2 + Math.random() * 1.2,
        speed: 0.3 + Math.random() * 0.5,
        phase: (Math.PI * 2 * i) / orbiterCount + Math.random() * 0.5,
        tilt: Math.random() * Math.PI * 0.5,
        rotSpeed: 0.5 + Math.random() * 1.5,
      }
      orbiters.push(orbit)
      scene.add(mesh)
    }

    // ── Floating particles ──
    const particleCount = isMobile ? 30 : 80
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6
      particleSizes[i] = Math.random() * 3 + 1
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1))
    const particleMat = new THREE.PointsMaterial({
      color: C1,
      size: 0.03,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── Mouse tracking ──
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation ──
    const clock = new THREE.Clock()
    let animId

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const speed = prefersReduced ? 0.15 : 1

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Main torusKnot rotation + mouse tilt
      torusKnot.rotation.x = t * 0.12 * speed + mouse.y * 0.3
      torusKnot.rotation.y = t * 0.18 * speed + mouse.x * 0.3
      torusKnot.rotation.z = t * 0.06 * speed

      // Pulse opacity
      torusMat.opacity = 0.08 + Math.sin(t * 0.8) * 0.04
      glowMat.opacity = 0.015 + Math.sin(t * 0.5) * 0.01

      // Glow mesh follows with slight lag
      glowMesh.rotation.copy(torusKnot.rotation)
      glowMesh.rotation.x += 0.1
      glowMesh.rotation.y += 0.15

      // Orbiting icosahedrons
      orbiters.forEach((o) => {
        const angle = t * o.speed * speed + o.phase
        o.mesh.position.x = Math.cos(angle) * o.radius
        o.mesh.position.y = Math.sin(angle) * o.radius * Math.cos(o.tilt)
        o.mesh.position.z = Math.sin(angle) * o.radius * Math.sin(o.tilt) * 0.5
        o.mesh.rotation.x = t * o.rotSpeed * speed
        o.mesh.rotation.y = t * o.rotSpeed * 0.7 * speed
      })

      // Particles gentle drift
      const posArr = particles.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += Math.sin(t + i) * 0.001
        posArr[i * 3] += Math.cos(t * 0.5 + i * 0.3) * 0.0005
      }
      particles.geometry.attributes.position.needsUpdate = true
      particles.rotation.y = t * 0.02 * speed

      // Color cycling
      const hue = (t * 0.05) % 1
      torusMat.color.setHSL(hue * 0.15 + 0.55, 0.8, 0.65)

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize ──
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      torusGeo.dispose()
      torusMat.dispose()
      glowMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      orbiters.forEach((o) => {
        o.mesh.geometry.dispose()
        o.mesh.material.dispose()
      })
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}
