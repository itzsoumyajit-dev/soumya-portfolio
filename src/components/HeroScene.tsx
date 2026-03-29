import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current!
    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ──
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 5)

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))

    const keyLight = new THREE.DirectionalLight(0x00e5c0, 3)
    keyLight.position.set(-3, 3, 2)
    keyLight.castShadow = true
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xff4d6d, 2)
    rimLight.position.set(3, -1, -2)
    scene.add(rimLight)

    const fillLight = new THREE.PointLight(0x7b5ea7, 2, 15)
    fillLight.position.set(0, -2, 3)
    scene.add(fillLight)

    const backLight = new THREE.PointLight(0x00e5c0, 1.5, 10)
    backLight.position.set(0, 0, -4)
    scene.add(backLight)

    // ── Create a stylized head using geometry ──
    const group = new THREE.Group()
    scene.add(group)

    // Head sphere
    const headGeo = new THREE.SphereGeometry(1, 64, 64)
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xc8956c,
      roughness: 0.6,
      metalness: 0.05,
    })
    const head = new THREE.Mesh(headGeo, headMat)
    head.castShadow = true
    group.add(head)

    // Cap (top)
    const capGeo = new THREE.SphereGeometry(1.06, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.42)
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.4,
      metalness: 0.1,
    })
    const cap = new THREE.Mesh(capGeo, capMat)
    cap.position.y = 0.05
    group.add(cap)

    // Cap brim
    const brimGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.08, 48)
    const brimMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.5 })
    const brim = new THREE.Mesh(brimGeo, brimMat)
    brim.position.set(0.15, 0.18, 0.55)
    brim.rotation.x = -0.2
    group.add(brim)

    // Eyes (dark spheres)
    const eyeGeo = new THREE.SphereGeometry(0.13, 16, 16)
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a3e, roughness: 0.2 })
    const leftEye  = new THREE.Mesh(eyeGeo, eyeMat)
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat)
    leftEye.position.set(-0.32, 0.1, 0.94)
    rightEye.position.set(0.32, 0.1, 0.94)
    group.add(leftEye, rightEye)

    // Eye glow
    const glowMat = new THREE.MeshStandardMaterial({ color: 0x8888ff, emissive: 0x4444ff, emissiveIntensity: 0.8 })
    const lgeo = new THREE.SphereGeometry(0.06, 12, 12)
    const lg = new THREE.Mesh(lgeo, glowMat)
    const rg = new THREE.Mesh(lgeo, glowMat)
    lg.position.set(-0.32, 0.1, 1.01)
    rg.position.set(0.32, 0.1, 1.01)
    group.add(lg, rg)

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.32, 0.06, 0.06)
    const browMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a })
    const lb = new THREE.Mesh(browGeo, browMat)
    const rb = new THREE.Mesh(browGeo, browMat)
    lb.position.set(-0.32, 0.3, 0.93)
    rb.position.set(0.32, 0.3, 0.93)
    lb.rotation.z = -0.15
    rb.rotation.z =  0.15
    group.add(lb, rb)

    // Nose
    const noseGeo = new THREE.SphereGeometry(0.14, 16, 16)
    const nose = new THREE.Mesh(noseGeo, headMat)
    nose.scale.set(0.9, 0.7, 1)
    nose.position.set(0, -0.1, 0.98)
    group.add(nose)

    // Ears
    const earGeo = new THREE.SphereGeometry(0.18, 16, 16)
    const earMat = new THREE.MeshStandardMaterial({ color: 0xba8560, roughness: 0.7 })
    const lEar = new THREE.Mesh(earGeo, earMat)
    const rEar = new THREE.Mesh(earGeo, earMat)
    lEar.position.set(-1.02, 0, 0)
    rEar.position.set(1.02, 0, 0)
    lEar.scale.set(0.5, 0.8, 0.5)
    rEar.scale.set(0.5, 0.8, 0.5)
    group.add(lEar, rEar)

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.7, 24)
    const neck = new THREE.Mesh(neckGeo, headMat)
    neck.position.y = -1.3
    group.add(neck)

    // Shoulders / body
    const bodyGeo = new THREE.CylinderGeometry(1.2, 1.0, 0.9, 24)
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 })
    const body = new THREE.Mesh(bodyGeo, bodyMat)
    body.position.y = -2.1
    group.add(body)

    // Grin line (teeth)
    const teethGeo = new THREE.BoxGeometry(0.5, 0.08, 0.05)
    const teethMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    const teeth = new THREE.Mesh(teethGeo, teethMat)
    teeth.position.set(0, -0.3, 0.97)
    group.add(teeth)

    // Lower lip
    const lipGeo = new THREE.BoxGeometry(0.45, 0.06, 0.06)
    const lipMat = new THREE.MeshStandardMaterial({ color: 0x9a5a45, roughness: 0.5 })
    const lip = new THREE.Mesh(lipGeo, lipMat)
    lip.position.set(0, -0.4, 0.96)
    group.add(lip)

    // Glow ring behind head
    const ringGeo  = new THREE.TorusGeometry(1.6, 0.02, 16, 120)
    const ringMat  = new THREE.MeshBasicMaterial({ color: 0x00e5c0, transparent: true, opacity: 0.4 })
    const glowRing = new THREE.Mesh(ringGeo, ringMat)
    glowRing.rotation.x = Math.PI * 0.15
    glowRing.position.z = -0.5
    group.add(glowRing)

    // Outer ring
    const outerRingGeo = new THREE.TorusGeometry(2.2, 0.008, 16, 120)
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x7b5ea7, transparent: true, opacity: 0.25 })
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat)
    outerRing.rotation.x = Math.PI * 0.1
    outerRing.position.z = -0.8
    group.add(outerRing)

    // Floating particles
    const pCount = 200
    const pGeo   = new THREE.BufferGeometry()
    const pPos   = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 12
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ color: 0x00e5c0, size: 0.025, transparent: true, opacity: 0.6 })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── Mouse tracking ──
    let targetRotX = 0, targetRotY = 0
    const onMouse = (e: MouseEvent) => {
      targetRotY = ((e.clientX / window.innerWidth)  - 0.5) *  0.6
      targetRotX = ((e.clientY / window.innerHeight) - 0.5) * -0.3
    }
    window.addEventListener('mousemove', onMouse)

    // ── Resize ──
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Animate ──
    let t = 0
    const animate = () => {
      const raf = requestAnimationFrame(animate)
      t += 0.008

      group.rotation.y += (targetRotY - group.rotation.y) * 0.05
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05

      // Float
      group.position.y = Math.sin(t * 0.8) * 0.08

      // Rings spin
      glowRing.rotation.z  += 0.003
      outerRing.rotation.z -= 0.002

      // Particles drift
      particles.rotation.y += 0.0005

      // Eye glow pulse
      const pulse = Math.sin(t * 3) * 0.3 + 0.7
      ;(glowMat as THREE.MeshStandardMaterial).emissiveIntensity = pulse

      renderer.render(scene, camera)
      return raf
    }
    const animId = animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  )
}
