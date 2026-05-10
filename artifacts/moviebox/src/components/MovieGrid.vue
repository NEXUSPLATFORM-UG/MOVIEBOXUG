<template>
  <div class="movie-grid">
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import MovieCard from "./MovieCard.vue";
import type { Movie } from "../data/movies";
defineProps<{ movies: Movie[] }>();
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 7px;
  align-items: start;
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }
}

@media (min-width: 1400px) {
  .movie-grid {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}

@media (min-width: 1800px) {
  .movie-grid {
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 8px;
  }
}
</style>
