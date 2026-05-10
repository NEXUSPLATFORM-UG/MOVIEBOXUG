<template>
  <div class="page-wrap">
    <div class="page-header">
      <span class="page-icon">🎌</span>
      <h1 class="page-title">Animation</h1>
      <span class="page-sub">Anime &amp; Cartoons Dubbed in Ugandan Languages</span>
    </div>

    <FilterBar @filter="onFilter" />

    <p class="result-count">{{ filtered.length }} titles found</p>

    <MovieGrid v-if="filtered.length" :movies="filtered" />
    <div v-else class="empty-state">
      <p>No animation found for this filter combination.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import FilterBar from "../components/FilterBar.vue";
import MovieGrid from "../components/MovieGrid.vue";
import { animeList, type Movie } from "../data/movies";
import { useLanguageFilter } from "../composables/useLanguageFilter";

const { activeLang } = useLanguageFilter();

interface FilterState { region: string; genre: string; year: string; sort: string; }
const filterState = ref<FilterState>({ region: "All", genre: "All", year: "All", sort: "latest" });

function onFilter(f: FilterState) { filterState.value = f; }

const filtered = computed(() => {
  let list: Movie[] = animeList;

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
.page-wrap { padding: 18px 14px 40px; }
.page-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
.page-icon { font-size: 22px; }
.page-title { font-size: 20px; font-weight: 700; color: white; margin: 0; }
.page-sub { font-size: 12px; color: rgba(255,255,255,0.4); }
.result-count { font-size: 12px; color: rgba(255,255,255,0.35); margin: 0 0 12px; }
.empty-state { text-align: center; color: rgba(255,255,255,0.4); padding: 60px 20px; font-size: 14px; }
</style>
