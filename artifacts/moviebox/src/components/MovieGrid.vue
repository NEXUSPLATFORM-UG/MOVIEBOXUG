<template>
  <div class="movie-grid">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    />
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
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

@media (min-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
}

@media (min-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 1400px) {
  .movie-grid {
    grid-template-columns: repeat(7, 1fr);
  }
}

@media (min-width: 1800px) {
  .movie-grid {
    grid-template-columns: repeat(8, 1fr);
    gap: 12px;
  }
}
</style>
