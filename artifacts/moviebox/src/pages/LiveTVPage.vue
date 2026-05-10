<template>
  <div class="page-root">
    <div class="page-hero">
      <h1 class="page-title">Live TV Channels</h1>
      <p class="page-sub">Watch live television from Uganda and around the world</p>
    </div>

    <div class="live-indicator">
      <span class="live-dot"></span>
      <span class="live-text">LIVE NOW</span>
    </div>

    <div class="channels-grid">
      <RouterLink
        v-for="ch in channels"
        :key="ch.id"
        :to="`/watch/${ch.id}`"
        class="channel-card"
      >
        <div class="channel-logo-wrap">
          <img :src="ch.poster" :alt="ch.title" class="channel-logo" @error="onImgErr" />
          <div class="live-badge">LIVE</div>
        </div>
        <div class="channel-info">
          <p class="channel-name">{{ ch.title }}</p>
          <p class="channel-cat">{{ ch.genre.join(" · ") }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { liveChannels } from "../data/movies";

const channels = liveChannels;

function onImgErr(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = `https://placehold.co/120x80/2b2e39/555?text=TV`;
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

.live-indicator {
  display: flex; align-items: center; gap: 8px;
  padding: 16px 20px 4px;
}
.live-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #ff3b30;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.live-text {
  font-size: 11px; font-weight: 800; color: #ff3b30; letter-spacing: 1px;
}

.channels-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px 16px 40px;
}
@media (min-width: 480px) { .channels-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 768px) { .channels-grid { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1024px) { .channels-grid { grid-template-columns: repeat(5, 1fr); } }

.channel-card {
  display: flex; flex-direction: column;
  background: #16181d; border-radius: 10px;
  overflow: hidden; text-decoration: none;
  border: 1px solid rgba(255,255,255,0.06);
  transition: transform 0.2s, border-color 0.2s;
}
.channel-card:hover { transform: translateY(-2px); border-color: rgba(28,183,255,0.3); }

.channel-logo-wrap {
  position: relative; aspect-ratio: 16/10;
  background: #1e2029; display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.channel-logo {
  width: 100%; height: 100%; object-fit: cover;
}
.live-badge {
  position: absolute; top: 6px; right: 6px;
  background: #ff3b30; color: white;
  font-size: 9px; font-weight: 800; padding: 2px 6px;
  border-radius: 3px; letter-spacing: 0.5px;
}
.channel-info { padding: 8px 10px 10px; }
.channel-name {
  font-size: 13px; font-weight: 600; color: white;
  margin: 0 0 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.channel-cat { font-size: 11px; color: rgba(255,255,255,0.4); margin: 0; }
</style>
