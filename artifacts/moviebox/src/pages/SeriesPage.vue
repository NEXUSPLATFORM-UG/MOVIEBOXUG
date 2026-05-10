<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="14" rx="2" stroke="url(#tv-grad)" stroke-width="1.5"/>
          <path d="M8 7L12 3l4 4" stroke="url(#tv-grad2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="tv-grad" x1="2" y1="14" x2="22" y2="14" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
            </linearGradient>
            <linearGradient id="tv-grad2" x1="8" y1="5" x2="16" y2="5" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
            </linearGradient>
          </defs>
        </svg>
        TV Series
      </h1>
      <span class="page-subtitle">Watch in Luganda, Luo, Teso & More</span>
    </div>

    <FilterBar @filter="onFilter" />

    <div v-if="filteredSeries.length" class="results-info">
      {{ filteredSeries.length }} series found
    </div>

    <MovieGrid :movies="filteredSeries" />

    <div v-if="!filteredSeries.length" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.3">
        <circle cx="11" cy="11" r="8" stroke="white" stroke-width="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <p>No series found for this filter</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FilterBar from "../components/FilterBar.vue";
import MovieGrid from "../components/MovieGrid.vue";
import { popularSeries, blackShows } from "../data/movies";

const allSeries = [...popularSeries, ...blackShows];

const activeFilter = ref({ genre: "All", year: "All", sort: "latest" });

function onFilter(f: { genre: string; year: string; sort: string }) {
  activeFilter.value = f;
}

const filteredSeries = computed(() => {
  let list = [...allSeries];
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
