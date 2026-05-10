<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <!-- Overlay for mobile -->
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
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="nav-item"
          :class="{ 'nav-item--active': item.active }"
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

defineProps<{ isOpen: boolean }>();
defineEmits<{ close: [] }>();

const langOpen = ref(false);
const currentLang = ref("English");

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "tr", name: "Türkçe" },
  { code: "th", name: "ภาษาไทย" },
];

function selectLang(name: string) {
  currentLang.value = name;
  langOpen.value = false;
}

const navItems = [
  {
    href: "/",
    label: "Home",
    active: true,
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="home-grad" x1="2.5" y1="11.5" x2="21.5" y2="12" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1CB7FF"/>
          <stop offset="0.5" stop-color="#2FF58B"/>
        </linearGradient>
      </defs>
      <path d="M2.5 9.93C2.5 9.34 2.76 8.78 3.21 8.4L10.71 2.08C11.46 1.46 12.54 1.46 13.29 2.08L20.79 8.4C21.24 8.78 21.5 9.34 21.5 9.93V20C21.5 21.1 20.6 22 19.5 22H15.5C14.95 22 14.5 21.55 14.5 21V16C14.5 15.72 14.28 15.5 14 15.5H10C9.72 15.5 9.5 15.72 9.5 16V21C9.5 21.55 9.05 22 8.5 22H4.5C3.4 22 2.5 21.1 2.5 20V9.93Z" fill="url(#home-grad)"/>
    </svg>`,
  },
  {
    href: "/web/tv-series",
    label: "TV Show",
    active: false,
    icon: `<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.81 0.99C5.09 0.74 5.52 0.78 5.76 1.06L8.01 3.69C8.03 3.71 8.05 3.73 8.06 3.75H9.94C9.95 3.73 9.97 3.71 9.99 3.69L12.24 1.06C12.48 0.78 12.91 0.74 13.19 0.99C13.47 1.23 13.51 1.66 13.26 1.94L11.71 3.75H14.88C15.98 3.75 16.88 4.65 16.88 5.75V15.25C16.88 16.35 15.98 17.25 14.88 17.25H3.13C2.02 17.25 1.13 16.35 1.13 15.25V5.75C1.13 4.65 2.02 3.75 3.13 3.75H6.29L4.74 1.94C4.49 1.66 4.53 1.23 4.81 0.99ZM3.13 5.1H14.88C15.23 5.1 15.53 5.39 15.53 5.75V15.25C15.53 15.61 15.23 15.9 14.88 15.9H3.13C2.77 15.9 2.48 15.61 2.48 15.25V5.75C2.48 5.39 2.77 5.1 3.13 5.1Z" fill="rgba(255,255,255,0.6)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.63 8.42H4.13V9.6H5.64V13.21H7.12V9.6H8.63V8.42ZM10.55 8.42H9L10.81 13.21H12.42L14.2 8.42H12.69L11.63 11.87L10.55 8.42Z" fill="rgba(255,255,255,0.6)"/></svg>`,
  },
  {
    href: "/web/movie",
    label: "Movie",
    active: false,
    icon: `<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="rgba(255,255,255,0.6)" stroke-width="1.35"/><circle cx="9" cy="5.82" r="1.36" fill="rgba(255,255,255,0.6)"/><circle cx="9" cy="12.004" r="1.36" fill="rgba(255,255,255,0.6)"/><circle cx="12.09" cy="7.91" r="1.36" fill="rgba(255,255,255,0.6)"/><circle cx="5.91" cy="7.91" r="1.36" fill="rgba(255,255,255,0.6)"/></svg>`,
  },
  {
    href: "/web/animated-series",
    label: "Animation",
    active: false,
    icon: `<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9.5" r="6.5" stroke="rgba(255,255,255,0.6)" stroke-width="1.35"/><path d="M5 6.5c0-2 1.5-3.5 4-3.5" stroke="rgba(255,255,255,0.6)" stroke-width="1.3" stroke-linecap="round"/><path d="M13 6.5c0-2-1.5-3.5-4-3.5" stroke="rgba(255,255,255,0.6)" stroke-width="1.3" stroke-linecap="round"/><path d="M6.5 9.5a2.5 2.5 0 005 0" stroke="rgba(255,255,255,0.6)" stroke-width="1.3"/></svg>`,
  },
  {
    href: "/ranking-list",
    label: "Most Watched",
    active: false,
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 15l3-6 3 4 3-8 3 6 2-3" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    href: "/downloadApp",
    label: "MovieBox App",
    active: false,
    icon: `<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="3.09" y="1.13" width="11.81" height="15.75" rx="1.57" stroke="rgba(255,255,255,0.6)" stroke-width="1.35"/><path d="M9 4.5v5M7 7.5l2 2 2-2" stroke="rgba(255,255,255,0.6)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    href: "/fm-download",
    label: "FM Download",
    active: false,
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11.5 18H5a1 1 0 01-1-1V3a1 1 0 011-1h10a1 1 0 011 1v8" stroke="rgba(159,160,161,0.8)" stroke-width="1.5" stroke-linecap="round"/><path d="M15.25 13.73v2.94l1.05-.87M15.25 13.73v2.94l-1.05-.87" stroke="rgba(159,160,161,0.8)" stroke-width="1.3" stroke-linecap="round"/><path d="M8.4 11.25a2 2 0 000-3M10.15 13a3.5 3.5 0 000-7" stroke="rgba(159,160,161,0.8)" stroke-width="1.41" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    href: "/games",
    label: "Games",
    active: false,
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="10" rx="3" stroke="rgba(159,160,161,0.8)" stroke-width="1.5"/><path d="M7 9v4M5 11h4" stroke="rgba(159,160,161,0.8)" stroke-width="1.5" stroke-linecap="round"/><circle cx="13" cy="10" r="0.75" fill="rgba(159,160,161,0.8)"/><circle cx="15" cy="12" r="0.75" fill="rgba(159,160,161,0.8)"/></svg>`,
  },
  {
    href: "/old-moviebox",
    label: "Old Moviebox",
    active: false,
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="rgba(159,160,161,0.8)" stroke-width="1.5"/><path d="M8 8l4 4-4 4" stroke="rgba(159,160,161,0.8)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
];
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 56px;
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

.lang-btn .chevron {
  margin-left: auto;
  transition: transform 0.2s;
}

.lang-btn .chevron.rotated {
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
    top: 88px;
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
