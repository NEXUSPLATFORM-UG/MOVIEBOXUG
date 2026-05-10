<template>
  <div class="page-root">
    <div class="page-hero">
      <h1 class="page-title">Short Series</h1>
      <p class="page-sub">Quick binge-worthy series — 10 minutes or less per episode</p>
    </div>
    <div class="page-content">
      <div class="movie-grid">
        <MovieCard v-for="movie in shorts" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "../components/MovieCard.vue";
import { shortSeries } from "../data/movies";

const shorts = shortSeries;
</script>

<style scoped>
.page-root { min-height: 100vh; background: #101114; color: white; }
.page-hero {
  padding: 32px 20px 20px;
  background: linear-gradient(180deg, #16181d 0%, #101114 100%);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.page-title { font-size: 26px; font-weight: 800; margin: 0 0 4px; }
.page-sub { font-size: 13px; color: rgba(255,255,255,0.5); margin: 0; }
.page-content { padding: 16px; }
.movie-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
@media (min-width: 480px) { .movie-grid { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 768px) { .movie-grid { grid-template-columns: repeat(5, 1fr); gap: 10px; } }
@media (min-width: 1024px) { .movie-grid { grid-template-columns: repeat(6, 1fr); } }
@media (min-width: 1400px) { .movie-grid { grid-template-columns: repeat(7, 1fr); } }
</style>
