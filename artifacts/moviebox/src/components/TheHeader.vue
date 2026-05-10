<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- Left: hamburger + logo + tagline -->
      <div class="header-left">
        <button class="hamburger" @click="$emit('toggle-sidebar')" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a href="/" class="logo-link">
          <img
            src="https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg"
            alt="MovieBox UG"
            class="logo-img"
          />
          <span class="logo-ug">UG</span>
        </a>
        <div class="header-tagline">All Ugandan Language Translated Movies</div>
      </div>

      <!-- Center: search bar (desktop) -->
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

      <!-- Right: search icon (mobile) + Download App -->
      <div class="header-right">
        <a href="/downloadApp" class="download-btn">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v10M7 9l3 3 3-3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 14v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>Download App</span>
        </a>
      </div>
    </div>

    <!-- Mobile search bar -->
    <div class="mobile-search-bar">
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
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
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineEmits<{ "toggle-sidebar": [] }>();

const searchQuery = ref("");

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

.header-inner {
  display: flex;
  align-items: center;
  height: 56px;
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

.logo-img {
  height: 26px;
  width: auto;
}

.logo-ug {
  font-size: 14px;
  font-weight: 800;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
}

.header-tagline {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
  font-weight: 400;
  letter-spacing: 0.2px;
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
  left: 12px;
  flex-shrink: 0;
  pointer-events: none;
}

.search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 8px 16px 8px 36px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-input:focus {
  border-color: rgba(44, 215, 255, 0.4);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: auto;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-radius: 20px;
  text-decoration: none;
  color: #101114;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.download-btn:hover {
  opacity: 0.9;
}

.mobile-search-bar {
  display: none;
  padding: 0 12px 8px;
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 12px;
    height: 48px;
  }

  .hamburger {
    display: flex;
  }

  .header-tagline {
    display: none;
  }

  .header-search {
    display: none;
  }

  .download-btn span {
    display: none;
  }

  .download-btn {
    padding: 7px 10px;
  }

  .mobile-search-bar {
    display: block;
  }
}

@media (max-width: 480px) {
  .logo-ug {
    font-size: 12px;
  }
}
</style>
