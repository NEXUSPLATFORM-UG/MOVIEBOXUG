<template>
  <Teleport to="body">
    <div v-if="showSubModal" class="modal-overlay" @click.self="closeSubModal">
      <div class="modal-box">
        <button class="modal-close" @click="closeSubModal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="modal-header">
          <div class="crown-icon">👑</div>
          <h2 class="modal-title">Premium Access</h2>
          <p class="modal-sub">Unlock all movies, series & downloads</p>
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
              <span class="method-icon">{{ method.icon }}</span>
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
              <div class="card-field">
                <label>CVV</label>
                <input v-model="cardCvv" type="password" placeholder="123" maxlength="3" />
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

        <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>

        <button class="pay-btn" @click="handlePay" :disabled="!selectedPlan || !selectedMethod">
          {{ payBtnLabel }}
        </button>

        <p class="terms-note">By subscribing you agree to our Terms of Service. Cancel anytime.</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSubscription, subscriptionPlans } from "../stores/useSubscription";
import { useAuth } from "../stores/useAuth";

const { showSubModal, closeSubModal, subscribe } = useSubscription();
const { currentUser } = useAuth();

const plans = subscriptionPlans;
const selectedPlan = ref("1week");
const selectedMethod = ref("mobile-money");
const payPhone = ref("");
const cardNum = ref("");
const cardExp = ref("");
const cardCvv = ref("");
const successMsg = ref("");

const paymentMethods = [
  { id: "mobile-money", name: "Mobile Money", icon: "📱" },
  { id: "card", name: "Card", icon: "💳" },
  { id: "bank", name: "Bank Transfer", icon: "🏦" },
];

const payRef = computed(() => `MBUG-${Date.now().toString().slice(-6)}`);

const selectedPlanObj = computed(() => plans.find((p) => p.id === selectedPlan.value));

const payBtnLabel = computed(() => {
  if (!selectedPlanObj.value) return "Select a plan";
  return `Pay UGX ${selectedPlanObj.value.price.toLocaleString()}`;
});

function handlePay() {
  if (!selectedPlan.value || !selectedMethod.value) return;
  subscribe(selectedPlan.value, currentUser.value?.id ?? "guest");
  successMsg.value = "🎉 Subscription activated! Enjoy unlimited access.";
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
  padding: 16px; backdrop-filter: blur(4px);
  overflow-y: auto;
}
.modal-box {
  background: #1a1c22;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 28px 20px 24px;
  width: 100%; max-width: 420px;
  position: relative;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6);
}
.modal-close {
  position: absolute; top: 14px; right: 14px;
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.08); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.modal-header { text-align: center; margin-bottom: 20px; }
.crown-icon { font-size: 36px; margin-bottom: 8px; }
.modal-title { font-size: 22px; font-weight: 800; color: white; margin: 0 0 4px; }
.modal-sub { font-size: 13px; color: rgba(255,255,255,0.5); margin: 0; }

.plans-row { display: flex; gap: 8px; margin-bottom: 20px; }
.plan-card {
  flex: 1; padding: 14px 8px; border-radius: 12px;
  border: 1.5px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  cursor: pointer; text-align: center; position: relative;
  transition: all 0.15s;
}
.plan-card.selected {
  border-color: #1cb7ff;
  background: rgba(28,183,255,0.1);
}
.plan-card.popular {
  border-color: #2ff58b;
}
.plan-card.popular.selected {
  border-color: #2ff58b;
  background: rgba(47,245,139,0.1);
}
.popular-tag {
  position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  color: #0d0e11; font-size: 9px; font-weight: 800;
  padding: 2px 8px; border-radius: 10px; white-space: nowrap;
}
.plan-label { font-size: 12px; font-weight: 700; color: white; margin-bottom: 6px; }
.plan-price { font-size: 13px; font-weight: 800; color: #2ff58b; }
.plan-dur { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 2px; }

.payment-section { margin-bottom: 16px; }
.payment-label { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 600; margin: 0 0 10px; }
.payment-methods { display: flex; gap: 8px; margin-bottom: 14px; }
.method-btn {
  flex: 1; padding: 10px 6px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  cursor: pointer; display: flex; flex-direction: column;
  align-items: center; gap: 4px; transition: all 0.15s;
}
.method-btn.selected {
  border-color: #1cb7ff;
  background: rgba(28,183,255,0.1);
}
.method-icon { font-size: 20px; }
.method-name { font-size: 10px; color: rgba(255,255,255,0.7); font-weight: 600; }
.payment-form { display: flex; flex-direction: column; gap: 10px; }
.payment-form label { font-size: 11px; color: rgba(255,255,255,0.5); }
.payment-form input {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
  padding: 10px 12px; color: white; font-size: 13px; outline: none;
}
.payment-form input:focus { border-color: rgba(28,183,255,0.4); }
.card-row { display: flex; gap: 8px; }
.card-field { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.pay-note { font-size: 11px; color: rgba(255,255,255,0.35); margin: 0; }
.bank-details {
  background: rgba(255,255,255,0.04); border-radius: 8px; padding: 12px;
}
.bank-row { font-size: 12px; color: rgba(255,255,255,0.7); margin: 0 0 4px; }
.bank-row:last-child { margin-bottom: 0; }
.bank-row strong { color: white; }
.success-msg {
  background: rgba(47,245,139,0.1); border: 1px solid rgba(47,245,139,0.3);
  border-radius: 10px; padding: 12px;
  text-align: center; color: #2ff58b; font-size: 14px; font-weight: 600;
  margin-bottom: 12px;
}
.pay-btn {
  width: 100%; padding: 14px; border-radius: 12px; border: none;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  color: #0d0e11; font-size: 15px; font-weight: 800;
  cursor: pointer; transition: opacity 0.2s; margin-bottom: 10px;
}
.pay-btn:hover:not(:disabled) { opacity: 0.9; }
.pay-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.terms-note { font-size: 10px; color: rgba(255,255,255,0.3); text-align: center; margin: 0; }
</style>
