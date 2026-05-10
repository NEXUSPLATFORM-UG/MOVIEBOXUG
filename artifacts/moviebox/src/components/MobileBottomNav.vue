<template>
  <nav class="mobile-bottom-nav">
    <RouterLink to="/" class="nav-item" :class="{ active: route.name === 'home' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M2.5 9.93C2.5 9.34 2.76 8.78 3.21 8.4L10.71 2.08C11.46 1.46 12.54 1.46 13.29 2.08L20.79 8.4C21.24 8.78 21.5 9.34 21.5 9.93V20C21.5 21.1 20.6 22 19.5 22H15.5C14.95 22 14.5 21.55 14.5 21V16C14.5 15.72 14.28 15.5 14 15.5H10C9.72 15.5 9.5 15.72 9.5 16V21C9.5 21.55 9.05 22 8.5 22H4.5C3.4 22 2.5 21.1 2.5 20V9.93Z"
          :fill="route.name === 'home' ? 'url(#grad-home)' : 'rgba(255,255,255,0.45)'"
        />
        <defs>
          <linearGradient id="grad-home" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
        </defs>
      </svg>
      <span>Home</span>
    </RouterLink>

    <RouterLink to="/web/movie" class="nav-item" :class="{ active: route.name === 'movies' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" :stroke="route.name === 'movies' ? 'url(#grad-movie)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5"/>
        <path d="M8 4v16M16 4v16M2 12h20M2 8h6M16 8h6M2 16h6M16 16h6" :stroke="route.name === 'movies' ? 'url(#grad-movie2)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5" stroke-linecap="round"/>
        <defs>
          <linearGradient id="grad-movie" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
          <linearGradient id="grad-movie2" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
        </defs>
      </svg>
      <span>Movies</span>
    </RouterLink>

    <RouterLink to="/web/tv-series" class="nav-item" :class="{ active: route.name === 'series' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" :stroke="route.name === 'series' ? 'url(#grad-tv)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5"/>
        <path d="M8 7L12 3l4 4" :stroke="route.name === 'series' ? 'url(#grad-tv2)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
          <linearGradient id="grad-tv" x1="2" y1="14" x2="22" y2="14" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
          <linearGradient id="grad-tv2" x1="8" y1="5" x2="16" y2="5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
        </defs>
      </svg>
      <span>Series</span>
    </RouterLink>

    <RouterLink to="/web/animated-series" class="nav-item" :class="{ active: route.name === 'animation' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" :stroke="route.name === 'animation' ? 'url(#grad-anim)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5"/>
        <path d="M8.5 9C8.5 7 10 5.5 12 5.5" :stroke="route.name === 'animation' ? 'url(#grad-anim2)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M15.5 9C15.5 7 14 5.5 12 5.5" :stroke="route.name === 'animation' ? 'url(#grad-anim3)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M9 13a3 3 0 006 0" :stroke="route.name === 'animation' ? 'url(#grad-anim4)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5"/>
        <defs>
          <linearGradient id="grad-anim" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
          <linearGradient id="grad-anim2" x1="8" y1="7" x2="13" y2="7" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
          <linearGradient id="grad-anim3" x1="11" y1="7" x2="16" y2="7" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
          <linearGradient id="grad-anim4" x1="9" y1="13" x2="15" y2="13" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
          </linearGradient>
        </defs>
      </svg>
      <span>Anime</span>
    </RouterLink>

    <button class="nav-item" @click="moreOpen = !moreOpen">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="1.5" fill="rgba(255,255,255,0.45)"/>
        <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.45)"/>
        <circle cx="19" cy="12" r="1.5" fill="rgba(255,255,255,0.45)"/>
      </svg>
      <span>More</span>
    </button>

    <!-- More popup -->
    <Transition name="fade-up">
      <div v-if="moreOpen" class="more-popup" @click.stop>
        <div class="more-overlay" @click="moreOpen = false" />
        <div class="more-sheet">
          <div class="more-handle" />
          <a href="/ranking-list" class="more-item">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 15l3-6 3 4 3-8 3 6 2-3" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Most Watched
          </a>
          <a href="/downloadApp" class="more-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="1" width="12" height="16" rx="2" stroke="rgba(255,255,255,0.6)" stroke-width="1.3"/><path d="M9 5v5M7 8l2 2 2-2" stroke="rgba(255,255,255,0.6)" stroke-width="1.3" stroke-linecap="round"/></svg>
            MovieBox App
          </a>
          <a href="/fm-download" class="more-item">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M8 11a2.5 2.5 0 000-4M10 13a4.5 4.5 0 000-8" stroke="rgba(255,255,255,0.6)" stroke-width="1.4" stroke-linecap="round"/></svg>
            FM Download
          </a>
          <a href="/games" class="more-item">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="10" rx="3" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/><path d="M7 9v4M5 11h4" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round"/><circle cx="13" cy="10" r="0.75" fill="rgba(255,255,255,0.6)"/><circle cx="15" cy="12" r="0.75" fill="rgba(255,255,255,0.6)"/></svg>
            Games
          </a>
          <a href="/old-moviebox" class="more-item">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M6 2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/></svg>
            Old Moviebox
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const moreOpen = ref(false);
</script>

<style scoped>
.mobile-bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: #16181d;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 4px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex: 1;
  padding: 6px 4px;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.15s;
}

.nav-item.active {
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-item span {
  font-size: 10px;
}

.more-popup {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: flex-end;
}

.more-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.more-sheet {
  position: relative;
  width: 100%;
  background: #1e2029;
  border-radius: 16px 16px 0 0;
  padding: 8px 0 24px;
  z-index: 1;
}

.more-handle {
  width: 36px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin: 0 auto 12px;
}

.more-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s;
}

.more-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.2s;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .mobile-bottom-nav {
    display: flex;
  }
}
</style>
