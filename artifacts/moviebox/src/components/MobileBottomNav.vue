<template>
  <nav class="mobile-bottom-nav">
    <RouterLink to="/" class="nav-item" :class="{ active: route.name === 'home' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M2.5 9.93C2.5 9.34 2.76 8.78 3.21 8.4L10.71 2.08C11.46 1.46 12.54 1.46 13.29 2.08L20.79 8.4C21.24 8.78 21.5 9.34 21.5 9.93V20C21.5 21.1 20.6 22 19.5 22H15.5C14.95 22 14.5 21.55 14.5 21V16C14.5 15.72 14.28 15.5 14 15.5H10C9.72 15.5 9.5 15.72 9.5 16V21C9.5 21.55 9.05 22 8.5 22H4.5C3.4 22 2.5 21.1 2.5 20V9.93Z" :fill="route.name === 'home' ? 'url(#gnb-home)' : 'rgba(255,255,255,0.45)'" />
        <defs><linearGradient id="gnb-home" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse"><stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/></linearGradient></defs>
      </svg>
      <span>Home</span>
    </RouterLink>

    <RouterLink to="/web/movie" class="nav-item" :class="{ active: route.name === 'movies' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" :stroke="route.name === 'movies' ? 'url(#gnb-movie)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5"/>
        <path d="M8 4v16M16 4v16M2 12h20" :stroke="route.name === 'movies' ? 'url(#gnb-movie)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5" stroke-linecap="round"/>
        <defs><linearGradient id="gnb-movie" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse"><stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/></linearGradient></defs>
      </svg>
      <span>Movies</span>
    </RouterLink>

    <RouterLink to="/live-tv" class="nav-item live-nav" :class="{ active: route.name === 'live-tv' }">
      <div class="live-icon-wrap">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="13" rx="2" :stroke="route.name === 'live-tv' ? 'url(#gnb-live)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5"/>
          <circle cx="12" cy="13.5" r="2.5" :stroke="route.name === 'live-tv' ? 'url(#gnb-live2)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5"/>
          <path d="M8 7V5M12 7V3M16 7V5" :stroke="route.name === 'live-tv' ? 'url(#gnb-live3)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5" stroke-linecap="round"/>
          <defs>
            <linearGradient id="gnb-live" x1="2" y1="13" x2="22" y2="13" gradientUnits="userSpaceOnUse"><stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/></linearGradient>
            <linearGradient id="gnb-live2" x1="9" y1="13" x2="15" y2="13" gradientUnits="userSpaceOnUse"><stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/></linearGradient>
            <linearGradient id="gnb-live3" x1="8" y1="5" x2="16" y2="5" gradientUnits="userSpaceOnUse"><stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/></linearGradient>
          </defs>
        </svg>
        <span class="live-dot-badge"></span>
      </div>
      <span>Live TV</span>
    </RouterLink>

    <RouterLink to="/web/tv-series" class="nav-item" :class="{ active: route.name === 'series' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" :stroke="route.name === 'series' ? 'url(#gnb-tv)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5"/>
        <path d="M8 7L12 3l4 4" :stroke="route.name === 'series' ? 'url(#gnb-tv)' : 'rgba(255,255,255,0.45)'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <defs><linearGradient id="gnb-tv" x1="2" y1="14" x2="22" y2="14" gradientUnits="userSpaceOnUse"><stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/></linearGradient></defs>
      </svg>
      <span>Series</span>
    </RouterLink>

    <button class="nav-item" @click="moreOpen = !moreOpen">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="1.5" fill="rgba(255,255,255,0.45)"/>
        <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.45)"/>
        <circle cx="19" cy="12" r="1.5" fill="rgba(255,255,255,0.45)"/>
      </svg>
      <span>More</span>
    </button>

    <Transition name="fade-up">
      <div v-if="moreOpen" class="more-popup" @click.stop>
        <div class="more-overlay" @click="moreOpen = false" />
        <div class="more-sheet">
          <div class="more-handle" />
          <RouterLink to="/web/animated-series" class="more-item" @click="moreOpen = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/><path d="M8.5 9C8.5 7 10 5.5 12 5.5" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round"/><path d="M15.5 9C15.5 7 14 5.5 12 5.5" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round"/><path d="M9 13a3 3 0 006 0" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/></svg>
            Animation
          </RouterLink>
          <RouterLink to="/most-watched" class="more-item" @click="moreOpen = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 17l4-8 4 5 4-10 4 8" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Most Watched
          </RouterLink>
          <RouterLink to="/short-series" class="more-item" @click="moreOpen = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Short Series
          </RouterLink>
          <RouterLink to="/admin" class="more-item admin-more" @click="moreOpen = false" v-if="isAdmin">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1z" stroke="#fbb827" stroke-width="1.5"/></svg>
            Admin Dashboard
          </RouterLink>
          <button v-if="!isLoggedIn" class="more-item" @click="openLogin(); moreOpen = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round"/></svg>
            Sign In / Register
          </button>
          <button v-else class="more-item" @click="openSubscriptionModal(); moreOpen = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#fbb827" stroke-width="1.5"/></svg>
            {{ isSubActive ? 'Subscription Active' : 'Get Premium' }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuth } from "../stores/useAuth";
import { useSubscription } from "../stores/useSubscription";

const route = useRoute();
const moreOpen = ref(false);
const { isAdmin, isLoggedIn, openLogin } = useAuth();
const { isActive: isSubActive, openSubscriptionModal } = useSubscription();
</script>

<style scoped>
.mobile-bottom-nav {
  display: none;
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
  background: #16181d; border-top: 1px solid rgba(255,255,255,0.08);
  height: 60px; flex-direction: row; align-items: center;
  justify-content: space-around; padding: 0 4px;
}
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 1; padding: 6px 4px; color: rgba(255,255,255,0.45); text-decoration: none; font-size: 10px; font-weight: 500; cursor: pointer; background: none; border: none; transition: color 0.15s; }
.nav-item.active { background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.nav-item span { font-size: 10px; }

.live-icon-wrap { position: relative; }
.live-dot-badge { position: absolute; top: 0; right: -2px; width: 7px; height: 7px; border-radius: 50%; background: #ff3b30; border: 1.5px solid #16181d; animation: lp 1.5s infinite; }
@keyframes lp { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.more-popup { position: fixed; inset: 0; z-index: 300; display: flex; align-items: flex-end; }
.more-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); }
.more-sheet { position: relative; width: 100%; background: #1e2029; border-radius: 16px 16px 0 0; padding: 8px 0 24px; z-index: 1; }
.more-handle { width: 36px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin: 0 auto 12px; }
.more-item { display: flex; align-items: center; gap: 12px; padding: 14px 20px; color: rgba(255,255,255,0.75); text-decoration: none; font-size: 14px; font-weight: 500; transition: background 0.15s; background: none; border: none; width: 100%; cursor: pointer; }
.more-item:hover { background: rgba(255,255,255,0.05); }
.admin-more { color: #fbb827; }

.fade-up-enter-active, .fade-up-leave-active { transition: opacity 0.2s; }
.fade-up-enter-from, .fade-up-leave-to { opacity: 0; }

@media (max-width: 768px) { .mobile-bottom-nav { display: flex; } }
</style>
