import { ref, computed, watch } from "vue";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./useAuth";

export interface SubscriptionPlan {
  id: string;
  label: string;
  duration: string;
  price: number;
  popular?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  { id: "1day", label: "1 Day", duration: "24 hours", price: 5000 },
  { id: "1week", label: "1 Week", duration: "7 days", price: 10000, popular: true },
  { id: "1month", label: "1 Month", duration: "30 days", price: 30000 },
];

const DURATIONS: Record<string, number> = {
  "1day": 24 * 60 * 60 * 1000,
  "1week": 7 * 24 * 60 * 60 * 1000,
  "1month": 30 * 24 * 60 * 60 * 1000,
};

interface StoredSubscription {
  userId: string;
  planId: string;
  expiresAt: number;
}

const storedSub = ref<StoredSubscription | null>(null);
const showSubModal = ref(false);
const subLoaded = ref(false);

async function fetchSub(uid: string) {
  try {
    const snap = await getDoc(doc(db, "subscriptions", uid));
    if (snap.exists()) {
      const data = snap.data() as StoredSubscription;
      if (data.expiresAt > Date.now()) {
        storedSub.value = data;
      } else {
        storedSub.value = null;
      }
    } else {
      storedSub.value = null;
    }
  } catch {
    storedSub.value = null;
  }
  subLoaded.value = true;
}

export function useSubscription() {
  const { currentUser } = useAuth();

  watch(
    () => currentUser.value?.uid,
    (uid) => {
      if (uid) fetchSub(uid);
      else { storedSub.value = null; subLoaded.value = true; }
    },
    { immediate: true }
  );

  const isActive = computed(() => {
    if (!storedSub.value) return false;
    return storedSub.value.expiresAt > Date.now();
  });

  const expiresAt = computed(() =>
    storedSub.value ? new Date(storedSub.value.expiresAt) : null
  );

  function openSubscriptionModal() {
    showSubModal.value = true;
  }

  function closeSubModal() {
    showSubModal.value = false;
  }

  async function subscribe(planId: string) {
    const uid = currentUser.value?.uid;
    if (!uid) return;
    const sub: StoredSubscription = {
      userId: uid,
      planId,
      expiresAt: Date.now() + (DURATIONS[planId] ?? DURATIONS["1day"]),
    };
    try {
      await setDoc(doc(db, "subscriptions", uid), {
        ...sub,
        updatedAt: serverTimestamp(),
      });
      storedSub.value = sub;
    } catch {
      storedSub.value = sub;
    }
    showSubModal.value = false;
  }

  return {
    isActive,
    expiresAt,
    showSubModal,
    subLoaded,
    openSubscriptionModal,
    closeSubModal,
    subscribe,
  };
}
