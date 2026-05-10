<template>
  <RouterLink :to="movie.href" class="movie-card" :title="`Watch ${movie.title}`">
    <div class="poster-wrap">
      <img
        :src="movie.poster"
        :alt="movie.title"
        class="poster-img"
        loading="lazy"
        @error="onImgError"
      />
      <div v-if="movie.badge" class="badge">{{ movie.badge }}</div>
      <div class="play-overlay">
        <div class="play-circle">
          <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
            <path d="M5.5 3.5l9 5-9 5V3.5z" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <p class="card-title">{{ movie.title }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Movie } from "../data/movies";

defineProps<{ movie: Movie }>();

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = `https://placehold.co/200x300/2b2e39/555?text=${encodeURIComponent(img.alt?.slice(0, 2) ?? "?")}`;
}
</script>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s;
  min-width: 0;
  width: 100%;
}
.movie-card:hover { transform: translateY(-2px); }

.poster-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  background: #2b2e39;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  flex-shrink: 0;
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}
.movie-card:hover .poster-img { transform: scale(1.04); }

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  color: #101114;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  z-index: 2;
}

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 3;
}
.movie-card:hover .play-overlay { background: rgba(0,0,0,0.32); }

.play-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.2s, transform 0.2s;
}
.movie-card:hover .play-circle { opacity: 1; transform: scale(1); }

.card-footer {
  background: rgba(255,255,255,0.05);
  padding: 4px 5px 5px;
  border-radius: 0 0 5px 5px;
  height: 26px;
  display: flex;
  align-items: center;
}

.card-title {
  color: rgba(255,255,255,0.75);
  font-size: 10px;
  font-weight: 400;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  width: 100%;
}

@media (min-width: 768px) {
  .card-title { font-size: 12px; }
  .card-footer { padding: 5px 6px 7px; height: 30px; }
}
</style>
