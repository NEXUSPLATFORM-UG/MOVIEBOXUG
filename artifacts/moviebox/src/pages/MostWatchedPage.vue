<template>
  <div class="page-root">
    <div class="page-hero">
      <h1 class="page-title">Most Watched</h1>
      <p class="page-sub">Top trending content right now</p>
    </div>
    <div class="page-content">
      <div v-for="(movie, idx) in topMovies" :key="movie.id" class="rank-row">
        <span class="rank-num" :class="{ top3: idx < 3 }">{{ idx + 1 }}</span>
        <RouterLink :to="movie.href" class="rank-card">
          <img :src="movie.poster" :alt="movie.title" class="rank-poster" @error="onImgErr" />
          <div class="rank-info">
            <p class="rank-title">{{ movie.title }}</p>
            <div class="rank-meta">
              <span class="rank-badge">{{ movie.type }}</span>
              <span class="rank-rating">⭐ {{ movie.rating }}</span>
              <span class="rank-year">{{ movie.year }}</span>
            </div>
            <p class="rank-desc">{{ movie.description }}</p>
          </div>
        </RouterLink>
        <div class="rank-trend" :class="{ up: idx < 5 }">
          <svg v-if="idx < 5" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 17L12 7l7 10" stroke="#2ff58b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 7l7 10 7-10" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { getAllMovies } from "../data/movies";

const topMovies = computed(() =>
  [...getAllMovies()]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 30)
);

function onImgErr(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = `https://placehold.co/80x120/2b2e39/555?text=?`;
}
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
.page-content { padding: 12px 16px 40px; max-width: 800px; }

.rank-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.rank-num {
  font-size: 22px; font-weight: 800; color: rgba(255,255,255,0.25);
  width: 36px; text-align: center; flex-shrink: 0;
}
.rank-num.top3 {
  background: linear-gradient(135deg, #1cb7ff, #2ff58b);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
}
.rank-card {
  display: flex; align-items: center; gap: 12px;
  flex: 1; text-decoration: none; min-width: 0;
}
.rank-poster {
  width: 56px; height: 80px; object-fit: cover;
  border-radius: 6px; flex-shrink: 0;
  background: #2b2e39;
}
.rank-info { min-width: 0; flex: 1; }
.rank-title {
  font-size: 14px; font-weight: 600; color: white;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0 0 4px;
}
.rank-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.rank-badge {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  padding: 1px 6px; border-radius: 4px;
  background: rgba(28,183,255,0.15); color: #1cb7ff;
}
.rank-rating { font-size: 11px; color: #fbb827; }
.rank-year { font-size: 11px; color: rgba(255,255,255,0.4); }
.rank-desc {
  font-size: 12px; color: rgba(255,255,255,0.45); margin: 0;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.rank-trend { flex-shrink: 0; display: flex; align-items: center; }
</style>
