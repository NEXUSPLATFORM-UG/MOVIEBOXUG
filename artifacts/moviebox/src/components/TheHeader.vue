<template>
  <header class="site-header">
    <div class="header-top">
      <div class="header-left">
        <button class="hamburger" @click="$emit('toggle-sidebar')" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <RouterLink to="/" class="logo-link">
          <img src="https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg" alt="MovieBox UG" class="logo-img" />
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
          <input type="search" v-model="searchQuery" placeholder="Search movies, TV shows..." class="search-input" @keydown.enter="doSearch" />
        </div>
      </div>

      <div class="header-right">
        <!-- Logged in -->
        <div v-if="isLoggedIn" class="user-menu">
          <button class="user-btn" @click="userMenuOpen = !userMenuOpen">
            <div class="user-avatar">{{ currentUser?.name?.slice(0, 1).toUpperCase() }}</div>
            <span class="user-name">{{ currentUser?.name?.split(' ')[0] }}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <div v-if="userMenuOpen" class="user-dropdown">
            <div class="user-info-row">
              <div class="ud-avatar">{{ currentUser?.name?.slice(0, 1).toUpperCase() }}</div>
              <div>
                <p class="ud-name">{{ currentUser?.name }}</p>
                <p class="ud-phone">{{ currentUser?.phone }}</p>
              </div>
            </div>
            <div class="ud-divider" />
            <button class="ud-item" @click="openSubscriptionModal(); userMenuOpen = false">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#fbb827" stroke-width="1.5"/>
              </svg>
              {{ isSubActive ? 'Manage Subscription' : 'Get Premium' }}
            </button>
            <RouterLink v-if="isAdmin" to="/admin" class="ud-item" @click="userMenuOpen = false">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1z" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              Admin Dashboard
            </RouterLink>
            <button class="ud-item logout" @click="logout(); userMenuOpen = false">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        <!-- Not logged in -->
        <div v-else class="auth-btns">
          <button class="login-btn" @click="openLogin">Sign In</button>
          <button class="register-btn" @click="openRegister">Register</button>
        </div>
      </div>
    </div>

    <div class="mobile-search-row">
      <div class="search-wrap">
        <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input type="search" v-model="searchQuery" placeholder="Search movies, shows..." class="search-input" @keydown.enter="doSearch" />
      </div>
    </div>

    <div class="lang-tabs-row">
      <button v-for="lang in languages" :key="lang.code" class="lang-tab" :class="{ active: activeLang === lang.code }" @click="setLanguage(lang.code)">{{ lang.label }}</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useLanguageFilter } from "../composables/useLanguageFilter";
import { useAuth } from "../stores/useAuth";
import { useSubscription } from "../stores/useSubscription";

defineEmits<{ "toggle-sidebar": [] }>();

const { activeLang, setLanguage } = useLanguageFilter();
const { currentUser, isLoggedIn, isAdmin, openLogin, openRegister, logout } = useAuth();
const { isActive: isSubActive, openSubscriptionModal } = useSubscription();

const searchQuery = ref("");
const userMenuOpen = ref(false);

const languages = [
  { code: "lg", label: "LUGANDA" },
  { code: "ach", label: "LUO" },
  { code: "teo", label: "TESO" },
  { code: "en", label: "ENG" },
  { code: "sw", label: "KISWAHILI" },
  { code: "others", label: "OTHERS" },
];

