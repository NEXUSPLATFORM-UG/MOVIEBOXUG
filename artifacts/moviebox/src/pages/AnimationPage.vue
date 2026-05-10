<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="url(#anim-grad)" stroke-width="1.5"/>
          <path d="M8.5 9C8.5 7 10 5.5 12 5.5" stroke="url(#anim-grad2)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M15.5 9C15.5 7 14 5.5 12 5.5" stroke="url(#anim-grad3)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M9 13a3 3 0 006 0" stroke="url(#anim-grad4)" stroke-width="1.5"/>
          <defs>
            <linearGradient id="anim-grad" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
            </linearGradient>
            <linearGradient id="anim-grad2" x1="8" y1="7" x2="13" y2="7" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
            </linearGradient>
            <linearGradient id="anim-grad3" x1="11" y1="7" x2="16" y2="7" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
            </linearGradient>
            <linearGradient id="anim-grad4" x1="9" y1="13" x2="15" y2="13" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
            </linearGradient>
          </defs>
        </svg>
        Animation
      </h1>
      <span class="page-subtitle">Anime & Cartoons Dubbed in Ugandan Languages</span>
    </div>

    <FilterBar @filter="onFilter" />

    <div v-if="filteredAnime.length" class="results-info">
      {{ filteredAnime.length }} titles found
    </div>

    <MovieGrid :movies="filteredAnime" />

    <div v-if="!filteredAnime.length" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.3">
        <circle cx="11" cy="11" r="8" stroke="white" stroke-width="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <p>No animation found for this filter</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FilterBar from "../components/FilterBar.vue";
import MovieGrid from "../components/MovieGrid.vue";
import { animeList } from "../data/movies";

const activeFilter = ref({ genre: "All", year: "All", sort: "latest" });

function onFilter(f: { genre: string; year: string; sort: string }) {
  activeFilter.value = f;
}

const filteredAnime = computed(() => {
  let list = [...animeList];
  if (activeFilter.value.genre !== "All") {
    list = list.filter(m => m.title.length > 0);
  }
  return list;
});
</script>

<style scoped>
.page {
  padding: 20px 16px 40px;
}

.page-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 800;
  color: white;
}

.page-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 400;
}

.results-info {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 14px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 0;
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
}

@media (max-width: 768px) {
  .page {
    padding: 14px 12px 24px;
  }

  .page-title {
    font-size: 17px;
  }
}
</style>
