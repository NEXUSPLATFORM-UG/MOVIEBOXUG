<template>
  <div class="hero-banner">
    <!-- Main slide area -->
    <div class="slide-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        v-for="(slide, idx) in slides"
        :key="slide.id"
        class="slide"
        :style="{ backgroundImage: `url(${slide.bgImage})`, '--bg-color': slide.bgColor }"
      >
        <!-- Top gradient overlay -->
        <div
          class="slide-gradient-top"
          :style="{
            background: `linear-gradient(180deg, ${slide.bgColor} 0%, ${slide.bgColor}CC 30%, ${slide.bgColor}55 60%, ${slide.bgColor}00 100%)`
          }"
        />
        <!-- Bottom shadow for reading -->
        <div class="slide-gradient-bottom" />

        <!-- Slide content -->
        <div class="slide-content">
          <div class="slide-meta">
            <span class="slide-type-badge">
              <svg v-if="slide.type === 'series'" width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.81 0.99C5.09 0.74 5.52 0.78 5.76 1.06L8.01 3.69H9.94L12.24 1.06C12.48 0.78 12.91 0.74 13.19 0.99C13.47 1.23 13.51 1.66 13.26 1.94L11.71 3.75H14.88C15.98 3.75 16.88 4.65 16.88 5.75V15.25C16.88 16.35 15.98 17.25 14.88 17.25H3.13C2.02 17.25 1.13 16.35 1.13 15.25V5.75C1.13 4.65 2.02 3.75 3.13 3.75H6.29L4.74 1.94C4.49 1.66 4.53 1.23 4.81 0.99Z" fill="rgba(255,255,255,0.8)"/>
              </svg>
              <svg v-else-if="slide.type === 'animation'" width="14" height="14" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9.5" r="6.5" stroke="rgba(255,255,255,0.8)" stroke-width="1.35"/>
              </svg>
              <svg v-else width="14" height="14" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="rgba(255,255,255,0.8)" stroke-width="1.35"/>
                <circle cx="9" cy="5.82" r="1.36" fill="rgba(255,255,255,0.8)"/>
                <circle cx="9" cy="12" r="1.36" fill="rgba(255,255,255,0.8)"/>
                <circle cx="12.09" cy="7.91" r="1.36" fill="rgba(255,255,255,0.8)"/>
                <circle cx="5.91" cy="7.91" r="1.36" fill="rgba(255,255,255,0.8)"/>
              </svg>
              <span>{{ slide.year }}</span>
              <span class="dot">·</span>
              <span>{{ slide.genres }}</span>
            </span>
          </div>
          <h1 class="slide-title">{{ slide.title }}</h1>
          <a :href="slide.href" class="watch-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 5l11 7-11 7V5z" fill="white"/>
            </svg>
            Watch Now
          </a>
        </div>
      </div>
    </div>

    <!-- Prev/Next arrows -->
    <button class="arrow arrow-prev" @click="prev" aria-label="Previous">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12.917 15.833L7.083 10l5.834-5.833" stroke="white" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="arrow arrow-next" @click="next" aria-label="Next">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7.083 4.167L12.917 10l-5.834 5.833" stroke="white" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Dot indicators -->
    <div class="dots">
      <button
        v-for="(_, idx) in slides"
        :key="idx"
        class="dot-btn"
        :class="{ active: idx === currentIndex }"
        @click="goTo(idx)"
        :aria-label="`Go to slide ${idx + 1}`"
      />
    </div>

    <!-- Side list (desktop) -->
    <div class="side-list">
      <div
        v-for="(slide, idx) in slides"
        :key="slide.id"
        class="side-item"
        :class="{ 'side-item--active': idx === currentIndex }"
        @click="goTo(idx)"
      >
        <div class="side-thumb">
          <img :src="slide.bgImage.replace('w_1600', 'w_120').replace('h_900', 'h_80')" :alt="slide.title" loading="lazy" />
        </div>
        <div class="side-info">
          <div class="side-title">{{ slide.subtitle }}</div>
          <div class="side-meta">{{ slide.year }} · {{ slide.genres }}</div>
        </div>
        <div class="side-play">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="play-grad" x1="0" y1="12" x2="24" y2="12" gradientUnits="userSpaceOnUse">
                <stop stop-color="#1CB7FF"/>
                <stop offset="0.5" stop-color="#2FF58B"/>
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="12" fill="url(#play-grad)"/>
            <path d="M9.5 8l7 4-7 4V8z" fill="#101114"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { BannerSlide } from "../data/movies";

const props = defineProps<{ slides: BannerSlide[] }>();

const currentIndex = ref(0);
let autoTimer: ReturnType<typeof setInterval>;

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length;
  resetTimer();
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length;
  resetTimer();
}

function goTo(idx: number) {
  currentIndex.value = idx;
  resetTimer();
}

function startTimer() {
  autoTimer = setInterval(next, 5000);
}

function resetTimer() {
  clearInterval(autoTimer);
  startTimer();
}

onMounted(startTimer);
onUnmounted(() => clearInterval(autoTimer));
</script>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  background: #1a1c24;
}

.slide-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide {
  flex: 0 0 100%;
  position: relative;
  background-size: cover;
  background-position: center top;
}

.slide-gradient-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  z-index: 1;
}

.slide-gradient-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(0deg, #101114 0%, #10111480 50%, transparent 100%);
  z-index: 1;
}

.slide-content {
  position: absolute;
  bottom: 60px;
  left: 32px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slide-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.slide-type-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
}

.slide-type-badge .dot {
  color: rgba(255, 255, 255, 0.4);
}

.slide-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  line-height: 1.2;
}

.watch-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-radius: 24px;
  color: #101114;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  width: fit-content;
  transition: opacity 0.2s, transform 0.2s;
}

.watch-btn:hover {
  opacity: 0.92;
  transform: scale(1.02);
}

.watch-btn svg path {
  fill: #101114;
}

/* Arrows */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid white;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.arrow:hover {
  background: rgba(255, 255, 255, 0.2);
}

.arrow-prev {
  left: 12px;
}

.arrow-next {
  right: 12px;
}

/* Dots */
.dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 5;
}

.dot-btn {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: background 0.2s, width 0.2s;
}

.dot-btn.active {
  width: 20px;
  border-radius: 3px;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
}

/* Side list */
.side-list {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  background: linear-gradient(270deg, rgba(16,17,20,0.95) 0%, rgba(16,17,20,0) 100%);
  padding: 16px 8px 16px 32px;
  overflow-y: auto;
}

.side-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.side-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.side-item--active {
  background: rgba(255, 255, 255, 0.1);
}

.side-thumb {
  width: 48px;
  height: 36px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  background: #2b2e39;
}

.side-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.side-info {
  flex: 1;
  min-width: 0;
}

.side-title {
  font-size: 12px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-meta {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-play {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .hero-banner {
    height: 260px;
  }

  .slide-content {
    bottom: 40px;
    left: 16px;
    gap: 6px;
  }

  .slide-title {
    font-size: 18px;
    max-width: 200px;
  }

  .watch-btn {
    padding: 8px 16px;
    font-size: 13px;
  }

  .side-list {
    display: none;
  }

  .arrow {
    width: 32px;
    height: 32px;
  }

  .arrow-prev { left: 8px; }
  .arrow-next { right: 8px; }
}
</style>
