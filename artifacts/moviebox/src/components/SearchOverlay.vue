<template>
  <div class="search-overlay">
    <div class="search-box">
      <div class="search-field">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          ref="inputRef"
          type="search"
          v-model="query"
          placeholder="Search movies, TV shows, anime..."
          class="input"
          @keydown.escape="$emit('close')"
        />
        <button @click="$emit('close')" class="close-btn" aria-label="Close search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="search-hint">
        <p>Popular Searches</p>
        <div class="chips">
          <a v-for="term in popularTerms" :key="term" :href="`/search?q=${encodeURIComponent(term)}`" class="chip">
            {{ term }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

defineEmits<{ close: [] }>();

const query = ref("");
const inputRef = ref<HTMLInputElement>();

onMounted(() => {
  inputRef.value?.focus();
});

const popularTerms = [
  "Euphoria", "The Boys", "Squid Game", "One Piece",
  "Minecraft Movie", "Sinners", "Final Destination", "Citadel",
];
</script>

<style scoped>
.search-overlay {
  padding: 24px 16px;
}

.search-box {
  max-width: 600px;
  margin: 0 auto;
}

.search-field {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 12px 16px;
}

.input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 16px;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: flex;
}

.search-hint {
  margin-top: 20px;
}

.search-hint p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin-bottom: 10px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  text-decoration: none;
  transition: background 0.15s;
}

.chip:hover {
  background: rgba(255, 255, 255, 0.14);
  color: white;
}
</style>
