<template>
  <div class="watch-root">
    <!-- Header -->
    <header class="watch-header">
      <div class="wh-left">
        <button class="back-btn" @click="goBack" title="Go back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <RouterLink to="/" class="wh-logo">
          <img src="https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg" alt="MovieBox UG" class="wh-logo-img" />
          <span class="wh-ug">UG</span>
        </RouterLink>
      </div>
      <div class="wh-title">{{ movie?.title ?? "Loading..." }}</div>
      <div class="wh-right">
        <button v-if="canAccess" class="dl-btn" @click="handleDownload" title="Download">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="dl-label">Download</span>
        </button>
        <button v-else class="dl-btn locked" @click="handleLockedDownload" title="Subscribe to download">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="dl-label">Download</span>
        </button>
        <button class="wh-icon-btn" title="Share">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </header>

    <div v-if="!movie" class="not-found">
      <p>Content not found.</p>
      <RouterLink to="/" class="go-home">Back to Home</RouterLink>
    </div>

    <div v-else class="watch-body">
      <div class="watch-main">
        <!-- Player -->
        <div class="player-section">
          <div class="player-wrap">
            <!-- Subscription Gate Overlay -->
            <div v-if="!canAccess" class="gate-overlay">
              <div class="gate-inner">
                <div class="gate-lock">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="#1cb7ff" stroke-width="1.5"/>
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="#1cb7ff" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3 class="gate-title">Premium Content</h3>
                <p class="gate-sub">Subscribe to watch this {{ movie.type === 'movie' ? 'movie' : 'series' }} and unlock thousands more.</p>
                <div class="gate-plans">
                  <div v-for="plan in subPlans" :key="plan.id" class="gate-plan" :class="{ popular: plan.popular }">
                    <div class="gate-plan-label">{{ plan.label }}</div>
                    <div class="gate-plan-price">UGX {{ plan.price.toLocaleString() }}</div>
                  </div>
                </div>
                <button class="gate-sub-btn" @click="handleSubscribeClick">Subscribe Now</button>
                <p v-if="!isLoggedIn" class="gate-login">
                  Already subscribed? <button @click="openLogin">Sign in</button>
                </p>
              </div>
            </div>

            <!-- Artplayer -->
            <div v-show="canAccess" ref="playerEl" class="artplayer-wrap"></div>
          </div>
        </div>

        <!-- Desktop episodes sidebar -->
        <div v-if="isSeries && episodes.length" class="episodes-sidebar">
          <div class="sidebar-header">
            <span class="sidebar-heading">Episodes</span>
            <div class="season-tabs">
              <button v-for="s in seasonCount" :key="s" class="season-tab" :class="{ active: activeSeason === s }" @click="activeSeason = s">S{{ s }}</button>
            </div>
          </div>
          <div class="episode-list">
            <button v-for="ep in currentEpisodes" :key="ep.num" class="episode-item" :class="{ active: activeEp === ep.num }" @click="activeEp = ep.num">
              <div class="ep-thumb">
                <span class="ep-num">{{ ep.num }}</span>
                <div class="ep-play-icon">
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="white"><path d="M3 2l8 5-8 5V2z"/></svg>
                </div>
              </div>
              <div class="ep-info">
                <div class="ep-title">Episode {{ ep.num }}</div>
                <div class="ep-dur">{{ ep.duration }}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="info-section">
        <div class="info-main">
          <div class="info-top-row">
            <div>
              <h1 class="info-title">{{ movie.title }}</h1>
              <div class="info-badges">
                <span class="badge-pill">{{ movie.year }}</span>
                <span class="badge-pill">{{ movie.type === "series" ? `${movie.seasons} Seasons` : movie.type === "short" ? "Short Series" : movie.type === "live-tv" ? "Live TV" : "Movie" }}</span>
                <span class="badge-pill star">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#fbb827"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {{ movie.rating }}
                </span>
                <span v-for="g in movie.genre" :key="g" class="badge-pill genre">{{ g }}</span>
                <span v-if="movie.isFree" class="badge-pill free">FREE</span>
              </div>
            </div>
            <div class="info-actions">
              <button v-if="canAccess" class="action-dl-btn" @click="handleDownload">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Download
              </button>
              <button v-else class="action-sub-btn" @click="handleSubscribeClick">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M2 19h20M3 8l4 5 5-8 5 8 4-5 1 11H2L3 8z" stroke="#fbb827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Get Premium
              </button>
            </div>
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
              <button v-for="s in seasonCount" :key="s" class="season-tab" :class="{ active: activeSeason === s }" @click="activeSeason = s">S{{ s }}</button>
            </div>
          </div>
          <div class="episode-grid">
            <button v-for="ep in currentEpisodes" :key="ep.num" class="ep-grid-item" :class="{ active: activeEp === ep.num }" @click="activeEp = ep.num">
              <span class="ep-grid-num">{{ ep.num }}</span>
              <div class="ep-grid-play" v-if="activeEp === ep.num">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="#0d0e11"><path d="M3 2l8 5-8 5V2z"/></svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- More like this -->
      <div class="related-section">
        <h2 class="related-heading">More Like This</h2>
        <div class="related-grid">
          <MovieCard v-for="rel in related" :key="rel.id" :movie="rel" />
        </div>
      </div>
    </div>

    <!-- Download Toast -->
    <Transition name="toast-fade">
      <div v-if="downloadToast" class="download-toast">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="#2ff58b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Download started!
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import Artplayer from "artplayer";
import { getMovieById, getAllMovies, type Movie } from "../data/movies";
import { useSubscription, subscriptionPlans } from "../stores/useSubscription";
import { useAuth } from "../stores/useAuth";
import MovieCard from "../components/MovieCard.vue";

