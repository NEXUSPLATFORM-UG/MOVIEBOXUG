<template>
  <div class="lang-tabs-bar">
    <div class="lang-tabs-inner">
      <button
        v-for="lang in languages"
        :key="lang.code"
        class="lang-tab"
        :class="{ active: activeLang === lang.code }"
        @click="activeLang = lang.code"
      >
        {{ lang.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const languages = [
  { code: "lg", label: "LUGANDA" },
  { code: "ach", label: "LUO" },
  { code: "teo", label: "TESO" },
  { code: "en", label: "ENG" },
  { code: "sw", label: "KISWAHILI" },
  { code: "others", label: "OTHERS" },
];

const activeLang = ref("en");
</script>

<style scoped>
.lang-tabs-bar {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 99;
  background: #16181d;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  overflow-x: auto;
  scrollbar-width: none;
}

.lang-tabs-bar::-webkit-scrollbar {
  display: none;
}

.lang-tabs-inner {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  gap: 4px;
  min-width: max-content;
}

.lang-tab {
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 14px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.6px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
  white-space: nowrap;
}

.lang-tab:hover {
  color: rgba(255, 255, 255, 0.8);
}

.lang-tab.active {
  color: white;
}

.lang-tab.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 14px;
  right: 14px;
  height: 2px;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-radius: 2px 2px 0 0;
}

@media (max-width: 768px) {
  .lang-tabs-bar {
    top: 88px;
  }

  .lang-tabs-inner {
    height: 36px;
    padding: 0 12px;
  }

  .lang-tab {
    font-size: 11px;
    padding: 0 10px;
  }

  .lang-tab.active::after {
    left: 10px;
    right: 10px;
  }
}
</style>
