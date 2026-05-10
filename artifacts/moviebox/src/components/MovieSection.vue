<template>
  <section class="movie-section">
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <RouterLink :to="moreHref" class="more-link">
        <span>More</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M5.667 3.333L10.334 8l-4.667 4.667" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </RouterLink>
    </div>

    <div class="scroll-container">
      <div class="movies-row">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import MovieCard from "./MovieCard.vue";
import type { Movie } from "../data/movies";

defineProps<{
  title: string;
  moreHref: string;
  movies: Movie[];
}>();
</script>

<style scoped>
.movie-section {
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.more-link {
  display: flex;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 500;
  transition: color 0.15s;
}

.more-link:hover {
  color: white;
}

.scroll-container {
  width: 100%;
  overflow: hidden;
}

.movies-row {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - 6 * 7px) / 6.5);
  gap: 7px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  padding-bottom: 4px;
}

.movies-row::-webkit-scrollbar {
  display: none;
}

@media (min-width: 1400px) {
  .movies-row {
    grid-auto-columns: calc((100% - 7 * 7px) / 7.5);
  }
}

@media (min-width: 1800px) {
  .movies-row {
    grid-auto-columns: calc((100% - 8 * 8px) / 8.5);
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 13px;
  }

  .movies-row {
    grid-auto-columns: calc((100% - 3 * 6px) / 3.4);
    gap: 6px;
  }
}
</style>
