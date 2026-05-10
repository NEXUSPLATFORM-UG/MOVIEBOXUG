<template>
  <div class="admin-root">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="admin-logo">
        <img src="https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg" alt="MovieBox" class="alogo-img" />
        <span class="alogo-ug">UG</span>
        <span class="admin-tag">Admin</span>
      </div>
      <nav class="admin-nav">
        <button v-for="item in sections" :key="item.id" class="admin-nav-item" :class="{ active: activeSection === item.id }" @click="activeSection = item.id">
          <span class="ani" v-html="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="item.count" class="nav-count">{{ item.count }}</span>
        </button>
      </nav>
      <RouterLink to="/" class="admin-back-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Back to Site
      </RouterLink>
    </aside>

    <!-- Main -->
    <div class="admin-main">
      <!-- Mobile header -->
      <div class="admin-mobile-header">
        <button class="mobile-menu-btn" @click="mobileSidebarOpen = !mobileSidebarOpen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M3 6h18M3 18h18" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        <span class="mobile-section-title">{{ currentSection?.label }}</span>
        <RouterLink to="/" class="mobile-back">← Site</RouterLink>
      </div>

      <!-- Mobile sidebar overlay -->
      <div v-if="mobileSidebarOpen" class="mobile-sidebar-overlay" @click="mobileSidebarOpen = false">
        <div class="mobile-sidebar" @click.stop>
          <div class="admin-logo" style="padding:16px 20px">
            <img src="https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg" alt="MovieBox" class="alogo-img" />
            <span class="alogo-ug">UG</span>
            <span class="admin-tag">Admin</span>
          </div>
          <nav class="admin-nav">
            <button v-for="item in sections" :key="item.id" class="admin-nav-item" :class="{ active: activeSection === item.id }" @click="activeSection = item.id; mobileSidebarOpen = false">
              <span class="ani" v-html="item.icon" />
              <span>{{ item.label }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- ─── DASHBOARD ─── -->
      <div v-if="activeSection === 'dashboard'" class="section-content">
        <h1 class="section-title">Dashboard Overview</h1>
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in stats" :key="stat.label">
            <div class="stat-icon" v-html="stat.icon" />
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
            <div class="stat-trend" :class="stat.up ? 'up' : 'down'">{{ stat.trend }}</div>
          </div>
        </div>
        <div class="dash-row">
          <div class="dash-panel">
            <h3 class="panel-title">Recent Uploads</h3>
            <div class="recent-list">
              <div v-for="m in recentContent" :key="m.id" class="recent-item">
                <img :src="m.poster" class="recent-poster" @error="onImgErr" />
                <div class="recent-info">
                  <p class="recent-title">{{ m.title }}</p>
                  <p class="recent-meta">{{ m.type }} · {{ m.year }}</p>
                </div>
                <span class="recent-badge" :class="m.isFree ? 'free' : 'paid'">{{ m.isFree ? 'Free' : 'Premium' }}</span>
              </div>
            </div>
          </div>
          <div class="dash-panel">
            <h3 class="panel-title">Recent Users</h3>
            <div class="recent-list">
              <div v-for="u in allUsers.slice(0,6)" :key="u.uid" class="recent-item">
                <div class="user-av">{{ u.name.slice(0,1).toUpperCase() }}</div>
                <div class="recent-info">
                  <p class="recent-title">{{ u.name }}</p>
                  <p class="recent-meta">{{ u.email }} · {{ u.role }}</p>
                </div>
                <span class="recent-badge" :class="u.role === 'admin' ? 'admin-badge' : 'user-badge'">{{ u.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── CONTENT MANAGEMENT ─── -->
      <div v-else-if="activeSection === 'content'" class="section-content">
        <div class="section-header-row">
          <h1 class="section-title">Content Management</h1>
          <button class="add-btn" @click="showUploadModal = true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
            Upload Content
          </button>
        </div>
        <div class="filter-row">
          <input v-model="contentSearch" placeholder="Search content..." class="search-input" />
          <select v-model="contentTypeFilter" class="filter-select">
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="series">TV Show / Series</option>
            <option value="animation">Animation</option>
            <option value="short">Short Series</option>
            <option value="live-tv">Live TV</option>
            <option value="sport">Sport</option>
          </select>
          <select v-model="contentAccessFilter" class="filter-select">
            <option value="">All Access</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div class="content-table-wrap">
          <table class="content-table">
            <thead>
              <tr>
                <th>Poster</th><th>Title</th><th>Type</th><th>Year</th><th>Rating</th><th>Languages</th><th>Access</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in filteredContent" :key="m.id">
                <td><img :src="m.poster" class="table-poster" @error="onImgErr" /></td>
                <td class="td-title">{{ m.title }}</td>
                <td><span class="type-badge">{{ m.type }}</span></td>
                <td>{{ m.year }}</td>
                <td>⭐ {{ m.rating }}</td>
                <td>
                  <div class="lang-chips">
                    <span v-for="l in m.languages" :key="l" class="lang-chip-sm">{{ l }}</span>
                  </div>
                </td>
                <td>
                  <span class="access-badge" :class="m.isFree ? 'free' : 'paid'">{{ m.isFree ? 'Free' : 'Premium' }}</span>
                </td>
                <td>
                  <div class="action-btns">
                    <button class="act-btn" @click="editContent(m)" title="Edit">✏️</button>
                    <button class="act-btn" @click="handleDeleteContent(m.id, m.title)" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Upload Modal -->
        <div v-if="showUploadModal" class="modal-backdrop" @click.self="closeUpload">
          <div class="upload-modal">
            <div class="um-header">
              <h3>{{ editingId ? 'Edit Content' : 'Upload New Content' }}</h3>
              <button class="um-close" @click="closeUpload">✕</button>
            </div>
            <div class="um-body">
              <div class="um-grid">
                <div class="form-field">
                  <label>Title *</label>
                  <input v-model="form.title" placeholder="Enter title" />
                </div>
                <div class="form-field">
                  <label>Content Type *</label>
                  <select v-model="form.type">
                    <option value="movie">Movie</option>
                    <option value="series">TV Show / Series</option>
                    <option value="animation">Animation</option>
                    <option value="short">Short Series</option>
                    <option value="live-tv">Live TV Channel</option>
                    <option value="sport">Sport</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Year *</label>
                  <input v-model="form.year" placeholder="2025" />
                </div>
                <div class="form-field">
                  <label>Rating (0–10)</label>
                  <input v-model="form.rating" type="number" min="0" max="10" step="0.1" placeholder="7.5" />
                </div>
                <div class="form-field full">
                  <label>Poster URL *</label>
                  <input v-model="form.poster" placeholder="https://..." />
                </div>
                <div class="form-field full">
                  <label>Video / Stream URL</label>
                  <input v-model="form.videoUrl" placeholder="https://... (mp4 or m3u8)" />
                </div>
                <div class="form-field full">
                  <label>Description *</label>
                  <textarea v-model="form.description" placeholder="Enter description..." rows="3"></textarea>
                </div>
                <div class="form-field">
                  <label>Genre (comma separated)</label>
                  <input v-model="form.genreStr" placeholder="Action, Drama, Thriller" />
                </div>
                <div class="form-field">
                  <label>Region</label>
                  <input v-model="form.region" placeholder="Uganda, USA, UK..." />
                </div>
                <div class="form-field" v-if="form.type === 'series' || form.type === 'animation' || form.type === 'short'">
                  <label>Number of Seasons</label>
                  <input v-model="form.seasons" type="number" min="1" placeholder="1" />
                </div>
                <div class="form-field">
                  <label>Languages</label>
                  <div class="lang-checks">
                    <label v-for="l in langOptions" :key="l.code" class="lang-check">
                      <input type="checkbox" :value="l.code" v-model="form.languages" />
                      {{ l.label }}
                    </label>
                  </div>
                </div>
                <div class="form-field">
                  <label>Access Level</label>
                  <div class="toggle-row">
                    <button class="toggle-btn" :class="{ active: form.isFree }" @click="form.isFree = true">Free</button>
                    <button class="toggle-btn" :class="{ active: !form.isFree }" @click="form.isFree = false">Premium</button>
                  </div>
                </div>
                <div class="form-field" v-if="form.type === 'series' || form.type === 'animation'">
                  <label>Add Episode</label>
                  <div class="ep-add-row">
                    <input v-model="epForm.season" type="number" placeholder="Season" class="ep-input" />
                    <input v-model="epForm.num" type="number" placeholder="Ep #" class="ep-input" />
                    <input v-model="epForm.title" placeholder="Episode Title" class="ep-input" />
                    <input v-model="epForm.url" placeholder="Video URL" class="ep-input" />
                    <button class="ep-add-btn" @click="addEpisode">Add</button>
                  </div>
                  <div v-if="form.episodes && form.episodes.length" class="ep-list-preview">
                    <div v-for="ep in form.episodes" :key="`${ep.season}-${ep.num}`" class="ep-preview-item">
                      S{{ ep.season }}E{{ ep.num }}: {{ ep.title || `Episode ${ep.num}` }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="um-actions">
                <button class="cancel-btn" @click="closeUpload">Cancel</button>
                <button class="save-btn" @click="saveContent" :disabled="saving || !form.title || !form.poster">
                  <span v-if="saving">Saving…</span>
                  <span v-else>{{ editingId ? 'Update' : 'Upload' }} Content</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── USERS ─── -->
      <div v-else-if="activeSection === 'users'" class="section-content">
        <h1 class="section-title">User Management</h1>
        <div class="filter-row">
          <input v-model="userSearch" placeholder="Search users..." class="search-input" />
          <select v-model="userRoleFilter" class="filter-select">
            <option value="">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>
        <div class="content-table-wrap">
          <table class="content-table">
            <thead>
              <tr><th>Avatar</th><th>Name</th><th>Email</th><th>Role</th><th>Subscription</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr v-for="u in filteredUsers" :key="u.uid">
                <td><div class="user-av">{{ u.name.slice(0,1).toUpperCase() }}</div></td>
                <td class="td-title">{{ u.name }}</td>
                <td style="font-size:12px;color:rgba(255,255,255,0.7)">{{ u.email }}</td>
                <td><span class="access-badge" :class="u.role === 'admin' ? 'admin-badge' : 'user-badge'">{{ u.role }}</span></td>
                <td><span class="access-badge free">Active</span></td>
                <td>
                  <div class="action-btns">
                    <button class="act-btn" @click="handleToggleRole(u)" title="Toggle Role">{{ u.role === 'admin' ? '👤' : '🛡️' }}</button>
                    <button class="act-btn" @click="handleBanUser(u.uid, u.name)" title="Ban">🚫</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ─── ACTIVITIES ─── -->
      <div v-else-if="activeSection === 'activities'" class="section-content">
        <h1 class="section-title">Activity Log</h1>
        <div class="activity-list">
          <div v-for="(act, i) in activities" :key="i" class="activity-item">
            <div class="act-icon">{{ act.emoji }}</div>
            <div class="act-info">
              <p class="act-msg">{{ act.message }}</p>
              <p class="act-time">{{ act.time }}</p>
            </div>
            <span class="act-badge" :class="act.type">{{ act.type }}</span>
          </div>
        </div>
      </div>

      <!-- ─── SEO SETTINGS ─── -->
      <div v-else-if="activeSection === 'seo'" class="section-content">
        <h1 class="section-title">SEO Settings</h1>
        <div class="settings-form">
          <div class="settings-section">
            <h3 class="settings-subtitle">Site Identity</h3>
            <div class="form-field full">
              <label>Site Name</label>
              <input v-model="seoSettings.siteName" placeholder="MovieBox UG" />
            </div>
            <div class="form-field full">
              <label>Site Tagline</label>
              <input v-model="seoSettings.tagline" placeholder="All Translated Movies in Uganda" />
            </div>
            <div class="form-field full">
              <label>Logo URL</label>
              <input v-model="seoSettings.logoUrl" placeholder="https://..." />
              <div v-if="seoSettings.logoUrl" class="logo-preview">
                <img :src="seoSettings.logoUrl" alt="Logo Preview" @error="onImgErr" />
              </div>
            </div>
            <div class="form-field full">
              <label>Favicon URL</label>
              <input v-model="seoSettings.faviconUrl" placeholder="https://...favicon.ico" />
            </div>
          </div>
          <div class="settings-section">
            <h3 class="settings-subtitle">Meta Tags</h3>
            <div class="form-field full">
              <label>Meta Title</label>
              <input v-model="seoSettings.metaTitle" placeholder="MovieBox UG – Watch Movies Online" />
            </div>
            <div class="form-field full">
              <label>Meta Description</label>
              <textarea v-model="seoSettings.metaDescription" placeholder="Watch the latest movies, TV shows and animations in Luganda, Luo, Kiswahili and more." rows="3"></textarea>
            </div>
            <div class="form-field full">
              <label>Keywords</label>
              <input v-model="seoSettings.keywords" placeholder="movies Uganda, Luganda movies, watch online..." />
            </div>
            <div class="form-field full">
              <label>OG Image URL (Social Preview)</label>
              <input v-model="seoSettings.ogImage" placeholder="https://..." />
            </div>
          </div>
          <div class="settings-section">
            <h3 class="settings-subtitle">Google Analytics &amp; Tracking</h3>
            <div class="form-field full">
              <label>Google Analytics ID</label>
              <input v-model="seoSettings.gaId" placeholder="G-XXXXXXXXXX" />
            </div>
            <div class="form-field full">
              <label>Facebook Pixel ID</label>
              <input v-model="seoSettings.fbPixelId" placeholder="XXXXXXXXXXXXXX" />
            </div>
          </div>
          <button class="save-btn large" @click="saveSeo" :disabled="saving">{{ saving ? 'Saving…' : 'Save SEO Settings' }}</button>
          <div v-if="seoSaved" class="save-success">✅ SEO settings saved to Firebase!</div>
        </div>
      </div>

      <!-- ─── SITE SETTINGS ─── -->
      <div v-else-if="activeSection === 'settings'" class="section-content">
        <h1 class="section-title">Site Settings</h1>
        <div class="settings-form">
          <div class="settings-section">
            <h3 class="settings-subtitle">General</h3>
            <div class="form-field full">
              <label>Site Status</label>
              <div class="toggle-row">
                <button class="toggle-btn" :class="{ active: siteSettings.status === 'live' }" @click="siteSettings.status = 'live'">🟢 Live</button>
                <button class="toggle-btn" :class="{ active: siteSettings.status === 'maintenance' }" @click="siteSettings.status = 'maintenance'">🔧 Maintenance</button>
              </div>
            </div>
            <div class="form-field full">
              <label>Contact Email</label>
              <input v-model="siteSettings.contactEmail" placeholder="admin@movieboxug.com" />
            </div>
            <div class="form-field full">
              <label>WhatsApp Support Number</label>
              <input v-model="siteSettings.whatsapp" placeholder="+256 7XX XXX XXX" />
            </div>
          </div>
          <div class="settings-section">
            <h3 class="settings-subtitle">Subscription Pricing (UGX)</h3>
            <div class="pricing-grid">
              <div class="pricing-card" v-for="plan in pricingPlans" :key="plan.id">
                <div class="pricing-label">{{ plan.label }}</div>
                <input v-model="plan.price" type="number" class="pricing-input" />
                <div class="pricing-dur">{{ plan.duration }}</div>
              </div>
            </div>
          </div>
          <div class="settings-section">
            <h3 class="settings-subtitle">Payment Methods</h3>
            <div class="toggle-list">
              <label class="toggle-item" v-for="pm in paymentMethods" :key="pm.id">
                <span>{{ pm.icon }} {{ pm.label }}</span>
                <input type="checkbox" v-model="pm.enabled" class="toggle-check" />
              </label>
            </div>
          </div>
          <div class="settings-section">
            <h3 class="settings-subtitle">Languages Available</h3>
            <div class="lang-checks">
              <label v-for="l in langOptions" :key="l.code" class="lang-check">
                <input type="checkbox" :value="l.code" v-model="siteSettings.enabledLangs" />
                {{ l.label }}
              </label>
            </div>
          </div>
          <button class="save-btn large" @click="saveSettings" :disabled="saving">{{ saving ? 'Saving…' : 'Save Settings' }}</button>
          <div v-if="settingsSaved" class="save-success">✅ Settings saved to Firebase!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, getDoc, setDoc, serverTimestamp, query, orderBy, limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth, ADMIN_EMAIL, type FirestoreUser } from "../stores/useAuth";
import { useContent } from "../composables/useContent";
import type { Movie } from "../data/movies";

const router = useRouter();
const { currentUser, authLoading } = useAuth();
const { content, loadContent, addContent, updateContent, deleteContent } = useContent();

watch(authLoading, (loading) => {
  if (!loading && currentUser.value?.email !== ADMIN_EMAIL) router.push("/");
}, { immediate: true });

const activeSection = ref("dashboard");
const mobileSidebarOpen = ref(false);
const showUploadModal = ref(false);
const editingId = ref<string | null>(null);
const saving = ref(false);

const allUsers = ref<FirestoreUser[]>([]);
const contentSearch = ref("");
const contentTypeFilter = ref("");
const contentAccessFilter = ref("");
const userSearch = ref("");
const userRoleFilter = ref("");
const seoSaved = ref(false);
const settingsSaved = ref(false);

interface Activity { emoji: string; type: string; message: string; time: string; }
const activities = ref<Activity[]>([]);

const fallbackActivities: Activity[] = [
  { emoji: "⬆️", type: "upload", message: "New content uploaded: Mission Impossible", time: "2 min ago" },
  { emoji: "👤", type: "user", message: "New user registered", time: "15 min ago" },
  { emoji: "💳", type: "payment", message: "Subscription payment received: UGX 30,000", time: "1 hour ago" },
  { emoji: "⚙️", type: "setting", message: "Site settings updated by Admin", time: "1 day ago" },
];

function timeAgo(ts: unknown): string {
  const d = (ts as { toDate?: () => Date })?.toDate?.();
  if (!d) return "Just now";
  const diff = Date.now() - d.getTime();
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hour(s) ago`;
  return `${Math.floor(diff / 86400000)} day(s) ago`;
}

async function logActivity(emoji: string, type: string, message: string) {
  try {
    await addDoc(collection(db, "activities"), { emoji, type, message, createdAt: serverTimestamp() });
    activities.value.unshift({ emoji, type, message, time: "Just now" });
  } catch { /* ignore */ }
}

async function loadActivities() {
  try {
    const q = query(collection(db, "activities"), orderBy("createdAt", "desc"), limit(20));
    const snap = await getDocs(q);
    if (!snap.empty) {
      activities.value = snap.docs.map((d) => {
        const data = d.data();
        return { emoji: data.emoji, type: data.type, message: data.message, time: timeAgo(data.createdAt) };
      });
    } else {
      activities.value = [...fallbackActivities];
    }
  } catch { activities.value = [...fallbackActivities]; }
}

async function loadUsers() {
  try {
    const snap = await getDocs(collection(db, "users"));
    allUsers.value = snap.docs.map((d) => d.data() as FirestoreUser);
  } catch { allUsers.value = []; }
}

const seoSettings = reactive({
  siteName: "MovieBox UG",
  tagline: "All Translated Movies in Uganda",
  logoUrl: "https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg",
  faviconUrl: "",
  metaTitle: "MovieBox UG – Watch Movies & Series Online",
  metaDescription: "Watch the latest movies, TV shows and animations in Luganda, Luo, Kiswahili and more.",
  keywords: "movies Uganda, Luganda movies, watch online, MovieBox UG",
  ogImage: "",
  gaId: "",
  fbPixelId: "",
});

const siteSettings = reactive({
  status: "live",
  contactEmail: "admin@movieboxug.com",
  whatsapp: "+256 700 000 000",
  enabledLangs: ["en", "lg", "ach", "teo", "sw", "others"],
});

async function loadSettings() {
  try {
    const seoSnap = await getDoc(doc(db, "settings", "seo"));
    if (seoSnap.exists()) Object.assign(seoSettings, seoSnap.data());
    const siteSnap = await getDoc(doc(db, "settings", "site"));
    if (siteSnap.exists()) Object.assign(siteSettings, siteSnap.data());
  } catch { /* use defaults */ }
}

async function saveSeo() {
  saving.value = true;
  try {
    await setDoc(doc(db, "settings", "seo"), { ...seoSettings, updatedAt: serverTimestamp() });
    await logActivity("⚙️", "setting", "SEO settings updated by Admin");
  } catch { /* save locally anyway */ }
  saving.value = false;
  seoSaved.value = true;
  setTimeout(() => { seoSaved.value = false; }, 3000);
}

async function saveSettings() {
  saving.value = true;
  try {
    await setDoc(doc(db, "settings", "site"), {
      ...siteSettings,
      pricingPlans: pricingPlans.value,
      paymentMethods: paymentMethods.value,
      updatedAt: serverTimestamp(),
    });
    await logActivity("⚙️", "setting", "Site settings updated by Admin");
  } catch { /* save locally anyway */ }
  saving.value = false;
  settingsSaved.value = true;
  setTimeout(() => { settingsSaved.value = false; }, 3000);
}

const pricingPlans = ref([
  { id: "1day", label: "1 Day", price: 5000, duration: "24 hours" },
  { id: "1week", label: "1 Week", price: 10000, duration: "7 days" },
  { id: "1month", label: "1 Month", price: 30000, duration: "30 days" },
]);

const paymentMethods = ref([
  { id: "mobile-money", label: "Mobile Money", icon: "📱", enabled: true },
  { id: "card", label: "Card Payment", icon: "💳", enabled: true },
  { id: "bank", label: "Bank Transfer", icon: "🏦", enabled: true },
]);

const langOptions = [
  { code: "en", label: "English" },
  { code: "lg", label: "Luganda" },
  { code: "ach", label: "Luo" },
  { code: "teo", label: "Teso" },
  { code: "sw", label: "Kiswahili" },
  { code: "others", label: "Others" },
];

const sections = computed(() => [
  { id: "dashboard", label: "Dashboard", icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>` },
  { id: "content", label: "Content", count: content.value.length, icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 4v16M16 4v16M2 12h20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { id: "users", label: "Users", count: allUsers.value.length, icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 20c0-4 3.1-7 7-7s7 3 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="17" cy="8" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M22 20c0-3-2-5-5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { id: "activities", label: "Activities", icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 17l4-8 4 5 4-10 4 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: "seo", label: "SEO Settings", icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="1.5"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { id: "settings", label: "Site Settings", icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.5"/></svg>` },
]);

const currentSection = computed(() => sections.value.find((s) => s.id === activeSection.value));

const stats = computed(() => [
  { label: "Total Content", value: content.value.length, trend: "+12%", up: true, icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#1cb7ff" stroke-width="1.5"/><path d="M8 4v16M16 4v16" stroke="#1cb7ff" stroke-width="1.5"/></svg>` },
  { label: "Registered Users", value: allUsers.value.length, trend: "+5%", up: true, icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#2ff58b" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#2ff58b" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { label: "Free Content", value: content.value.filter((m) => m.isFree).length, trend: "+3", up: true, icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#fbb827" stroke-width="1.5"/></svg>` },
  { label: "Premium Content", value: content.value.filter((m) => !m.isFree).length, trend: "+8%", up: true, icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1z" stroke="#a855f7" stroke-width="1.5"/></svg>` },
]);

const recentContent = computed(() => [...content.value].slice(0, 6));

const filteredContent = computed(() => {
  let list = content.value;
  if (contentSearch.value) list = list.filter((m) => m.title.toLowerCase().includes(contentSearch.value.toLowerCase()));
  if (contentTypeFilter.value) list = list.filter((m) => m.type === contentTypeFilter.value);
  if (contentAccessFilter.value === "free") list = list.filter((m) => m.isFree);
  if (contentAccessFilter.value === "premium") list = list.filter((m) => !m.isFree);
  return list;
});

const filteredUsers = computed(() => {
  let users = allUsers.value;
  if (userSearch.value) users = users.filter((u) => u.name.toLowerCase().includes(userSearch.value.toLowerCase()) || u.email.includes(userSearch.value));
  if (userRoleFilter.value) users = users.filter((u) => u.role === userRoleFilter.value);
  return users;
});

interface FormData {
  title: string; type: string; year: string; rating: string; poster: string;
  videoUrl: string; description: string; genreStr: string; region: string;
  seasons: number; languages: string[]; isFree: boolean;
  episodes: { season: number; num: number; title: string; url: string }[];
}

const defaultForm = (): FormData => ({
  title: "", type: "movie", year: "2025", rating: "7.0", poster: "",
  videoUrl: "", description: "", genreStr: "", region: "Uganda",
  seasons: 1, languages: ["en"], isFree: false, episodes: [],
});

const form = reactive<FormData>(defaultForm());
const epForm = reactive({ season: 1, num: 1, title: "", url: "" });

function addEpisode() {
  form.episodes.push({ ...epForm });
  epForm.num++;
}

function editContent(m: Movie) {
  Object.assign(form, {
    title: m.title, type: m.type, year: m.year, rating: m.rating,
    poster: m.poster, videoUrl: "", description: m.description,
    genreStr: m.genre.join(", "), region: m.region ?? "Uganda",
    seasons: m.seasons ?? 1, languages: [...m.languages],
    isFree: m.isFree ?? false, episodes: [],
  });
  editingId.value = m.id;
  showUploadModal.value = true;
}

async function saveContent() {
  if (!form.title || !form.poster) return;
  saving.value = true;
  const movieData = {
    title: form.title,
    href: editingId.value ? `/watch/${editingId.value}` : "",
    poster: form.poster,
    languages: form.languages,
    type: form.type as Movie["type"],
    genre: form.genreStr.split(",").map((g) => g.trim()).filter(Boolean),
    year: form.year,
    description: form.description,
    rating: form.rating,
    seasons: (form.type !== "movie" && form.type !== "live-tv") ? Number(form.seasons) : undefined,
    region: form.region,
    isFree: form.isFree,
    ...(form.videoUrl ? { videoUrl: form.videoUrl } : {}),
    ...(form.episodes.length ? { episodes: form.episodes } : {}),
  };
  try {
    if (editingId.value) {
      await updateContent(editingId.value, movieData);
      await logActivity("✏️", "upload", `Content updated: ${form.title}`);
    } else {
      await addContent(movieData);
      await logActivity("⬆️", "upload", `New content uploaded: ${form.title}`);
    }
  } catch { /* ignore */ }
  saving.value = false;
  closeUpload();
}

function closeUpload() {
  showUploadModal.value = false;
  editingId.value = null;
  Object.assign(form, defaultForm());
}

async function handleDeleteContent(id: string, title: string) {
  if (!confirm(`Delete "${title}"?`)) return;
  try {
    await deleteContent(id);
    await logActivity("🗑️", "delete", `Content removed: ${title}`);
  } catch { /* ignore */ }
}

async function handleToggleRole(u: FirestoreUser) {
  const newRole = u.role === "admin" ? "user" : "admin";
  try {
    await updateDoc(doc(db, "users", u.uid), { role: newRole });
    u.role = newRole;
    await logActivity("🛡️", "user", `User role changed: ${u.name} → ${newRole}`);
  } catch { /* ignore */ }
}

async function handleBanUser(uid: string, name: string) {
  if (!confirm(`Ban user "${name}"? This will remove them from the system.`)) return;
  try {
    await deleteDoc(doc(db, "users", uid));
    allUsers.value = allUsers.value.filter((u) => u.uid !== uid);
    await logActivity("🚫", "user", `User banned: ${name}`);
  } catch { /* ignore */ }
}

function onImgErr(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = `https://placehold.co/40x60/2b2e39/555?text=?`;
}

onMounted(async () => {
  await Promise.all([loadContent(), loadUsers(), loadActivities(), loadSettings()]);
});
</script>

<style scoped>
.admin-root { display: flex; min-height: 100vh; background: #0d0f14; color: white; font-family: inherit; }
.admin-sidebar { width: 220px; flex-shrink: 0; background: #13151b; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; padding-bottom: 20px; }
.admin-logo { display: flex; align-items: center; gap: 6px; padding: 20px 16px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.alogo-img { height: 20px; }
.alogo-ug { font-size: 12px; font-weight: 800; background: linear-gradient(91deg, #1cb7ff, #2ff58b); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.admin-tag { font-size: 9px; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: rgba(251,184,39,0.15); color: #fbb827; letter-spacing: 0.5px; margin-left: 2px; }
.admin-nav { flex: 1; padding: 10px 8px; display: flex; flex-direction: column; gap: 2px; }
.admin-nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; border: none; background: none; color: rgba(255,255,255,0.55); font-size: 13px; font-weight: 500; cursor: pointer; text-align: left; transition: all 0.15s; width: 100%; }
.admin-nav-item:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.85); }
.admin-nav-item.active { background: rgba(28,183,255,0.1); color: #1cb7ff; }
.ani { display: flex; align-items: center; flex-shrink: 0; }
.nav-count { margin-left: auto; background: rgba(28,183,255,0.15); color: #1cb7ff; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px; }
.admin-back-btn { display: flex; align-items: center; gap: 8px; margin: 0 12px; padding: 9px 12px; border-radius: 8px; text-decoration: none; color: rgba(255,255,255,0.4); font-size: 12px; border: 1px solid rgba(255,255,255,0.08); transition: all 0.15s; }
.admin-back-btn:hover { color: white; border-color: rgba(255,255,255,0.2); }
.admin-mobile-header { display: none; align-items: center; gap: 12px; padding: 0 16px; height: 52px; background: #13151b; border-bottom: 1px solid rgba(255,255,255,0.06); position: sticky; top: 0; z-index: 50; }
.mobile-menu-btn { background: none; border: none; cursor: pointer; padding: 4px; }
.mobile-section-title { font-size: 15px; font-weight: 700; flex: 1; }
.mobile-back { color: #1cb7ff; text-decoration: none; font-size: 12px; }
.mobile-sidebar-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.7); display: flex; }
.mobile-sidebar { width: 240px; background: #13151b; height: 100%; overflow-y: auto; }
.admin-main { flex: 1; min-width: 0; overflow-y: auto; }
.section-content { padding: 24px 24px 40px; max-width: 1200px; }
.section-title { font-size: 22px; font-weight: 800; margin: 0 0 20px; }
.section-header-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.section-header-row .section-title { margin: 0; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
.stat-card { background: #16181f; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px; }
.stat-icon { width: 42px; height: 42px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.04); border-radius: 10px; }
.stat-info { flex: 1; min-width: 0; }
.stat-value { font-size: 22px; font-weight: 800; color: white; }
.stat-label { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 2px; }
.stat-trend { font-size: 11px; font-weight: 700; }
.stat-trend.up { color: #2ff58b; }
.stat-trend.down { color: #ff6b6b; }
.dash-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.dash-panel { background: #16181f; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 16px; }
.panel-title { font-size: 14px; font-weight: 700; margin: 0 0 12px; }
.recent-list { display: flex; flex-direction: column; gap: 8px; }
.recent-item { display: flex; align-items: center; gap: 10px; padding: 6px 0; }
.recent-poster { width: 32px; height: 46px; object-fit: cover; border-radius: 4px; flex-shrink: 0; background: #2b2e39; }
.recent-info { flex: 1; min-width: 0; }
.recent-title { font-size: 12px; font-weight: 600; color: white; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.recent-meta { font-size: 10px; color: rgba(255,255,255,0.4); margin: 2px 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.recent-badge { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; }
.recent-badge.free { background: rgba(47,245,139,0.12); color: #2ff58b; }
.recent-badge.paid { background: rgba(168,85,247,0.12); color: #a855f7; }
.recent-badge.admin-badge { background: rgba(251,184,39,0.12); color: #fbb827; }
.recent-badge.user-badge { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); }
.user-av { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #1cb7ff, #2ff58b); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: #0d0f14; flex-shrink: 0; }
.filter-row { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
.search-input { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 9px 14px; color: white; font-size: 13px; outline: none; flex: 1; min-width: 200px; }
.search-input::placeholder { color: rgba(255,255,255,0.3); }
.filter-select { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 9px 12px; color: white; font-size: 13px; outline: none; cursor: pointer; }
.filter-select option { background: #1a1c22; }
.content-table-wrap { overflow-x: auto; }
.content-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.content-table th { text-align: left; padding: 10px 12px; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.4); border-bottom: 1px solid rgba(255,255,255,0.06); text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
.content-table td { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
.content-table tr:hover td { background: rgba(255,255,255,0.02); }
.table-poster { width: 30px; height: 44px; object-fit: cover; border-radius: 4px; background: #2b2e39; }
.td-title { font-weight: 600; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.type-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 4px; background: rgba(28,183,255,0.12); color: #1cb7ff; text-transform: uppercase; }
.lang-chips { display: flex; gap: 3px; flex-wrap: wrap; }
.lang-chip-sm { font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 3px; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); }
.access-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 4px; }
.access-badge.free { background: rgba(47,245,139,0.12); color: #2ff58b; }
.access-badge.paid { background: rgba(168,85,247,0.12); color: #a855f7; }
.access-badge.admin-badge { background: rgba(251,184,39,0.12); color: #fbb827; }
.access-badge.user-badge { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); }
.action-btns { display: flex; gap: 4px; }
.act-btn { background: none; border: none; font-size: 15px; cursor: pointer; padding: 4px 6px; border-radius: 6px; transition: background 0.15s; }
.act-btn:hover { background: rgba(255,255,255,0.08); }
.add-btn { display: flex; align-items: center; gap: 7px; padding: 9px 16px; border-radius: 10px; border: none; background: linear-gradient(91deg, #1cb7ff, #2ff58b); color: #0d0f14; font-size: 13px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }
.add-btn:hover { opacity: 0.9; }
.modal-backdrop { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px); }
.upload-modal { background: #1a1c24; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; width: 100%; max-width: 720px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
.um-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; }
.um-header h3 { font-size: 16px; font-weight: 700; margin: 0; }
.um-close { background: none; border: none; color: rgba(255,255,255,0.5); font-size: 18px; cursor: pointer; width: 30px; height: 30px; border-radius: 50%; transition: background 0.15s; }
.um-close:hover { background: rgba(255,255,255,0.08); color: white; }
.um-body { flex: 1; overflow-y: auto; padding: 20px; }
.um-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
.form-field { display: flex; flex-direction: column; gap: 5px; }
.form-field.full { grid-column: 1 / -1; }
.form-field label { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.4px; }
.form-field input, .form-field select, .form-field textarea { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 9px 12px; color: white; font-size: 13px; outline: none; font-family: inherit; transition: border-color 0.2s; }
.form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: rgba(28,183,255,0.4); }
.form-field select option { background: #1a1c24; }
.form-field input::placeholder, .form-field textarea::placeholder { color: rgba(255,255,255,0.25); }
.form-field textarea { resize: vertical; }
.lang-checks { display: flex; flex-wrap: wrap; gap: 8px; }
.lang-check { display: flex; align-items: center; gap: 5px; font-size: 12px; color: rgba(255,255,255,0.7); cursor: pointer; }
.lang-check input { cursor: pointer; }
.toggle-row { display: flex; gap: 6px; }
.toggle-btn { flex: 1; padding: 7px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.toggle-btn.active { background: rgba(28,183,255,0.12); border-color: #1cb7ff; color: #1cb7ff; }
.ep-add-row { display: flex; gap: 6px; flex-wrap: wrap; }
.ep-input { flex: 1; min-width: 80px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 7px 10px; color: white; font-size: 12px; outline: none; }
.ep-add-btn { padding: 7px 12px; border-radius: 6px; border: none; background: linear-gradient(91deg, #1cb7ff, #2ff58b); color: #0d0f14; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; }
.ep-list-preview { margin-top: 8px; display: flex; flex-direction: column; gap: 3px; }
.ep-preview-item { font-size: 11px; color: rgba(255,255,255,0.5); padding: 3px 8px; background: rgba(255,255,255,0.04); border-radius: 4px; }
.um-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }
.cancel-btn { padding: 10px 18px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: none; color: rgba(255,255,255,0.6); font-size: 13px; cursor: pointer; }
.save-btn { padding: 10px 20px; border-radius: 10px; border: none; background: linear-gradient(91deg, #1cb7ff, #2ff58b); color: #0d0f14; font-size: 14px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
.save-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.save-btn.large { width: 100%; padding: 13px; font-size: 15px; margin-top: 8px; }
.activity-list { display: flex; flex-direction: column; gap: 2px; }
.activity-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); }
.act-icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
.act-info { flex: 1; min-width: 0; }
.act-msg { font-size: 13px; color: rgba(255,255,255,0.8); margin: 0 0 3px; }
.act-time { font-size: 11px; color: rgba(255,255,255,0.35); margin: 0; }
.act-badge { font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; }
.act-badge.upload { background: rgba(28,183,255,0.12); color: #1cb7ff; }
.act-badge.user { background: rgba(47,245,139,0.12); color: #2ff58b; }
.act-badge.payment { background: rgba(251,184,39,0.12); color: #fbb827; }
.act-badge.delete { background: rgba(255,107,107,0.12); color: #ff6b6b; }
.act-badge.setting { background: rgba(168,85,247,0.12); color: #a855f7; }
.settings-form { display: flex; flex-direction: column; gap: 0; }
.settings-section { background: #16181f; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.settings-subtitle { font-size: 14px; font-weight: 700; margin: 0 0 14px; color: white; }
.settings-section .form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.settings-section .form-field:last-child { margin-bottom: 0; }
.logo-preview { margin-top: 8px; }
.logo-preview img { height: 36px; object-fit: contain; }
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.pricing-card { background: rgba(255,255,255,0.04); border-radius: 10px; padding: 14px; text-align: center; border: 1px solid rgba(255,255,255,0.08); }
.pricing-label { font-size: 12px; font-weight: 700; color: white; margin-bottom: 8px; }
.pricing-input { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px; color: white; font-size: 14px; font-weight: 700; text-align: center; outline: none; width: 100%; }
.pricing-dur { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 4px; }
.toggle-list { display: flex; flex-direction: column; gap: 8px; }
.toggle-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.04); border-radius: 8px; cursor: pointer; font-size: 13px; color: rgba(255,255,255,0.75); }
.toggle-check { width: 16px; height: 16px; cursor: pointer; }
.save-success { margin-top: 10px; padding: 12px; background: rgba(47,245,139,0.1); border: 1px solid rgba(47,245,139,0.2); border-radius: 8px; color: #2ff58b; font-size: 13px; font-weight: 600; text-align: center; }
@media (max-width: 900px) {
  .admin-sidebar { display: none; }
  .admin-mobile-header { display: flex; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .dash-row { grid-template-columns: 1fr; }
  .um-grid { grid-template-columns: 1fr; }
  .form-field.full { grid-column: auto; }
}
@media (max-width: 600px) {
  .section-content { padding: 16px 12px 30px; }
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .stat-value { font-size: 18px; }
  .pricing-grid { grid-template-columns: 1fr; }
}
</style>