const route = useRoute();
const router = useRouter();

const { isActive: isSubActive, openSubscriptionModal } = useSubscription();
const { isLoggedIn, openLogin } = useAuth();

const movie = computed<Movie | undefined>(() => getMovieById(route.params.id as string));
const isSeries = computed(() => movie.value?.type === "series" || movie.value?.type === "animation" || movie.value?.type === "short");
const canAccess = computed(() => movie.value?.isFree || isSubActive.value);

const subPlans = subscriptionPlans;
const activeSeason = ref(1);
const activeEp = ref(1);
const downloadToast = ref(false);
const playerEl = ref<HTMLElement | null>(null);
let artInstance: Artplayer | null = null;

const langMap: Record<string, string> = {
  en: "English", lg: "Luganda", ach: "Luo", teo: "Teso", sw: "Kiswahili", others: "Others",
};
function langName(code: string) { return langMap[code] ?? code; }

const seasonCount = computed(() => movie.value?.seasons ?? 1);

interface Episode { num: number; duration: string; }
const episodes = computed<Episode[][]>(() => {
  if (!isSeries.value) return [];
  const counts = [12, 10, 12, 8, 10, 13, 8, 10, 12, 10, 13, 8];
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
    .filter((m) => m.id !== movie.value!.id && (m.genre.some((g) => movie.value!.genre.includes(g)) || m.type === movie.value!.type))
    .slice(0, 14);
});

function buildArtplayer() {
  if (!playerEl.value || !canAccess.value) return;
  if (artInstance) { artInstance.destroy(); artInstance = null; }

  const posterUrl = movie.value?.poster?.replace("/w300", "/w780") ?? "";
  const demoUrl = "https://artplayer.org/assets/sample/video.mp4";

  artInstance = new Artplayer({
    container: playerEl.value,
    url: demoUrl,
    poster: posterUrl,
    volume: 0.7,
    isLive: movie.value?.type === "live-tv",
    muted: false,
    autoplay: false,
    pip: true,
    autoSize: true,
    autoMini: true,
    screenshot: true,
    setting: true,
    loop: false,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    fullscreen: true,
    fullscreenWeb: true,
    subtitleOffset: true,
    miniProgressBar: true,
    mutex: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    theme: "#1cb7ff",
    lang: navigator.language.toLowerCase(),
    quality: [
      { default: true, html: "HD 720P", url: demoUrl },
      { html: "SD 480P", url: demoUrl },
      { html: "FHD 1080P", url: demoUrl },
    ],
  });
}

onMounted(async () => {
  await nextTick();
  if (canAccess.value) buildArtplayer();
});

watch(canAccess, async (val) => {
  if (val) {
    await nextTick();
    buildArtplayer();
  } else {
    if (artInstance) { artInstance.destroy(); artInstance = null; }
  }
});

watch(() => route.params.id, async () => {
  activeSeason.value = 1;
  activeEp.value = 1;
  await nextTick();
  if (canAccess.value) buildArtplayer();
});

onBeforeUnmount(() => {
  if (artInstance) { artInstance.destroy(); artInstance = null; }
});

function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}

function handleSubscribeClick() {
  if (!isLoggedIn.value) {
    openLogin();
  } else {
    openSubscriptionModal();
  }
}

function handleLockedDownload() {
  if (!isLoggedIn.value) {
    openLogin();
  } else {
    openSubscriptionModal();
  }
}

