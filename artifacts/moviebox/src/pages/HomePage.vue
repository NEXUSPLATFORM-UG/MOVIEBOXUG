<template>
  <div>
    <HeroBanner :slides="bannerSlides" />
    <div class="sections-container">
      <MovieSection
        title="Popular Series"
        :movies="filteredSeries"
        moreHref="/web/tv-series"
      />
      <MovieSection
        title="Popular Movies"
        :movies="filteredMovies"
        moreHref="/web/movie"
      />
      <MovieSection
        title="Trending Now"
        :movies="filteredTrending"
        moreHref="/web/movie"
      />
      <MovieSection
        title="Black Shows"
        :movies="filteredBlack"
        moreHref="/web/tv-series"
      />
      <MovieSection
        title="Anime &amp; Animation"
        :movies="filteredAnime"
        moreHref="/web/animated-series"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import HeroBanner from "../components/HeroBanner.vue";
import MovieSection from "../components/MovieSection.vue";
import {
  bannerSlides,
  popularSeries,
  popularMovies,
  animeList,
  blackShows,
  trendingShows,
} from "../data/movies";
import { useLanguageFilter } from "../composables/useLanguageFilter";

const { activeLang } = useLanguageFilter();

function filterByLang<T extends { languages: string[] }>(list: T[]) {
  if (activeLang.value === "en") return list;
  return list.filter((m) => m.languages.includes(activeLang.value));
}

const filteredSeries   = computed(() => filterByLang(popularSeries));
const filteredMovies   = computed(() => filterByLang(popularMovies));
const filteredTrending = computed(() => filterByLang(trendingShows));
const filteredBlack    = computed(() => filterByLang(blackShows));
const filteredAnime    = computed(() => filterByLang(animeList));
</script>

<style scoped>
.sections-container {
  padding: 6px 0 24px;
}
</style>
