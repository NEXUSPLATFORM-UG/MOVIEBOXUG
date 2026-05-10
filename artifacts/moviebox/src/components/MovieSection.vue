<template>
  <section class="movie-section">
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <a :href="moreHref" class="more-link">
        <span>More</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5.667 3.333L10.334 8l-4.667 4.667" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

    <div class="scroll-container" ref="scrollRef">
      <div class="movies-grid">
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
  font-size: 16px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.more-link {
  display: flex;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 500;
  transition: color 0.15s;
}

.more-link:hover {
  color: white;
}

.more-link:hover svg path {
  stroke: white;
}

.scroll-container {
  width: 100%;
  overflow: hidden;
}

.movies-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - 5 * 8px) / 6);
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  padding-bottom: 4px;
}

.movies-grid::-webkit-scrollbar {
  display: none;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 14px;
  }

  .movies-grid {
    grid-auto-columns: calc((100% - 3 * 6px) / 3.3);
    gap: 6px;
  }
}
</style>
