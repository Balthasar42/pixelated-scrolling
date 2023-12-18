<template>
  <div>
    <!-- <Preloader v-if="!isPreloaded" /> -->
    <Navigation />
    <main class="text-white">
      <!-- Section #1 -->
      <PixelatedSection :image="Image0">
        <h2 class="mb-6 text-7xl font-serif">
          World of Aztlanquaria
        </h2>
        <p class="mb-4 text-xl">
          In the fathomless depths of the ocean, where sunlight struggled to pierce the veil of indigo, lay the hidden realm of Aztlanquaria. This enchanted underwater kingdom blended the mysteries of the deep with the ancient Aztec civilization, creating a mesmerizing environment that danced with vibrant hues.
        </p>
      </PixelatedSection>

      <!-- Section #2 -->
      <PixelatedSection :image="Image1">
        <h2 class="mb-6 text-7xl font-serif">
          Luminescent glyphs
        </h2>
        <p class="mb-4 text-xl">
          Corals adorned with luminescent glyphs lined the underwater palaces, weaving tales of a time when the ocean and the cosmos were one. Schools of iridescent fish moved like living constellations, their scales shimmering with the echoes of celestial patterns. Massive seashell structures, reminiscent of Aztec temples.
        </p>
      </PixelatedSection>

      <!-- Section #3 -->
      <PixelatedSection :image="Image2">
        <h2 class="mb-6 text-7xl font-serif">
          Throne room
        </h2>
        <p class="mb-4 text-xl">
          In the heart of Aztlanquaria, the throne room of Queen Calypsa, the sovereign of the deep, rose like a living coral reef. Her regal presence radiated wisdom earned from centuries of navigating the currents of both time and tide. She wore a crown crafted from the rarest pearls, each one holding the memory of an ancient oceanic tale.
        </p>
      </PixelatedSection>

      <!-- Section #4 -->
      <PixelatedSection :image="Image3">
        <h2 class="mb-6 text-7xl font-serif">
          Shadows of the ocean
        </h2>
        <p class="mb-4 text-xl">
          But beyond the beauty of Aztlanquaria lurked challenges as deep as the ocean itself. Dark shadows, remnants of a time long past, threatened to breach the harmony of this underwater haven. The queen, guided by the wisdom of her ancestors, embarked on a quest to protect her realm, unveiling forgotten artifacts.
        </p>
      </PixelatedSection>
    </main>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue"
import Lenis from "@studio-freight/lenis"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Navigation from "@/components/Navigation.vue"

// import Preloader from "@/components/Preloader.vue"
import PixelatedSection from "@/components/PixelatedSection.vue"

import Image0 from "@/assets/img/0.jpg"
import Image1 from "@/assets/img/1.jpg"
import Image2 from "@/assets/img/2.jpg"
import Image3 from "@/assets/img/3.jpg"

gsap.registerPlugin(ScrollTrigger)

// const isPreloaded = ref(false)
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  orientation: "vertical",
})

lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
</script>