async function handleDownload() {
  if (!canAccess.value) {
    handleSubscribeClick();
    return;
  }
  downloadToast.value = true;
  setTimeout(() => { downloadToast.value = false; }, 3000);

  const videoUrl = "https://artplayer.org/assets/sample/video.mp4";
  const filename = `${(movie.value?.title ?? "video").replace(/[^a-z0-9]/gi, "_")}.mp4`;

  try {
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
</script>

<style scoped>
.watch-root { min-height: 100vh; background: #0d0e11; color: white; font-family: inherit; }

.watch-header { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; padding: 0 12px; height: 48px; background: rgba(13,14,17,0.97); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.07); gap: 10px; }
.wh-left { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.wh-right { display: flex; align-items: center; gap: 6px; margin-left: auto; flex-shrink: 0; }
.back-btn { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.08); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
.back-btn:hover { background: rgba(255,255,255,0.16); }
.wh-logo { display: flex; align-items: center; gap: 4px; text-decoration: none; }
.wh-logo-img { height: 20px; }
.wh-ug { font-size: 11px; font-weight: 800; background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.wh-title { flex: 1; min-width: 0; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.dl-btn { display: flex; align-items: center; gap: 5px; padding: 6px 11px; border-radius: 18px; border: none; background: linear-gradient(91deg, #1cb7ff, #2ff58b); color: #0d0e11; font-size: 11px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
.dl-btn:hover { opacity: 0.9; }
.dl-btn.locked { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.4); }
.dl-btn.locked:hover { background: rgba(255,255,255,0.12); }
.wh-icon-btn { width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.06); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }

.not-found { text-align: center; padding: 80px 20px; color: rgba(255,255,255,0.5); }
.go-home { color: #1cb7ff; text-decoration: none; font-size: 14px; }

.watch-body { display: flex; flex-direction: column; }
.watch-main { display: flex; align-items: flex-start; background: #000; }
.player-section { flex: 1; min-width: 0; }

.player-wrap { width: 100%; aspect-ratio: 16 / 9; background: #000; position: relative; overflow: hidden; }
.artplayer-wrap { width: 100%; height: 100%; }

.gate-overlay { position: absolute; inset: 0; z-index: 10; background: rgba(10,10,15,0.92); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); overflow: hidden; }
.gate-inner { text-align: center; padding: 10px 12px; max-width: 340px; width: 100%; max-height: 100%; overflow-y: auto; scrollbar-width: none; }
.gate-inner::-webkit-scrollbar { display: none; }
.gate-lock { display: flex; justify-content: center; margin-bottom: 6px; }
.gate-title { font-size: 13px; font-weight: 800; margin: 0 0 4px; }
.gate-sub { font-size: 10px; color: rgba(255,255,255,0.6); margin: 0 0 8px; line-height: 1.4; }
.gate-plans { display: flex; gap: 4px; justify-content: center; margin-bottom: 8px; }
.gate-plan { padding: 5px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); text-align: center; }
.gate-plan.popular { border-color: #2ff58b; background: rgba(47,245,139,0.08); }
.gate-plan-label { font-size: 9px; color: rgba(255,255,255,0.6); margin-bottom: 2px; }
.gate-plan-price { font-size: 10px; font-weight: 700; color: white; }
.gate-sub-btn { padding: 7px 20px; border-radius: 8px; border: none; background: linear-gradient(91deg, #1cb7ff, #2ff58b); color: #0d0e11; font-size: 12px; font-weight: 800; cursor: pointer; transition: opacity 0.2s; margin-bottom: 6px; }
.gate-sub-btn:hover { opacity: 0.9; }
.gate-login { font-size: 10px; color: rgba(255,255,255,0.4); margin: 0; }
.gate-login button { background: none; border: none; color: #1cb7ff; cursor: pointer; font-size: 10px; font-weight: 600; text-decoration: underline; }

.episodes-sidebar { width: 240px; flex-shrink: 0; max-height: calc(9 / 16 * (100vw - 240px)); overflow-y: auto; background: #16181d; border-left: 1px solid rgba(255,255,255,0.06); scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
.sidebar-header { position: sticky; top: 0; z-index: 2; background: #16181d; padding: 8px 10px 7px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.sidebar-heading { font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }
.season-tabs { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
.season-tabs::-webkit-scrollbar { display: none; }
.season-tab { padding: 2px 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: rgba(255,255,255,0.5); font-size: 10px; font-weight: 600; cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all 0.15s; }
.season-tab.active { background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%); border-color: transparent; color: #0d0e11; }
.episode-list { padding: 4px 0; }
.episode-item { width: 100%; display: flex; align-items: center; gap: 8px; padding: 7px 10px; border: none; background: transparent; cursor: pointer; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
.episode-item:hover { background: rgba(255,255,255,0.05); }
.episode-item.active { background: rgba(28,183,255,0.1); }
.ep-thumb { width: 32px; height: 32px; border-radius: 5px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; overflow: hidden; }
.ep-num { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.6); }
.ep-play-icon { position: absolute; inset: 0; background: linear-gradient(91deg, #1cb7ff, #2ff58b); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.15s; }
.episode-item:hover .ep-play-icon, .episode-item.active .ep-play-icon { opacity: 1; }
.ep-info { min-width: 0; }
.ep-title { font-size: 11px; font-weight: 500; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ep-dur { font-size: 9px; color: rgba(255,255,255,0.35); }

.info-section { padding: 14px 12px 10px; background: #101114; }
.info-main { max-width: 860px; }
.info-top-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.info-title { font-size: 18px; font-weight: 800; margin: 0 0 7px; }
.info-badges { display: flex; gap: 5px; flex-wrap: wrap; }
.badge-pill { display: inline-flex; align-items: center; gap: 3px; padding: 2px 8px; border-radius: 10px; background: rgba(255,255,255,0.08); font-size: 10px; color: rgba(255,255,255,0.75); }
.badge-pill.star { background: rgba(250,180,0,0.15); color: #fbb827; }
.badge-pill.genre { background: rgba(28,183,255,0.12); color: #1cb7ff; }
.badge-pill.free { background: rgba(47,245,139,0.15); color: #2ff58b; font-weight: 700; }
.info-actions { display: flex; gap: 6px; flex-shrink: 0; }
.action-dl-btn { display: flex; align-items: center; gap: 5px; padding: 8px 13px; border-radius: 8px; border: none; background: linear-gradient(91deg, #1cb7ff, #2ff58b); color: #0d0e11; font-size: 12px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }
.action-dl-btn:hover { opacity: 0.9; }
.action-sub-btn { display: flex; align-items: center; gap: 5px; padding: 8px 13px; border-radius: 8px; border: 1px solid rgba(251,184,39,0.3); background: rgba(251,184,39,0.15); color: #fbb827; font-size: 12px; font-weight: 700; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
.action-sub-btn:hover { background: rgba(251,184,39,0.22); }
.info-desc { font-size: 12px; color: rgba(255,255,255,0.65); line-height: 1.65; margin: 0 0 12px; }
.info-langs { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.info-langs-label { font-size: 10px; color: rgba(255,255,255,0.4); }
.lang-chip { padding: 2px 8px; border-radius: 8px; background: rgba(47,245,139,0.1); border: 1px solid rgba(47,245,139,0.2); font-size: 10px; color: #2ff58b; font-weight: 600; }

.episodes-mobile { display: none; margin-top: 16px; }
.episode-grid { display: flex; flex-wrap: wrap; gap: 5px; padding: 8px 0; }
.ep-grid-item { width: 40px; height: 40px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; transition: all 0.15s; }
.ep-grid-item:hover { border-color: rgba(28,183,255,0.4); color: white; }
.ep-grid-item.active { background: linear-gradient(91deg, #1cb7ff, #2ff58b); border-color: transparent; color: #0d0e11; font-weight: 700; }
.ep-grid-num { pointer-events: none; }
.ep-grid-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }

.related-section { padding: 14px 12px 30px; background: #101114; border-top: 1px solid rgba(255,255,255,0.06); }
.related-heading { font-size: 14px; font-weight: 700; margin: 0 0 12px; }
.related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
@media (min-width: 480px) { .related-grid { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 768px) { .related-grid { grid-template-columns: repeat(5, 1fr); gap: 10px; } }
@media (min-width: 1024px) {
  .related-grid { grid-template-columns: repeat(6, 1fr); }
  .episodes-sidebar { display: flex; flex-direction: column; }
}
@media (min-width: 1400px) { .related-grid { grid-template-columns: repeat(7, 1fr); } }
@media (max-width: 1023px) { .episodes-sidebar { display: none; } .episodes-mobile { display: block; } }
@media (max-width: 480px) { .dl-label { display: none; } .info-top-row { flex-direction: column; } }

.download-toast {
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
  background: #1e2029; border: 1px solid rgba(47,245,139,0.3);
  border-radius: 22px; padding: 9px 18px;
  display: flex; align-items: center; gap: 8px;
  color: white; font-size: 12px; font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4); z-index: 300;
}
.toast-fade-enter-active, .toast-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(12px); }

@media (min-width: 768px) {
  .info-title { font-size: 22px; }
  .info-section { padding: 18px 16px 10px; }
  .related-section { padding: 18px 16px 30px; }
  .related-heading { font-size: 16px; }
}
</style>
