import { ref } from "vue";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  getAllMovies,
  bannerSlides as staticBannerSlides,
  type Movie,
  type BannerSlide,
} from "../data/movies";

const content = ref<Movie[]>([]);
const bannerSlides = ref<BannerSlide[]>([]);
const contentLoaded = ref(false);
const usingFirestore = ref(false);

export function useContent() {
  async function loadContent() {
    try {
      const q = query(collection(db, "content"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      if (!snap.empty) {
        content.value = snap.docs.map((d) => {
          const data = d.data() as Omit<Movie, "id">;
          return { id: d.id, href: `/watch/${d.id}`, ...data };
        });
        usingFirestore.value = true;
        const featured = content.value.filter((m) => !!(m as Movie & { featured?: boolean }).featured).slice(0, 5);
        const forBanner = featured.length > 0 ? featured : content.value.slice(0, 5);
        bannerSlides.value = forBanner.map((m) => ({
          id: m.id,
          title: m.title,
          subtitle: m.title,
          genres: m.genre.join(","),
          year: m.year,
          href: m.href || `/watch/${m.id}`,
          bgImage: m.poster,
          bgColor: "#1a1c24",
          type: (m.type === "series" || m.type === "animation" ? m.type : "movie") as BannerSlide["type"],
        }));
        if (bannerSlides.value.length === 0) {
          bannerSlides.value = staticBannerSlides;
        }
      } else {
        content.value = getAllMovies();
        bannerSlides.value = staticBannerSlides;
        usingFirestore.value = false;
      }
    } catch {
      content.value = getAllMovies();
      bannerSlides.value = staticBannerSlides;
      usingFirestore.value = false;
    }
    contentLoaded.value = true;
  }

  function getByType(type: Movie["type"]) {
    return content.value.filter((m) => m.type === type);
  }

  function getByTypes(...types: Movie["type"][]) {
    return content.value.filter((m) => types.includes(m.type));
  }

  function getById(id: string): Movie | undefined {
    return content.value.find((m) => m.id === id);
  }

  async function addContent(movie: Omit<Movie, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, "content"), {
      ...movie,
      href: "",
      createdAt: serverTimestamp(),
    });
    const href = `/watch/${docRef.id}`;
    await updateDoc(doc(db, "content", docRef.id), { href });
    const newMovie: Movie = { ...movie, id: docRef.id, href };
    content.value.unshift(newMovie);
    return docRef.id;
  }

  async function updateContent(id: string, updates: Partial<Movie>) {
    await updateDoc(doc(db, "content", id), { ...updates, updatedAt: serverTimestamp() });
    const idx = content.value.findIndex((m) => m.id === id);
    if (idx !== -1) content.value[idx] = { ...content.value[idx], ...updates };
  }

  async function deleteContent(id: string) {
    if (usingFirestore.value) {
      await deleteDoc(doc(db, "content", id));
    }
    content.value = content.value.filter((m) => m.id !== id);
  }

  return {
    content,
    bannerSlides,
    contentLoaded,
    usingFirestore,
    loadContent,
    getByType,
    getByTypes,
    getById,
    addContent,
    updateContent,
    deleteContent,
  };
}
