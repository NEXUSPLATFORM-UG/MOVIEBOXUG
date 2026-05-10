<template>
  <div class="app-wrapper">
    <TheHeader @toggle-sidebar="toggleSidebar" />
    <LanguageTabs />
    <div class="main-layout">
      <TheSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
    <MobileBottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";
import LanguageTabs from "./components/LanguageTabs.vue";
import MobileBottomNav from "./components/MobileBottomNav.vue";

const sidebarOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: #101114;
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
  flex: 1;
  min-height: 0;
  margin-top: 96px;
}

.main-content {
  flex: 1;
  min-width: 0;
  padding-left: 240px;
}

@media (max-width: 768px) {
  .main-layout {
    margin-top: 88px;
  }

  .main-content {
    padding-left: 0;
    padding-bottom: 64px;
  }
}
</style>
