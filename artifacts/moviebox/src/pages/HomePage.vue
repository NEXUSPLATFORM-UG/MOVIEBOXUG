<template>
  <div>
    <HeroBanner :slides="bannerSlides" />
    <div class="sections-container">
      <MovieSection title="Popular Series" :movies="filteredSeries" moreHref="/web/tv-series" />
      <MovieSection title="Popular Movies" :movies="filteredMovies" moreHref="/web/movie" />
      <MovieSection title="Trending Now" :movies="filteredTrending" moreHref="/web/movie" />
      <MovieSection title="Black Shows" :movies="filteredBlack" moreHref="/web/tv-series" />
      <MovieSection title="Anime &amp; Animation" :movies="filteredAnime" moreHref="/web/animated-series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import HeroBanner from "../components/HeroBanner.vue";
import MovieSection from "../components/MovieSection.vue";
import { useContent } from "../composables/useContent";
import { useLanguageFilter } from "../composables/useLanguageFilter";

const { content, bannerSlides, loadContent } = useContent();
const { activeLang } = useLanguageFilter();

onMounted(() => { loadContent(); });

function filterByLang<T extends { languages: string[] }>(list: T[]) {
  if (activeLang.value === "en") return list;
  return list.filter((m) => m.languages.includes(activeLang.value));
}

const allSeries    = computed(() => content.value.filter((m) => m.type === "series"));
const allMovies    = computed(() => content.value.filter((m) => m.type === "movie"));
const allAnime     = computed(() => content.value.filter((m) => m.type === "animation"));
const allShort     = computed(() => content.value.filter((m) => m.type === "short"));

const filteredSeries   = computed(() => filterByLang(allSeries.value));
const filteredMovies   = computed(() => filterByLang(allMovies.value));
const filteredTrending = computed(() => filterByLang([...content.value].slice(0, 20)));
const filteredBlack    = computed(() => filterByLang([...allSeries.value, ...allShort.value]));
const filteredAnime    = computed(() => filterByLang(allAnime.value));
</script>

<style scoped>
.sections-container { padding: 6px 0 24px; }
</style>
