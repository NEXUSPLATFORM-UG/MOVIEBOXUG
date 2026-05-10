<template>
  <div class="page-wrap">
    <div class="page-header">
      <svg class="page-icon" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="white" stroke-width="1.5"/>
        <path d="M8 7L12 3l4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h1 class="page-title">TV Series</h1>
      <span class="page-sub">Watch in Luganda, Luo, Teso &amp; More</span>
    </div>

    <FilterBar @filter="onFilter" />

    <p class="result-count">{{ filtered.length }} series found</p>

    <MovieGrid v-if="filtered.length" :movies="filtered" />
    <div v-else class="empty-state">
      <p>No series found for this filter combination.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import FilterBar from "../components/FilterBar.vue";
import MovieGrid from "../components/MovieGrid.vue";
import { popularSeries, blackShows, ugandanMovies, type Movie } from "../data/movies";
import { useLanguageFilter } from "../composables/useLanguageFilter";

const { activeLang } = useLanguageFilter();

const allSeries = computed<Movie[]>(() => [
  ...popularSeries,
  ...blackShows,
  ...ugandanMovies.filter((m) => m.type === "series"),
]);

interface FilterState { region: string; genre: string; year: string; sort: string; }
const filterState = ref<FilterState>({ region: "All", genre: "All", year: "All", sort: "latest" });

function onFilter(f: FilterState) { filterState.value = f; }

const filtered = computed(() => {
  let list = allSeries.value;

  if (activeLang.value !== "en") {
    list = list.filter((m) => m.languages.includes(activeLang.value));
  }
  if (filterState.value.region !== "All") {
    list = list.filter((m) => m.region === filterState.value.region);
  }
  if (filterState.value.genre !== "All") {
    list = list.filter((m) => m.genre.includes(filterState.value.genre));
  }
  if (filterState.value.year !== "All") {
    list = list.filter((m) => m.year === filterState.value.year);
  }
  if (filterState.value.sort === "rating" || filterState.value.sort === "popular") {
    list = [...list].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  } else if (filterState.value.sort === "az") {
    list = [...list].sort((a, b) => a.title.localeCompare(b.title));
  }
  return list;
});
</script>

<style scoped>
.page-wrap { padding: 14px 10px 40px; }
.page-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
.page-icon { flex-shrink: 0; }
.page-title { font-size: 18px; font-weight: 700; color: white; margin: 0; }
.page-sub { font-size: 11px; color: rgba(255,255,255,0.4); }
.result-count { font-size: 11px; color: rgba(255,255,255,0.35); margin: 0 0 10px; }
.empty-state { text-align: center; color: rgba(255,255,255,0.4); padding: 60px 20px; font-size: 14px; }
@media (min-width: 768px) {
  .page-wrap { padding: 18px 14px 40px; }
  .page-title { font-size: 20px; }
}
</style>
