<template>
  <a :href="movie.href" class="movie-card" :title="`Watch ${movie.title}`">
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
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path d="M5.5 3.5l9 5-9 5V3.5z" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <p class="card-title">{{ movie.title }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
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
}

.movie-card:hover {
  transform: translateY(-2px);
}

.poster-wrap {
  position: relative;
  width: 100%;
  padding-bottom: 148%;
  background: #2b2e39;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
}

.poster-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.movie-card:hover .poster-img {
  transform: scale(1.04);
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  color: rgba(255, 255, 255, 0.85);
  font-size: 9px;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 3px;
  z-index: 2;
}

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 3;
}

.movie-card:hover .play-overlay {
  background: rgba(0, 0, 0, 0.3);
}

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

.movie-card:hover .play-circle {
  opacity: 1;
  transform: scale(1);
}

.card-footer {
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 4px 5px;
  border-radius: 0 0 4px 4px;
}

.card-title {
  color: rgba(255, 255, 255, 0.75);
  font-size: 11px;
  font-weight: 400;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

@media (min-width: 768px) {
  .poster-wrap {
    border-radius: 6px 6px 0 0;
  }

  .card-footer {
    padding: 5px 5px 7px;
    border-radius: 0 0 6px 6px;
  }

  .card-title {
    font-size: 12px;
  }

  .badge {
    font-size: 10px;
    padding: 2px 6px;
  }
}
</style>
