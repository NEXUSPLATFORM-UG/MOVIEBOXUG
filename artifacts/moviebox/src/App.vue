<template>
  <div class="app-wrapper" :class="{ 'sidebar-open': sidebarOpen }">
    <TheHeader @toggle-sidebar="toggleSidebar" @toggle-search="toggleSearch" />
    <div class="main-layout">
      <TheSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="main-content">
        <SearchOverlay v-if="searchOpen" @close="searchOpen = false" />
        <template v-else>
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
        </template>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";
import HeroBanner from "./components/HeroBanner.vue";
import MovieSection from "./components/MovieSection.vue";
import SearchOverlay from "./components/SearchOverlay.vue";
import { bannerSlides, popularSeries, popularMovies, animeList, blackShows, trendingShows } from "./data/movies";

const sidebarOpen = ref(false);
const searchOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value;
}

const movieSections = [
  { id: "popular-series", title: "Popular Series", moreHref: "/web/tv-series", movies: popularSeries },
  { id: "popular-movies", title: "Popular Movies", moreHref: "/web/movie", movies: popularMovies },
  { id: "anime", title: "Anime", moreHref: "/web/animated-series", movies: animeList },
  { id: "must-watch-black", title: "Must-watch Black Shows", moreHref: "/ranking-list", movies: blackShows },
  { id: "trending-now", title: "Trending Now", moreHref: "/ranking-list", movies: trendingShows },
];
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: #101114;
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

.main-content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding-left: 240px;
}

.sections-container {
  padding: 16px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 768px) {
  .main-content {
    padding-left: 0;
  }
  .sections-container {
    padding: 12px 12px 40px;
    gap: 20px;
  }
}
</style>
