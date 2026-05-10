<template>
  <div class="watch-root">
    <!-- Minimal watch header -->
    <header class="watch-header">
      <div class="wh-left">
        <button class="back-btn" @click="goBack">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <RouterLink to="/" class="wh-logo">
          <img
            src="https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg"
            alt="MovieBox UG"
            class="wh-logo-img"
          />
          <span class="wh-ug">UG</span>
        </RouterLink>
      </div>
      <div class="wh-title">{{ movie?.title ?? "Loading…" }}</div>
      <div class="wh-right">
        <button class="wh-icon-btn" title="Share">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Not found -->
    <div v-if="!movie" class="not-found">
      <p>Content not found.</p>
      <RouterLink to="/" class="go-home">← Back to Home</RouterLink>
    </div>

    <div v-else class="watch-body">
      <!-- ── MAIN area (player + sidebar) ── -->
      <div class="watch-main">
        <!-- Video Player -->
        <div class="player-section">
          <div class="player-wrap">
            <div v-if="!playing" class="player-poster" :style="posterBg">
              <div class="player-overlay">
                <button class="big-play-btn" @click="playing = true">
                  <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
                    <path d="M10 6l20 12-20 12V6z" fill="white"/>
                  </svg>
                </button>
                <div class="player-title-bar">
                  <h2>{{ movie.title }}</h2>
                  <div class="player-meta">
                    <span class="meta-pill">{{ movie.year }}</span>
                    <span class="meta-pill">{{ movie.genre.join(" · ") }}</span>
                    <span class="meta-pill star">⭐ {{ movie.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="player-iframe-wrap">
              <iframe
                :src="trailerUrl"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="player-iframe"
              ></iframe>
            </div>
          </div>

          <!-- Server + Language tabs below player -->
          <div class="tabs-section">
            <div class="tabs-row">
              <span class="tabs-label">Server:</span>
              <button
                v-for="srv in servers"
                :key="srv"
                class="tab-btn"
                :class="{ active: activeServer === srv }"
                @click="activeServer = srv; playing = true"
              >{{ srv }}</button>
            </div>
            <div class="tabs-row">
              <span class="tabs-label">Language:</span>
              <button
                v-for="lang in availableLangs"
                :key="lang.code"
                class="tab-btn"
                :class="{ active: activeDub === lang.code }"
                @click="activeDub = lang.code"
              >{{ lang.label }}</button>
            </div>
          </div>
        </div>

        <!-- Desktop: episodes sidebar -->
        <div v-if="isSeries && episodes.length" class="episodes-sidebar">
          <div class="sidebar-header">
            <span class="sidebar-heading">Episodes</span>
            <div class="season-tabs">
              <button
                v-for="s in seasonCount"
                :key="s"
                class="season-tab"
                :class="{ active: activeSeason === s }"
                @click="activeSeason = s"
              >S{{ s }}</button>
            </div>
          </div>
          <div class="episode-list">
            <button
              v-for="ep in currentEpisodes"
              :key="ep.num"
              class="episode-item"
              :class="{ active: activeEp === ep.num }"
              @click="activeEp = ep.num; playing = true"
            >
              <div class="ep-thumb">
                <span class="ep-num">{{ ep.num }}</span>
                <div class="ep-play-icon">▶</div>
              </div>
              <div class="ep-info">
                <div class="ep-title">Episode {{ ep.num }}</div>
                <div class="ep-dur">{{ ep.duration }}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- ── INFO section ── -->
      <div class="info-section">
        <div class="info-main">
          <h1 class="info-title">{{ movie.title }}</h1>
          <div class="info-badges">
            <span class="badge-pill">{{ movie.year }}</span>
            <span class="badge-pill">{{ movie.type === "series" ? `${movie.seasons} Seasons` : "Movie" }}</span>
            <span class="badge-pill star">⭐ {{ movie.rating }}</span>
            <span v-for="g in movie.genre" :key="g" class="badge-pill genre">{{ g }}</span>
          </div>
          <p class="info-desc">{{ movie.description }}</p>
          <div class="info-langs">
            <span class="info-langs-label">Available in:</span>
            <span v-for="lc in movie.languages" :key="lc" class="lang-chip">{{ langName(lc) }}</span>
          </div>
        </div>

        <!-- Mobile episode list -->
        <div v-if="isSeries && episodes.length" class="episodes-mobile">
          <div class="sidebar-header">
            <span class="sidebar-heading">Episodes</span>
            <div class="season-tabs">
              <button
                v-for="s in seasonCount"
                :key="s"
                class="season-tab"
                :class="{ active: activeSeason === s }"
                @click="activeSeason = s"
              >S{{ s }}</button>
            </div>
          </div>
          <div class="episode-grid">
            <button
              v-for="ep in currentEpisodes"
              :key="ep.num"
              class="ep-grid-item"
              :class="{ active: activeEp === ep.num }"
              @click="activeEp = ep.num; playing = true"
            >
              <span class="ep-grid-num">{{ ep.num }}</span>
              <div class="ep-grid-play" v-if="activeEp === ep.num">▶</div>
            </button>
          </div>
        </div>
      </div>

      <!-- ── RELATED section ── -->
      <div class="related-section">
        <h2 class="related-heading">More Like This</h2>
        <div class="related-grid">
          <RouterLink
            v-for="rel in related"
            :key="rel.id"
            :to="rel.href"
            class="rel-card"
          >
            <div class="rel-poster">
              <img :src="rel.poster" :alt="rel.title" loading="lazy" @error="onImgErr" />
              <div class="rel-overlay">▶</div>
            </div>
            <p class="rel-title">{{ rel.title }}</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { getMovieById, getAllMovies, type Movie } from "../data/movies";

const route  = useRoute();
const router = useRouter();

const movie  = computed<Movie | undefined>(() => getMovieById(route.params.id as string));
const isSeries = computed(() => movie.value?.type === "series" || movie.value?.type === "animation");

const playing      = ref(false);
const activeServer = ref("SERVER 1");
const activeDub    = ref("en");
const activeSeason = ref(1);
const activeEp     = ref(1);

const servers = ["SERVER 1", "SERVER 2", "SERVER 3"];

const langMap: Record<string, string> = {
  en:     "English",
  lg:     "Luganda",
  ach:    "Luo",
  teo:    "Teso",
  sw:     "Kiswahili",
  others: "Others",
};

const availableLangs = computed(() =>
  (movie.value?.languages ?? ["en"]).map((code) => ({ code, label: langMap[code] ?? code }))
);

function langName(code: string) { return langMap[code] ?? code; }

const posterBg = computed(() => {
  if (!movie.value) return {};
  const url = movie.value.poster.replace("/w300", "/w780");
  return { backgroundImage: `url('${url}')` };
});

const trailerUrl = computed(() => {
  const id = route.params.id as string;
  const map: Record<string, string> = {
    "the-last-of-us-s2":        "https://www.youtube.com/embed/u1KHuVKW3V4?autoplay=1",
    "the-boys-s5":              "https://www.youtube.com/embed/M7XM597XO94?autoplay=1",
    "squid-game-s3":            "https://www.youtube.com/embed/zGPk0D_MBV8?autoplay=1",
    "mission-impossible-final": "https://www.youtube.com/embed/jMzGKEiULuE?autoplay=1",
    "final-destination-bloodlines": "https://www.youtube.com/embed/n5zFhKHiHQA?autoplay=1",
    "a-minecraft-movie":        "https://www.youtube.com/embed/H3KM-i5ZKmI?autoplay=1",
    "daredevil-born-again":     "https://www.youtube.com/embed/DYDW5jKMsFE?autoplay=1",
    "one-piece":                "https://www.youtube.com/embed/MCO4j0thJkE?autoplay=1",
    "my-hero-academia":         "https://www.youtube.com/embed/Sd3F6Sm4LVE?autoplay=1",
    "bleach-tybw":              "https://www.youtube.com/embed/8AV_O5X0rHM?autoplay=1",
    "jujutsu-kaisen-s3":        "https://www.youtube.com/embed/PtYMsNSXO5c?autoplay=1",
  };
  return map[id] ?? `https://www.youtube.com/embed/videoseries?autoplay=1&list=PLNx5FCz3VbzFxkf9PEi-WrDuCE7lfUlRB`;
});

const seasonCount = computed(() => movie.value?.seasons ?? 1);

interface Episode { num: number; duration: string; }

const episodes = computed<Episode[][]>(() => {
  if (!isSeries.value) return [];
  const counts = [12, 10, 12, 8, 10, 13, 8, 10, 12, 10, 13, 8, 10, 12, 13, 10, 12, 8, 10, 12];
  const total = seasonCount.value;
  return Array.from({ length: total }, (_, si) => {
    const epCount = counts[si] ?? 10;
    return Array.from({ length: epCount }, (__, ei) => ({
      num: ei + 1,
      duration: `${20 + Math.floor(Math.random() * 25)}m`,
    }));
  });
});

const currentEpisodes = computed(() => episodes.value[activeSeason.value - 1] ?? []);

const related = computed(() => {
  if (!movie.value) return [];
  return getAllMovies()
    .filter(
      (m) =>
        m.id !== movie.value!.id &&
        (m.genre.some((g) => movie.value!.genre.includes(g)) || m.type === movie.value!.type)
    )
    .slice(0, 12);
});

function goBack() { router.back(); }

function onImgErr(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = `https://placehold.co/200x300/2b2e39/555?text=${encodeURIComponent(img.alt?.slice(0, 2) ?? "?")}`;
}

watch(() => route.params.id, () => {
  playing.value = false;
  activeSeason.value = 1;
  activeEp.value = 1;
  activeDub.value = "en";
});
</script>

<style scoped>
/* ── Root ── */
.watch-root {
  min-height: 100vh;
  background: #0d0e11;
  color: white;
  font-family: inherit;
}

/* ── Header ── */
.watch-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 52px;
  background: rgba(13,14,17,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  gap: 12px;
}
.wh-left  { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.wh-right { display: flex; align-items: center; gap: 8px; margin-left: auto; flex-shrink: 0; }

.back-btn {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.back-btn:hover { background: rgba(255,255,255,0.16); }

.wh-logo  { display: flex; align-items: center; gap: 4px; text-decoration: none; }
.wh-logo-img { height: 22px; }
.wh-ug {
  font-size: 12px; font-weight: 800;
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.wh-title {
  flex: 1; min-width: 0;
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.wh-icon-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.06); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}

/* ── Not found ── */
.not-found {
  text-align: center; padding: 80px 20px;
  color: rgba(255,255,255,0.5);
}
.go-home { color: #1cb7ff; text-decoration: none; font-size: 14px; }

/* ── Watch body ── */
.watch-body { display: flex; flex-direction: column; }

/* ── Main (player + sidebar) ── */
.watch-main {
  display: flex;
  align-items: flex-start;
  background: #000;
}

.player-section { flex: 1; min-width: 0; }

/* ── Player wrap ── */
.player-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  position: relative;
}

.player-poster {
  width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
}
.player-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.big-play-btn {
  width: 72px; height: 72px; border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(6px);
  border: 2px solid rgba(255,255,255,0.3);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.2s;
}
.big-play-btn:hover { background: rgba(28,183,255,0.4); transform: scale(1.06); }

.player-title-bar {
  position: absolute; bottom: 20px; left: 20px; right: 20px;
}
.player-title-bar h2 { font-size: 20px; font-weight: 700; margin: 0 0 6px; text-shadow: 0 2px 8px rgba(0,0,0,0.8); }
.player-meta { display: flex; gap: 6px; flex-wrap: wrap; }
.meta-pill {
  padding: 2px 9px; border-radius: 12px;
  background: rgba(255,255,255,0.12);
  font-size: 11px; color: rgba(255,255,255,0.85);
}
.meta-pill.star { background: rgba(250,180,0,0.2); color: #fbb827; }

.player-iframe-wrap { width: 100%; height: 100%; }
.player-iframe { width: 100%; height: 100%; display: block; }

/* ── Server/lang tabs ── */
.tabs-section {
  background: #16181d;
  padding: 10px 14px;
  display: flex; flex-direction: column; gap: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.tabs-row {
  display: flex; align-items: center; gap: 6px;
  overflow-x: auto; scrollbar-width: none; flex-wrap: nowrap;
}
.tabs-row::-webkit-scrollbar { display: none; }
.tabs-label {
  font-size: 11px; color: rgba(255,255,255,0.4);
  white-space: nowrap; flex-shrink: 0; min-width: 60px;
}
.tab-btn {
  padding: 5px 14px; border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.65);
  font-size: 12px; font-weight: 500;
  cursor: pointer; white-space: nowrap; flex-shrink: 0;
  transition: all 0.15s;
}
.tab-btn:hover { border-color: rgba(255,255,255,0.2); color: white; }
.tab-btn.active {
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-color: transparent; color: #0d0e11; font-weight: 700;
}

/* ── Episodes sidebar (desktop) ── */
.episodes-sidebar {
  width: 260px;
  flex-shrink: 0;
  max-height: calc(9 / 16 * (100vw - 260px));
  overflow-y: auto;
  background: #16181d;
  border-left: 1px solid rgba(255,255,255,0.06);
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}

.sidebar-header {
  position: sticky; top: 0; z-index: 2;
  background: #16181d;
  padding: 10px 12px 8px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
}
.sidebar-heading { font-size: 13px; font-weight: 700; color: white; flex-shrink: 0; }
.season-tabs { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
.season-tabs::-webkit-scrollbar { display: none; }
.season-tab {
  padding: 2px 9px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: transparent; color: rgba(255,255,255,0.5);
  font-size: 11px; font-weight: 600; cursor: pointer;
  white-space: nowrap; flex-shrink: 0;
  transition: all 0.15s;
}
.season-tab.active {
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-color: transparent; color: #0d0e11;
}

.episode-list { padding: 4px 0; }
.episode-item {
  width: 100%; display: flex; align-items: center; gap: 8px;
  padding: 7px 12px; border: none; background: transparent;
  cursor: pointer; text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.15s;
}
.episode-item:hover { background: rgba(255,255,255,0.05); }
.episode-item.active { background: rgba(28,183,255,0.1); }

.ep-thumb {
  width: 36px; height: 36px; border-radius: 6px;
  background: rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; position: relative; overflow: hidden;
}
.ep-num { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.6); }
.ep-play-icon {
  position: absolute; inset: 0;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; opacity: 0; transition: opacity 0.15s;
}
.episode-item:hover .ep-play-icon,
.episode-item.active .ep-play-icon { opacity: 1; }

.ep-info { min-width: 0; }
.ep-title { font-size: 12px; font-weight: 500; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ep-dur  { font-size: 10px; color: rgba(255,255,255,0.35); }

/* ── Info section ── */
.info-section {
  padding: 18px 16px 10px;
  background: #101114;
}
.info-main { max-width: 800px; }
.info-title { font-size: 22px; font-weight: 800; margin: 0 0 10px; }
.info-badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.badge-pill {
  padding: 3px 10px; border-radius: 12px;
  background: rgba(255,255,255,0.08);
  font-size: 11px; color: rgba(255,255,255,0.75);
}
.badge-pill.star { background: rgba(250,180,0,0.15); color: #fbb827; }
.badge-pill.genre { background: rgba(28,183,255,0.12); color: #1cb7ff; }

.info-desc { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.65; margin: 0 0 14px; }

.info-langs { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.info-langs-label { font-size: 11px; color: rgba(255,255,255,0.4); }
.lang-chip {
  padding: 2px 9px; border-radius: 10px;
  background: rgba(47,245,139,0.1); border: 1px solid rgba(47,245,139,0.2);
  font-size: 11px; color: #2ff58b; font-weight: 600;
}

/* ── Mobile episodes ── */
.episodes-mobile { display: none; margin-top: 18px; }
.episode-grid {
  display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 0;
}
.ep-grid-item {
  width: 44px; height: 44px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  position: relative; transition: all 0.15s;
}
.ep-grid-item:hover { border-color: rgba(28,183,255,0.4); color: white; }
.ep-grid-item.active {
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  border-color: transparent; color: #0d0e11; font-weight: 700;
}
.ep-grid-num { pointer-events: none; }
.ep-grid-play {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: #0d0e11;
}

/* ── Related section ── */
.related-section {
  padding: 18px 16px 30px;
  background: #101114;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.related-heading { font-size: 16px; font-weight: 700; margin: 0 0 14px; }

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  align-items: start;
}

.rel-card { text-decoration: none; display: block; transition: transform 0.2s; }
.rel-card:hover { transform: translateY(-2px); }

.rel-poster {
  width: 100%; aspect-ratio: 2 / 3;
  background: #2b2e39; border-radius: 6px;
  overflow: hidden; position: relative;
}
.rel-poster img { width: 100%; height: 100%; object-fit: cover; display: block; }
.rel-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: white; opacity: 0;
  transition: all 0.2s;
}
.rel-card:hover .rel-overlay { background: rgba(0,0,0,0.4); opacity: 1; }

.rel-title {
  font-size: 11px; color: rgba(255,255,255,0.6);
  margin: 5px 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* ── Responsive ── */
@media (min-width: 600px) {
  .related-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (min-width: 1024px) {
  .episodes-sidebar { display: flex; flex-direction: column; }
  .related-grid { grid-template-columns: repeat(6, 1fr); }
  .player-title-bar h2 { font-size: 26px; }
}
@media (max-width: 1023px) {
  .episodes-sidebar { display: none; }
  .episodes-mobile { display: block; }
}
@media (min-width: 1400px) {
  .related-grid { grid-template-columns: repeat(7, 1fr); }
}
</style>
