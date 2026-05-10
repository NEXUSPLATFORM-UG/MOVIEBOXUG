<template>
  <div>
    <HeroBanner :slides="bannerSlides" />
    <div class="sections-container">
      <MovieSection
        v-for="section in movieSections"
        :key="section.id"
        :title="section.title"
        :more-href="section.moreHref"
        :movies="section.movies"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroBanner from "../components/HeroBanner.vue";
import MovieSection from "../components/MovieSection.vue";
import { bannerSlides, popularSeries, popularMovies, animeList, blackShows, trendingShows } from "../data/movies";

const movieSections = [
  { id: "popular-series",    title: "Popular Series",           moreHref: "/web/tv-series",       movies: popularSeries },
  { id: "popular-movies",    title: "Popular Movies",           moreHref: "/web/movie",           movies: popularMovies },
  { id: "anime",             title: "Anime",                    moreHref: "/web/animated-series", movies: animeList },
  { id: "must-watch-black",  title: "Must-watch Black Shows",   moreHref: "/ranking-list",        movies: blackShows },
  { id: "trending-now",      title: "Trending Now",             moreHref: "/ranking-list",        movies: trendingShows },
];
</script>

<style scoped>
.sections-container {
  padding: 16px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 768px) {
  .sections-container {
    padding: 12px 12px 24px;
    gap: 18px;
  }
}
</style>
