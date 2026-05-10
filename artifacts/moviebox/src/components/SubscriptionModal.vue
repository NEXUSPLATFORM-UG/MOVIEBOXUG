<template>
  <Teleport to="body">
    <div v-if="showSubModal" class="modal-overlay" @click.self="closeSubModal">
      <div class="modal-box">
        <button class="modal-close" @click="closeSubModal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Not logged in gate -->
        <div v-if="!isLoggedIn" class="login-gate">
          <div class="gate-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#1cb7ff" stroke-width="1.5"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#1cb7ff" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <h2 class="gate-title">Sign in to Subscribe</h2>
          <p class="gate-sub">Create a free account or sign in to access premium content.</p>
          <button class="gate-login-btn" @click="handleGoLogin">Sign In / Register</button>
        </div>

        <!-- Subscription form -->
        <template v-else>
          <div class="modal-header">
            <div class="crown-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M2 19h20M3 8l4 5 5-8 5 8 4-5 1 11H2L3 8z" stroke="#fbb827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="rgba(251,184,39,0.1)"/>
              </svg>
            </div>
            <h2 class="modal-title">Premium Access</h2>
            <p class="modal-sub">Unlock all movies, series &amp; downloads</p>
          </div>

          <div class="plans-row">
            <button
              v-for="plan in plans"
              :key="plan.id"
              class="plan-card"
              :class="{ selected: selectedPlan === plan.id, popular: plan.popular }"
              @click="selectedPlan = plan.id"
            >
              <div v-if="plan.popular" class="popular-tag">Popular</div>
              <div class="plan-label">{{ plan.label }}</div>
              <div class="plan-price">UGX {{ plan.price.toLocaleString() }}</div>
              <div class="plan-dur">{{ plan.duration }}</div>
            </button>
          </div>

          <div class="payment-section">
            <p class="payment-label">Payment Method</p>
            <div class="payment-methods">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                class="method-btn"
                :class="{ selected: selectedMethod === method.id }"
                @click="selectedMethod = method.id"
              >
                <span class="method-icon" v-html="method.icon" />
                <span class="method-name">{{ method.name }}</span>
              </button>
            </div>

            <div v-if="selectedMethod === 'mobile-money'" class="payment-form">
              <label>Mobile Money Number</label>
              <input v-model="payPhone" type="tel" placeholder="07XX XXX XXX" />
              <p class="pay-note">You will receive a payment prompt on your phone</p>
            </div>
            <div v-else-if="selectedMethod === 'card'" class="payment-form">
              <label>Card Number</label>
              <input v-model="cardNum" type="text" placeholder="XXXX XXXX XXXX XXXX" maxlength="19" />
              <div class="card-row">
                <div class="card-field">
                  <label>Expiry</label>
                  <input v-model="cardExp" type="text" placeholder="MM/YY" maxlength="5" />
                </div>
                <div class="card-field card-field--cvv">
                  <label>CVV</label>
                  <input v-model="cardCvv" type="password" placeholder="···" maxlength="3" />
                </div>
              </div>
            </div>
            <div v-else-if="selectedMethod === 'bank'" class="payment-form">
              <div class="bank-details">
                <p class="bank-row"><strong>Bank:</strong> Stanbic Bank Uganda</p>
                <p class="bank-row"><strong>Account:</strong> 9030012345678</p>
                <p class="bank-row"><strong>Account Name:</strong> MovieBox UG Ltd</p>
                <p class="bank-row"><strong>Reference:</strong> {{ payRef }}</p>
              </div>
              <p class="pay-note">Send payment and use reference code. Access activates within 2 hours.</p>
            </div>
          </div>

          <div v-if="successMsg" class="success-msg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#2ff58b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ successMsg }}
          </div>

          <button class="pay-btn" @click="handlePay" :disabled="!selectedPlan || !selectedMethod">
            {{ payBtnLabel }}
          </button>

          <p class="terms-note">By subscribing you agree to our Terms of Service. Cancel anytime.</p>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSubscription, subscriptionPlans } from "../stores/useSubscription";
import { useAuth } from "../stores/useAuth";

const { showSubModal, closeSubModal, subscribe } = useSubscription();
const { currentUser, isLoggedIn, openLogin } = useAuth();

const plans = subscriptionPlans;
const selectedPlan = ref("1week");
const selectedMethod = ref("mobile-money");
const payPhone = ref("");
const cardNum = ref("");
const cardExp = ref("");
const cardCvv = ref("");
const successMsg = ref("");

const paymentMethods = [
  {
    id: "mobile-money",
    name: "Mobile Money",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="7" r="1" fill="currentColor"/></svg>`,
  },
  {
    id: "card",
    name: "Card",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 10h20" stroke="currentColor" stroke-width="1.5"/><path d="M6 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M3 10h18M5 10V21M19 10V21M12 3L2 10h20L12 3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10v11M15 10v11" stroke="currentColor" stroke-width="1.5"/></svg>`,
  },
];

const payRef = computed(() => `MBUG-${Date.now().toString().slice(-6)}`);

const selectedPlanObj = computed(() => plans.find((p) => p.id === selectedPlan.value));

const payBtnLabel = computed(() => {
  if (!selectedPlanObj.value) return "Select a plan";
  return `Pay UGX ${selectedPlanObj.value.price.toLocaleString()}`;
});

function handleGoLogin() {
  closeSubModal();
  openLogin();
}

