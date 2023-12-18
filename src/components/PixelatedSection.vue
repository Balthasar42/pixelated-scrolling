<template>
  <div ref="section" class="section relative flex justify-end">
    <!-- <div class="section--canvas" :style="{ backgroundImage: `url(${imagePath})` }"> -->
    <div ref="canvasWrap" class="section__canvas-wrap absolute inset-0 w-full h-full opacity-0" :style="{ backgroundImage: `url(${image})` }">
      <canvas ref="canvas" />
    </div>
    <div ref="content" class="section__content p-12 z-10 w-1/2 flex flex-col text-right">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const props = defineProps<{
  image: string
}>()

let ctx: CanvasRenderingContext2D

const section = ref<HTMLElement>()
const content = ref<HTMLElement>()
const canvasWrap = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const img = ref<HTMLImageElement>()

const pxFactorValues = [1, 2, 4, 8, 16, 32, 100]
const pxIndex = ref(0)

function setCanvasSize() {
  if (!canvas.value || !canvasWrap.value)
    return
  canvas.value.width = canvasWrap.value.offsetWidth
  canvas.value.height = canvasWrap.value.offsetHeight
}

function animatePixels() {
  if (pxIndex.value < pxFactorValues.length) {
    setTimeout(() => {
      render()
      pxIndex.value++
      animatePixels()
    }, pxIndex.value === 0 ? 300 : 80)
  }
  else {
    pxIndex.value = pxFactorValues.length - 1
  }
}

function render() {
  if (!canvas.value || !canvasWrap.value)
    return

  const offsetWidth = canvasWrap.value.offsetWidth
  const offsetHeight = canvasWrap.value.offsetHeight
  const w = offsetWidth + offsetWidth * 0.05
  const h = offsetHeight + offsetHeight * 0.05

  // Get the pixel factor based on the current index
  const pxFactor = pxFactorValues[pxIndex.value]
  const size = pxFactor * 0.01

  // Turn off image smoothing to achieve the pixelated effect
  ctx.imageSmoothingEnabled = size === 1

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Draw the original image at a fraction of the final size
  ctx.drawImage(img.value!, 0, 0, w * size, h * size)
  ctx.drawImage(
    canvas.value,
    0,
    0,
    w * size,
    h * size,
    0,
    0,
    w,
    h,
  )
}

function init() {
  window.addEventListener("resize", () => {
    setCanvasSize()
    render()
  })

  // GSAP Power <3
  ScrollTrigger.create({
    trigger: section.value,
    start: "top bottom",
    onEnter: () => {
      gsap.set(canvasWrap.value!, {
        opacity: 1,
      })
    },
    once: true,
  })

  ScrollTrigger.create({
    trigger: section.value,
    start: "top+=20% bottom",
    onEnter: () => {
      animatePixels()
    },
    once: true,
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    .to(content.value!, {
      ease: "none",
      yPercent: 50,
    })
}

onMounted(() => {
  if (!canvas.value)
    return

  ctx = canvas.value.getContext("2d")!

  img.value = new Image()
  img.value.src = props.image

  img.value.onload = () => {
    setCanvasSize()
    render()
    init()
  }
})
</script>

<style scoped lang="postcss">
.section{
  width: 100vw;
  --ratio: 2048 / 1536;
  height: calc(var(--ratio) * 100vw);
}
</style>
