<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="url(#mov-grad)" stroke-width="1.5"/>
          <path d="M8 4v16M16 4v16M2 12h20M2 8h6M16 8h6M2 16h6M16 16h6" stroke="url(#mov-grad2)" stroke-width="1.5" stroke-linecap="round"/>
          <defs>
            <linearGradient id="mov-grad" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
            </linearGradient>
            <linearGradient id="mov-grad2" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1CB7FF"/><stop offset="1" stop-color="#2FF58B"/>
            </linearGradient>
          </defs>
        </svg>
        Movies
      </h1>
      <span class="page-subtitle">All Ugandan Language Translated Movies</span>
    </div>

    <FilterBar @filter="onFilter" />

    <div v-if="filteredMovies.length" class="results-info">
      {{ filteredMovies.length }} movies found
    </div>

    <MovieGrid :movies="filteredMovies" />

    <div v-if="!filteredMovies.length" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.3">
        <circle cx="11" cy="11" r="8" stroke="white" stroke-width="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <p>No movies found for this filter</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FilterBar from "../components/FilterBar.vue";
import MovieGrid from "../components/MovieGrid.vue";
import { popularMovies, trendingShows } from "../data/movies";

const allMovies = [...popularMovies, ...trendingShows];

const activeFilter = ref({ genre: "All", year: "All", sort: "latest" });

function onFilter(f: { genre: string; year: string; sort: string }) {
  activeFilter.value = f;
}

const filteredMovies = computed(() => {
  let list = [...allMovies];
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
