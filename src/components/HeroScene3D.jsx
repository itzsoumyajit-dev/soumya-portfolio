import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function HeroScene3D({ scrollProgress = 0 }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create main Group holding the loaded model
    const mesh = new THREE.Group()
    scene.add(mesh)

    // Load Damascus Steel Katana GLB
    const loader = new GLTFLoader()
    loader.load('/damascus_steel_katana.glb', (gltf) => {
      const model = gltf.scene

      // Center the model
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      // Shift model so it rotates around its true center
      model.position.sub(center)

      // Scale model roughly to fit the view (target massive 12 units width for StringTune look)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      if (maxDim > 0 && maxDim < 10000) {
        const scale = 12.0 / maxDim
        model.scale.setScalar(scale)
      } else {
        model.scale.setScalar(1)
      }

      // Fix PBR materials that appear black without an environment map
      model.traverse((child) => {
        if (child.isMesh && child.material) {
          // Clone material to avoid modifying shared defaults
          child.material = child.material.clone()
          if (child.material.metalness !== undefined) {
            // Cap metalness and ensure roughness so it catches light
            child.material.metalness = Math.min(child.material.metalness, 0.5)
            child.material.roughness = Math.max(child.material.roughness, 0.3)
          }
          // Optional: Add slight emissive pop if the texture is very dark
          child.material.emissive = new THREE.Color(0x111111)
          child.material.needsUpdate = true
        }
      })

      // StringTune-style starting angle (slanted up-right, leaning forward)
      model.rotation.z = Math.PI / 5
      model.rotation.x = Math.PI / 6
      model.rotation.y = -Math.PI / 8

      mesh.add(model)
    }, undefined, (error) => {
      console.error('Error loading Katana GLB:', error)
    })

    // Mock wireMesh to safely plug into existing animation logic
    const wireMesh = new THREE.Group()

    // Enhanced Lights to make the model pop without an HDRI
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5)
    scene.add(hemiLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
    directionalLight.position.set(5, 10, 7)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xe63946, 3.0, 20)
    pointLight.position.set(-3, 2, 3)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0x3366ff, 2.0, 15)
    pointLight2.position.set(3, -2, -2)
    scene.add(pointLight2)

    // Store references for scroll-driven updates
    const scrollTarget = { value: scrollProgress }
    const smoothScroll = { value: scrollProgress }
    sceneRef.current = { scene, camera, renderer, mesh, wireMesh, pointLight, scrollTarget }

    // Mouse tracking for StringTune style hover parallax
    const mouse = new THREE.Vector2(0, 0)
    const smoothMouse = new THREE.Vector2(0, 0)

    const onMouseMove = (event) => {
      // Normalize mouse coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf
    const baseTime = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - baseTime) * 0.001

      // Linear Interpolation (lerp) for buttery parallax smoothness
      smoothMouse.lerp(mouse, 0.08)
      // Custom Scroll lerping for "weighty" cinematic flow
      smoothScroll.value = THREE.MathUtils.lerp(smoothScroll.value, scrollTarget.value, 0.06)
      const currentScroll = smoothScroll.value

      // Flowing/floating ambient animation - Cinematic float
      const floatY = Math.sin(elapsed * 0.8) * 0.3
      const floatX = Math.cos(elapsed * 0.6) * 0.15
      const floatZ = Math.sin(elapsed * 0.7) * 0.2

      // Cinematic Center Anchor
      const basePosX = 0.0
      const basePosY = 1.0
      const basePosZ = 0.0

      // Cinematic sweeping on scroll
      const scrollShiftX = currentScroll * -2.5
      const scrollShiftY = currentScroll * -1.0
      const scrollShiftZ = currentScroll * -2.5

      // Combined Position: Base + Parallax + Cinematic Float + Sweeping
      mesh.position.x = basePosX + floatX + smoothMouse.x * 1.2 + scrollShiftX
      mesh.position.y = basePosY + floatY + smoothMouse.y * 1.2 + scrollShiftY
      mesh.position.z = basePosZ + floatZ + scrollShiftZ

      // Cinematic Sweep Rotation 
      const scrollTwistZ = currentScroll * Math.PI * 1.5
      const scrollTwistY = currentScroll * -Math.PI * 0.8
      const scrollTwistX = currentScroll * Math.PI * 0.4

      // Combined Rotation: Majestic spin + organic wobble + Mouse + Scroll sweep
      mesh.rotation.x = Math.sin(elapsed * 0.4) * 0.15 - smoothMouse.y * 0.6 + scrollTwistX
      mesh.rotation.y = elapsed * 0.3 + smoothMouse.x * 0.8 + scrollTwistY
      mesh.rotation.z = Math.cos(elapsed * 0.3) * 0.1 + scrollTwistZ

      wireMesh.position.copy(mesh.position)
      wireMesh.rotation.copy(mesh.rotation)

      // Keep camera and scale fixed
      camera.position.z = 5
      camera.position.y = 0

      const sc = 1
      mesh.scale.setScalar(sc)
      wireMesh.scale.setScalar(sc)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      mesh.traverse((child) => {
        if (child.isMesh && child.geometry) {
          child.geometry.dispose()
        }
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  // Update target when parent changes scrollProgress
  useEffect(() => {
    if (!sceneRef.current) return
    sceneRef.current.scrollTarget.value = scrollProgress
  }, [scrollProgress])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        opacity: 0.6,
      }}
    />
  )
}
