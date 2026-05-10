<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <div v-if="isOpen" class="sidebar-overlay" @click="$emit('close')" />

    <div class="sidebar-inner">
      <!-- Language selector -->
      <div class="lang-section">
        <button class="lang-btn" @click="langOpen = !langOpen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
            <path d="M12 3c-3.5 4-3.5 14 0 18M12 3c3.5 4 3.5 14 0 18M3 12h18" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>{{ currentLang }}</span>
          <svg class="chevron" :class="{ rotated: langOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div v-if="langOpen" class="lang-dropdown">
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="lang-option"
            :class="{ active: lang.name === currentLang }"
            @click="selectLang(lang.name)"
          >
            {{ lang.name }}
          </button>
        </div>
      </div>

      <div class="divider" />

      <!-- Navigation -->
      <nav class="nav-list">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ 'nav-item--active': route.name === item.routeName }"
          @click="$emit('close')"
        >
          <span class="nav-icon" v-html="item.icon" />
          <span class="nav-title">{{ item.label }}</span>
        </RouterLink>
        <a
          v-for="item in externalItems"
          :key="item.href"
          :href="item.href"
          class="nav-item"
        >
          <span class="nav-icon" v-html="item.icon" />
          <span class="nav-title">{{ item.label }}</span>
        </a>
      </nav>

      <div class="divider" />

      <!-- Download App CTA -->
      <a href="/downloadApp" class="download-app-btn">
        <div class="download-app-left">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2.5v9M7 9l3 2.5 3-2.5" stroke="#101114" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.5 13.5v1.5a2 2 0 002 2h9a2 2 0 002-2v-1.5" stroke="#101114" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>Download App</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="9" height="9" rx="1" stroke="#101114" stroke-width="1.5"/>
          <rect x="13" y="2" width="9" height="9" rx="1" stroke="#101114" stroke-width="1.5"/>
          <rect x="2" y="13" width="9" height="9" rx="1" stroke="#101114" stroke-width="1.5"/>
          <path d="M13 16h2M16 13h3M16 16v3M19 19h-3" stroke="#101114" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

defineProps<{ isOpen: boolean }>();
defineEmits<{ close: [] }>();

const route = useRoute();
const langOpen = ref(false);
const currentLang = ref("ENG");

const languages = [
  { code: "lg", name: "LUGANDA" },
  { code: "ach", name: "LUO" },
  { code: "teo", name: "TESO" },
  { code: "en", name: "ENG" },
  { code: "sw", name: "KISWAHILI" },
  { code: "others", name: "OTHERS" },
];

function selectLang(name: string) {
  currentLang.value = name;
  langOpen.value = false;
}

const navItems = [
  {
    to: "/",
    routeName: "home",
    label: "Home",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <defs><linearGradient id="home-g" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse"><stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/></linearGradient></defs>
      <path d="M2.5 9.93C2.5 9.34 2.76 8.78 3.21 8.4L10.71 2.08C11.46 1.46 12.54 1.46 13.29 2.08L20.79 8.4C21.24 8.78 21.5 9.34 21.5 9.93V20C21.5 21.1 20.6 22 19.5 22H15.5C14.95 22 14.5 21.55 14.5 21V16C14.5 15.72 14.28 15.5 14 15.5H10C9.72 15.5 9.5 15.72 9.5 16V21C9.5 21.55 9.05 22 8.5 22H4.5C3.4 22 2.5 21.1 2.5 20V9.93Z" fill="currentColor"/>
    </svg>`,
  },
  {
    to: "/web/tv-series",
    routeName: "series",
    label: "TV Show",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 7L12 3l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    to: "/web/movie",
    routeName: "movies",
    label: "Movie",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 4v16M16 4v16M2 12h20M2 8h6M16 8h6M2 16h6M16 16h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    to: "/web/animated-series",
    routeName: "animation",
    label: "Animation",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 9C8.5 7 10 5.5 12 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15.5 9C15.5 7 14 5.5 12 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 13a3 3 0 006 0" stroke="currentColor" stroke-width="1.5"/></svg>`,
  },
];

const externalItems = [
  {
    href: "/ranking-list",
    label: "Most Watched",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 15l3-6 3 4 3-8 3 6 2-3" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    href: "/downloadApp",
    label: "MovieBox App",
    icon: `<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="3" y="1" width="12" height="16" rx="2" stroke="rgba(159,160,161,0.8)" stroke-width="1.35"/><path d="M9 4.5v5M7 7.5l2 2 2-2" stroke="rgba(159,160,161,0.8)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    href: "/fm-download",
    label: "FM Download",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8.4 11.25a2 2 0 000-3M10.15 13a3.5 3.5 0 000-7" stroke="rgba(159,160,161,0.8)" stroke-width="1.41" stroke-linecap="round"/></svg>`,
  },
  {
    href: "/games",
    label: "Games",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="10" rx="3" stroke="rgba(159,160,161,0.8)" stroke-width="1.5"/><path d="M7 9v4M5 11h4" stroke="rgba(159,160,161,0.8)" stroke-width="1.5" stroke-linecap="round"/><circle cx="13" cy="10" r="0.75" fill="rgba(159,160,161,0.8)"/><circle cx="15" cy="12" r="0.75" fill="rgba(159,160,161,0.8)"/></svg>`,
  },
  {
    href: "/old-moviebox",
    label: "Old Moviebox",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="rgba(159,160,161,0.8)" stroke-width="1.5"/></svg>`,
  },
];
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 96px;
  left: 0;
  bottom: 0;
  width: 240px;
  z-index: 50;
  background: #16181d;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sidebar-overlay {
  display: none;
}

.sidebar-inner {
  flex: 1;
  overflow-y: auto;
  padding: 12px 8px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lang-section {
  position: relative;
  margin-bottom: 4px;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.chevron {
  margin-left: auto;
  transition: transform 0.2s;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #1e2029;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.lang-option {
  display: block;
  width: 100%;
  padding: 9px 14px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}

.lang-option:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.lang-option.active {
  color: #2ff58b;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
  margin: 8px 4px;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 400;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.9);
}

.nav-item--active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item--active .nav-icon {
  color: transparent;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  -webkit-background-clip: text;
  background-clip: text;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.nav-title {
  font-size: 14px;
}

.download-app-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-radius: 10px;
  text-decoration: none;
  margin: 4px 4px 0;
  transition: opacity 0.2s;
}

.download-app-btn:hover {
  opacity: 0.9;
}

.download-app-left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #101114;
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    top: 124px;
    width: 260px;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.5);
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }
}
</style>