function handlePay() {
  if (!selectedPlan.value || !selectedMethod.value) return;
  subscribe(selectedPlan.value, currentUser.value?.id ?? "guest");
  successMsg.value = "Subscription activated! Enjoy unlimited access.";
  setTimeout(() => {
    successMsg.value = "";
    closeSubModal();
  }, 2000);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.8);
  display: flex; align-items: center; justify-content: center;
  padding: 12px; backdrop-filter: blur(4px);
  overflow-y: auto;
}
.modal-box {
  background: #1a1c22;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 18px 14px 14px;
  width: 100%; max-width: 400px;
  max-height: calc(100dvh - 24px);
  overflow-y: auto;
  scrollbar-width: none;
  position: relative;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6);
  margin: auto;
}
.modal-box::-webkit-scrollbar { display: none; }
.modal-close {
  position: absolute; top: 12px; right: 12px;
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(255,255,255,0.08); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}

/* Login gate */
.login-gate { text-align: center; padding: 16px 8px 8px; }
.gate-icon { display: flex; justify-content: center; margin-bottom: 12px; }
.gate-title { font-size: 18px; font-weight: 800; color: white; margin: 0 0 6px; }
.gate-sub { font-size: 13px; color: rgba(255,255,255,0.5); margin: 0 0 18px; line-height: 1.5; }
.gate-login-btn {
  width: 100%; padding: 12px; border-radius: 10px; border: none;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  color: #101114; font-size: 14px; font-weight: 700; cursor: pointer;
}

.modal-header { text-align: center; margin-bottom: 12px; }
.crown-icon { display: flex; justify-content: center; margin-bottom: 4px; }
.modal-title { font-size: 16px; font-weight: 800; color: white; margin: 0 0 2px; }
.modal-sub { font-size: 11px; color: rgba(255,255,255,0.5); margin: 0; }

.plans-row { display: flex; gap: 5px; margin-bottom: 12px; }
.plan-card {
  flex: 1; padding: 8px 4px; border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  cursor: pointer; text-align: center; position: relative;
  transition: all 0.15s;
}
.plan-card.selected { border-color: #1cb7ff; background: rgba(28,183,255,0.1); }
.plan-card.popular { border-color: #2ff58b; }
.plan-card.popular.selected { border-color: #2ff58b; background: rgba(47,245,139,0.1); }
.popular-tag {
  position: absolute; top: -9px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  color: #0d0e11; font-size: 8px; font-weight: 800;
  padding: 2px 7px; border-radius: 8px; white-space: nowrap;
}
.plan-label { font-size: 11px; font-weight: 700; color: white; margin-bottom: 4px; }
.plan-price { font-size: 12px; font-weight: 800; color: #2ff58b; }
.plan-dur { font-size: 9px; color: rgba(255,255,255,0.4); margin-top: 2px; }

.payment-section { margin-bottom: 10px; }
.payment-label { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 600; margin: 0 0 6px; }
.payment-methods { display: flex; gap: 5px; margin-bottom: 10px; }
.method-btn {
  flex: 1; padding: 6px 4px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  cursor: pointer; display: flex; flex-direction: column;
  align-items: center; gap: 3px; transition: all 0.15s; color: rgba(255,255,255,0.6);
}
.method-btn.selected { border-color: #1cb7ff; background: rgba(28,183,255,0.1); color: #1cb7ff; }
.method-icon { display: flex; align-items: center; }
.method-name { font-size: 9px; color: inherit; font-weight: 600; }
.payment-form { display: flex; flex-direction: column; gap: 6px; }
.payment-form label { font-size: 10px; color: rgba(255,255,255,0.5); }
.payment-form input {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
  padding: 7px 10px; color: white; font-size: 13px; outline: none; width: 100%; box-sizing: border-box;
}
.payment-form input:focus { border-color: rgba(28,183,255,0.4); }
.card-row { display: flex; gap: 8px; }
.card-field { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.card-field--cvv { flex: 0 0 72px; }
.pay-note { font-size: 10px; color: rgba(255,255,255,0.35); margin: 0; }
.bank-details { background: rgba(255,255,255,0.04); border-radius: 8px; padding: 10px; }
.bank-row { font-size: 11px; color: rgba(255,255,255,0.7); margin: 0 0 3px; }
.bank-row:last-child { margin-bottom: 0; }
.bank-row strong { color: white; }
.success-msg {
  display: flex; align-items: center; gap: 8px;
  background: rgba(47,245,139,0.1); border: 1px solid rgba(47,245,139,0.3);
  border-radius: 8px; padding: 10px 12px;
  color: #2ff58b; font-size: 13px; font-weight: 600;
  margin-bottom: 10px;
}
.pay-btn {
  width: 100%; padding: 12px; border-radius: 10px; border: none;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  color: #0d0e11; font-size: 14px; font-weight: 800;
  cursor: pointer; transition: opacity 0.2s; margin-bottom: 8px;
}
.pay-btn:hover:not(:disabled) { opacity: 0.9; }
.pay-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.terms-note { font-size: 9px; color: rgba(255,255,255,0.3); text-align: center; margin: 0; }

@media (max-width: 400px) {
  .modal-box { padding: 18px 12px 14px; border-radius: 14px; }
  .modal-title { font-size: 16px; }
  .plan-price { font-size: 11px; }
}
</style>
