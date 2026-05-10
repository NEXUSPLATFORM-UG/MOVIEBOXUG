<template>
  <div class="app-wrapper">
    <template v-if="!isWatchPage && !isAdminPage">
      <TheHeader @toggle-sidebar="toggleSidebar" />
      <div class="main-layout">
        <TheSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
        <main class="main-content">
          <RouterView />
        </main>
      </div>
      <MobileBottomNav />
    </template>
    <template v-else>
      <RouterView />
    </template>

    <AuthModal />
    <SubscriptionModal />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";
import MobileBottomNav from "./components/MobileBottomNav.vue";
import AuthModal from "./components/AuthModal.vue";
import SubscriptionModal from "./components/SubscriptionModal.vue";

const route = useRoute();
const sidebarOpen = ref(false);

const isWatchPage = computed(() => route.name === "watch");
const isAdminPage = computed(() => route.name === "admin");

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
  margin-top: 88px;
}
.main-content {
  flex: 1;
  min-width: 0;
  padding-left: 240px;
}
@media (max-width: 768px) {
  .main-layout { margin-top: 162px; }
  .main-content { padding-left: 0; padding-bottom: 64px; }
}
</style>
