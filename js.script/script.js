import gsap from 'https://esm.sh/gsap'
import { throttle } from 'https://esm.sh/throttle-debounce'

const ParticleTrail = {
  colors: ['#f7ae1a', '#f37021', '#db2f32', '#809d3c', '#6ebbdf', '#003278'],
  demoCursor: document.createElement('div'),
  demoTween: null,
  previousMousePosition: { x: 0, y: 0 },
  previousTimestamp: 0,

  init(options = { maxParticles: 7, minParticles: 3, minSpeed: 768, throttle: 33 }) {
    if (!document.querySelector('.bubbly-particle-trail')) return

    window.addEventListener(
      'mousemove',
      throttle(options.throttle, (event) => {
        this.handleMouseMove(event, options)
        if (this.demoCursor) this.demoCursor.remove()
        if (this.demoTween) this.demoTween.kill()
      }),
    )

    setTimeout(() => this.startDemoCursor(options), 234)
  },

  calculateMouseSpeed(x, y, timestamp) {
    const distance = Math.sqrt(
      (x - this.previousMousePosition.x) ** 2 +
      (y - this.previousMousePosition.y) ** 2
    )

    const timeElapsed = timestamp - this.previousTimestamp || 1
    return (distance / timeElapsed) * 1000
  },

  handleMouseMove(event, options) {
    const currentTimestamp = Date.now()
    const x = event.clientX
    const y = event.clientY
    const speed = this.calculateMouseSpeed(x, y, currentTimestamp)

    if (speed > options.minSpeed) {
      this.renderParticles(x, y, options)
    }

    this.previousMousePosition = { x, y }
    this.previousTimestamp = currentTimestamp
  },

  renderParticle(target) {
    const particleContainer = document.createElement('div')
    const particle = document.createElement('div')

    particle.classList.add('particle')
    particleContainer.classList.add('particle-container')

    target.appendChild(particleContainer)
    particleContainer.appendChild(particle)

    gsap.set(particleContainer, {
      rotation: gsap.utils.random(0, 360),
    })

    const tween = gsap.fromTo(
      particle,
      {
        background: gsap.utils.random(this.colors),
        scale: gsap.utils.random(0.3, 2.1),
        x: gsap.utils.random(3, 21),
        y: 0,
      },
      {
        scale: 0,
        x: gsap.utils.random(77, 321),
        y: gsap.utils.random(-21, 21),
        duration: gsap.utils.random(1, 2),
        ease: 'power4.out',
        onComplete: () => {
          particle.remove()
          particleContainer.remove()
          tween.kill()

          if (target.children.length === 0) {
            target.remove()
          }
        },
      },
    )
  },

  renderParticles(x, y, options) {
    const amount = Math.floor(
      gsap.utils.random(options.minParticles, options.maxParticles)
    )

    const particlesContainer = document.createElement('div')
    particlesContainer.classList.add('particles-container')

    document.querySelector('.particles').appendChild(particlesContainer)

    gsap.set(particlesContainer, { left: x, top: y })

    for (let i = 0; i < amount; i++) {
      this.renderParticle(particlesContainer)
    }
  },

  startDemoCursor(options) {
    if (!document.querySelector('.bubbly-particle-trail')) return

    this.demoCursor.classList.add('bubbly-particle-trail-demo-cursor')
    document.body.appendChild(this.demoCursor)

    this.demoTween = gsap.fromTo(
      this.demoCursor,
      {
        left: '50%',
        pointerEvents: 'none',
        position: 'fixed',
        top: '50%',
        x: -300,
        zIndex: 123,
      },
      {
        x: 600,
        duration: 1.5,
        ease: 'power4.out',
        onComplete: () => {
          this.demoCursor.remove()
          this.demoTween.kill()
        },
        onUpdate: () => {
          const rect = this.demoCursor.getBoundingClientRect()

          this.handleMouseMove(
            {
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height / 2,
            },
            options,
          )
        },
      },
    )
  },
}

ParticleTrail.init()