function doSearch() {
  if (searchQuery.value.trim()) {
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.value)}`;
  }
}
</script>

<style scoped>
.site-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: #101114;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.header-top {
  display: flex; align-items: center; height: 52px; padding: 0 16px; gap: 12px;
}
.header-left { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.hamburger span { display: block; width: 22px; height: 2px; background: white; border-radius: 2px; }
.logo-link { display: flex; align-items: center; gap: 4px; text-decoration: none; }
.logo-img { height: 24px; width: auto; }
.logo-ug { font-size: 13px; font-weight: 800; background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: 0.5px; }
.header-tagline { font-size: 11px; color: rgba(255,255,255,0.4); white-space: nowrap; border-left: 1px solid rgba(255,255,255,0.12); padding-left: 10px; }
.header-search { flex: 1; max-width: 440px; margin: 0 auto; }
.search-wrap { position: relative; display: flex; align-items: center; }
.search-icon { position: absolute; left: 11px; pointer-events: none; }
.search-input { width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.09); border-radius: 24px; padding: 7px 14px 7px 34px; color: white; font-size: 13px; outline: none; transition: border-color 0.2s; }
.search-input::placeholder { color: rgba(255,255,255,0.35); }
.search-input:focus { border-color: rgba(44,215,255,0.4); }
.header-right { display: flex; align-items: center; flex-shrink: 0; margin-left: auto; gap: 8px; }

/* Auth buttons */
.auth-btns { display: flex; gap: 6px; }
.login-btn { padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; font-size: 12px; font-weight: 600; cursor: pointer; transition: border-color 0.2s; }
.login-btn:hover { border-color: rgba(255,255,255,0.4); }
.register-btn { padding: 6px 14px; border-radius: 20px; border: none; background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%); color: #101114; font-size: 12px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
.register-btn:hover { opacity: 0.9; }

/* User menu */
.user-menu { position: relative; }
.user-btn { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 5px 10px; cursor: pointer; color: white; transition: background 0.2s; }
.user-btn:hover { background: rgba(255,255,255,0.11); }
.user-avatar { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #1cb7ff, #2ff58b); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #101114; }
.user-name { font-size: 12px; font-weight: 600; }
.user-dropdown {
  position: absolute; top: calc(100% + 8px); right: 0;
  background: #1e2029; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; min-width: 200px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5); z-index: 200; overflow: hidden;
}
.user-info-row { display: flex; align-items: center; gap: 10px; padding: 12px 14px; }
.ud-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #1cb7ff, #2ff58b); display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 800; color: #101114; flex-shrink: 0; }
.ud-name { font-size: 13px; font-weight: 600; color: white; margin: 0; }
.ud-phone { font-size: 11px; color: rgba(255,255,255,0.4); margin: 2px 0 0; }
.ud-divider { height: 1px; background: rgba(255,255,255,0.07); }
.ud-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 14px; background: none; border: none; color: rgba(255,255,255,0.75); font-size: 13px; cursor: pointer; transition: background 0.15s; text-decoration: none; }
.ud-item:hover { background: rgba(255,255,255,0.06); color: white; }
.ud-item.logout { color: rgba(255,100,100,0.8); }
.ud-item.logout:hover { color: #ff6b6b; }

/* Mobile search */
.mobile-search-row { display: none; padding: 0 12px 7px; }
/* Lang tabs */
.lang-tabs-row { display: flex; align-items: center; height: 36px; padding: 0 16px; overflow-x: auto; scrollbar-width: none; border-top: 1px solid rgba(255,255,255,0.05); background: #16181d; }
.lang-tabs-row::-webkit-scrollbar { display: none; }
.lang-tab { display: inline-flex; align-items: center; height: 100%; padding: 0 14px; background: none; border: none; color: rgba(255,255,255,0.45); font-size: 11px; font-weight: 700; letter-spacing: 0.7px; cursor: pointer; position: relative; white-space: nowrap; transition: color 0.15s; flex-shrink: 0; }
.lang-tab:hover { color: rgba(255,255,255,0.8); }
.lang-tab.active { color: white; }
.lang-tab.active::after { content: ""; position: absolute; bottom: 0; left: 10px; right: 10px; height: 2px; background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%); border-radius: 2px 2px 0 0; }

@media (max-width: 768px) {
  .header-top { height: 46px; padding: 0 12px; }
  .hamburger { display: flex; }
  .header-tagline { display: none; }
  .header-search { display: none; }
  .mobile-search-row { display: block; }
  .lang-tabs-row { padding: 0 10px; height: 34px; }
  .lang-tab { font-size: 10px; padding: 0 10px; }
  .lang-tab.active::after { left: 6px; right: 6px; }
  .user-name { display: none; }
  .register-btn span { display: none; }
}
</style>
