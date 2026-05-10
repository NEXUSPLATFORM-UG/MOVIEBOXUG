import { ref, computed } from "vue";

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

const STORAGE_KEY = "mbug_subscription";

interface StoredSubscription {
  userId: string;
  planId: string;
  expiresAt: number;
}

function loadSubscription(): StoredSubscription | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const sub: StoredSubscription = JSON.parse(raw);
    if (sub.expiresAt < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return sub;
  } catch {
    return null;
  }
}

const storedSub = ref<StoredSubscription | null>(loadSubscription());
const showSubModal = ref(false);

export function useSubscription() {
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

  function subscribe(planId: string, userId: string = "guest") {
    const plan = subscriptionPlans.find((p) => p.id === planId);
    if (!plan) return;
    const durations: Record<string, number> = {
      "1day": 24 * 60 * 60 * 1000,
      "1week": 7 * 24 * 60 * 60 * 1000,
      "1month": 30 * 24 * 60 * 60 * 1000,
    };
    const sub: StoredSubscription = {
      userId,
      planId,
      expiresAt: Date.now() + (durations[planId] ?? 24 * 60 * 60 * 1000),
    };
    storedSub.value = sub;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
    showSubModal.value = false;
  }

  return { isActive, expiresAt, showSubModal, openSubscriptionModal, closeSubModal, subscribe };
}
