<template>
  <header class="site-header">
    <!-- Top row: logo + search + download -->
    <div class="header-top">
      <div class="header-left">
        <button class="hamburger" @click="$emit('toggle-sidebar')" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <RouterLink to="/" class="logo-link">
          <img
            src="https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg"
            alt="MovieBox UG"
            class="logo-img"
          />
          <span class="logo-ug">UG</span>
        </RouterLink>
        <span class="header-tagline">All Translated Movies in Uganda</span>
      </div>

      <div class="header-search">
        <div class="search-wrap">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input
            type="search"
            v-model="searchQuery"
            placeholder="Search movies, TV shows..."
            class="search-input"
            @keydown.enter="doSearch"
          />
        </div>
      </div>

      <div class="header-right">
        <a href="/downloadApp" class="download-btn">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v10M7 9l3 3 3-3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 14v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>Download App</span>
        </a>
      </div>
    </div>

    <!-- Mobile search row -->
    <div class="mobile-search-row">
      <div class="search-wrap">
        <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search movies, shows..."
          class="search-input"
          @keydown.enter="doSearch"
        />
      </div>
    </div>

    <!-- Language tabs row (integrated into header) -->
    <div class="lang-tabs-row">
      <button
        v-for="lang in languages"
        :key="lang.code"
        class="lang-tab"
        :class="{ active: activeLang === lang.code }"
        @click="setLanguage(lang.code)"
      >{{ lang.label }}</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useLanguageFilter } from "../composables/useLanguageFilter";

defineEmits<{ "toggle-sidebar": [] }>();

const { activeLang, setLanguage } = useLanguageFilter();

const searchQuery = ref("");

const languages = [
  { code: "lg",     label: "LUGANDA"   },
  { code: "ach",    label: "LUO"       },
  { code: "teo",    label: "TESO"      },
  { code: "en",     label: "ENG"       },
  { code: "sw",     label: "KISWAHILI" },
  { code: "others", label: "OTHERS"    },
];

function doSearch() {
  if (searchQuery.value.trim()) {
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.value)}`;
  }
}
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #101114;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* ── Top row ── */
.header-top {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 16px;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: white;
  border-radius: 2px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}
.logo-img { height: 24px; width: auto; }
.logo-ug {
  font-size: 13px;
  font-weight: 800;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
}

.header-tagline {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
  border-left: 1px solid rgba(255,255,255,0.12);
  padding-left: 10px;
}

.header-search {
  flex: 1;
  max-width: 440px;
  margin: 0 auto;
}
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 11px;
  pointer-events: none;
}
.search-input {
  width: 100%;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 24px;
  padding: 7px 14px 7px 34px;
  color: white;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input::placeholder { color: rgba(255,255,255,0.35); }
.search-input:focus { border-color: rgba(44,215,255,0.4); }

.header-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;
}
.download-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-radius: 20px;
  text-decoration: none;
  color: #101114;
  font-weight: 600;
  font-size: 12px;
  white-space: nowrap;
  transition: opacity 0.2s;
}
.download-btn:hover { opacity: 0.9; }

/* ── Mobile search row ── */
.mobile-search-row {
  display: none;
  padding: 0 12px 7px;
}

/* ── Language tabs row ── */
.lang-tabs-row {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 16px;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
  border-top: 1px solid rgba(255,255,255,0.05);
  background: #16181d;
}
.lang-tabs-row::-webkit-scrollbar { display: none; }

.lang-tab {
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 14px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.45);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.7px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: color 0.15s;
  flex-shrink: 0;
}
.lang-tab:hover { color: rgba(255,255,255,0.8); }
.lang-tab.active { color: white; }
.lang-tab.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  height: 2px;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-radius: 2px 2px 0 0;
}

/* ── Mobile overrides ── */
@media (max-width: 768px) {
  .header-top { height: 46px; padding: 0 12px; }
  .hamburger { display: flex; }
  .header-tagline { display: none; }
  .header-search { display: none; }
  .mobile-search-row { display: block; }
  .download-btn span { display: none; }
  .download-btn { padding: 6px 9px; }
  .lang-tabs-row { padding: 0 10px; height: 34px; }
  .lang-tab { font-size: 10px; padding: 0 10px; }
  .lang-tab.active::after { left: 6px; right: 6px; }
}
</style>
