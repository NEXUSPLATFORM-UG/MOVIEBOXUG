<template>
  <Teleport to="body">
    <div v-if="showAuthModal" class="modal-overlay" @click.self="closeAuthModal">
      <div class="modal-box">
        <button class="modal-close" @click="closeAuthModal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="modal-logo">
          <img src="https://h5-static.aoneroom.com/ssrStatic/mbOfficial/public/_nuxt/web-logo.apJjVir2.svg" alt="MovieBox" class="logo-img" />
          <span class="logo-ug">UG</span>
        </div>

        <div class="tab-row">
          <button class="tab-btn" :class="{ active: authTab === 'login' }" @click="authTab = 'login'">Sign In</button>
          <button class="tab-btn" :class="{ active: authTab === 'register' }" @click="authTab = 'register'">Register</button>
        </div>

        <!-- Login -->
        <form v-if="authTab === 'login'" class="auth-form" @submit.prevent="handleLogin">
          <div v-if="error" class="form-error">{{ error }}</div>
          <div class="field-group">
            <label>Phone Number</label>
            <input v-model="phone" type="tel" placeholder="07XX XXX XXX" required />
          </div>
          <div class="field-group">
            <label>Password</label>
            <input v-model="password" type="password" placeholder="Enter password" required />
          </div>
          <button type="submit" class="submit-btn">Sign In</button>
          <div class="divider"><span>or</span></div>
          <button type="button" class="google-btn" @click="handleGoogle">
            <svg width="17" height="17" viewBox="0 0 48 48" fill="none">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.2-2.7-.5-4z" fill="#4285F4"/>
              <path d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#EA4335"/>
              <path d="M24 45c5.5 0 10.4-1.8 14.3-4.9l-6.6-5.4C29.7 36.5 27 37.5 24 37.5c-5 0-9.3-3.4-10.8-8l-7 5.4C9.8 41.4 16.4 45 24 45z" fill="#34A853"/>
              <path d="M44.5 20H24v8.5h11.8c-.8 2.5-2.5 4.6-4.7 6l6.6 5.4C41.2 36.3 44.5 31.1 44.5 24c0-1.3-.2-2.7-.5-4z" fill="#FBBC04"/>
            </svg>
            Continue with Google
          </button>
          <p class="switch-link">Don't have an account? <button type="button" @click="authTab = 'register'">Register</button></p>
        </form>

        <!-- Register -->
        <form v-else class="auth-form" @submit.prevent="handleRegister">
          <div v-if="error" class="form-error">{{ error }}</div>
          <div class="field-group">
            <label>Full Name</label>
            <input v-model="name" type="text" placeholder="Your full name" required />
          </div>
          <div class="field-group">
            <label>Phone Number</label>
            <input v-model="phone" type="tel" placeholder="07XX XXX XXX" required />
          </div>
          <div class="field-group">
            <label>Password</label>
            <input v-model="password" type="password" placeholder="Create a password (min 6 chars)" required minlength="6" />
          </div>
          <button type="submit" class="submit-btn">Create Account</button>
          <div class="divider"><span>or</span></div>
          <button type="button" class="google-btn" @click="handleGoogle">
            <svg width="17" height="17" viewBox="0 0 48 48" fill="none">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.2-2.7-.5-4z" fill="#4285F4"/>
              <path d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#EA4335"/>
              <path d="M24 45c5.5 0 10.4-1.8 14.3-4.9l-6.6-5.4C29.7 36.5 27 37.5 24 37.5c-5 0-9.3-3.4-10.8-8l-7 5.4C9.8 41.4 16.4 45 24 45z" fill="#34A853"/>
              <path d="M44.5 20H24v8.5h11.8c-.8 2.5-2.5 4.6-4.7 6l6.6 5.4C41.2 36.3 44.5 31.1 44.5 24c0-1.3-.2-2.7-.5-4z" fill="#FBBC04"/>
            </svg>
            Continue with Google
          </button>
          <p class="switch-link">Already have an account? <button type="button" @click="authTab = 'login'">Sign In</button></p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../stores/useAuth";

const { showAuthModal, authTab, closeAuthModal, login, register } = useAuth();

const name = ref("");
const phone = ref("");
const password = ref("");
const error = ref("");

function handleLogin() {
  error.value = "";
  const ok = login(phone.value.trim(), password.value);
  if (!ok) error.value = "Invalid phone number or password.";
  else { phone.value = ""; password.value = ""; }
}

function handleRegister() {
  error.value = "";
  const ok = register(name.value.trim(), phone.value.trim(), password.value);
  if (!ok) error.value = "Phone number already registered.";
  else { name.value = ""; phone.value = ""; password.value = ""; }
}

function handleGoogle() {
  const demoUser = { id: "g-1", name: "Google User", phone: "google-user", role: "user" as const };
  localStorage.setItem("mbug_auth_user", JSON.stringify(demoUser));
  window.location.reload();
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.75);
  display: flex; align-items: center; justify-content: center;
  padding: 12px;
  backdrop-filter: blur(4px);
  overflow-y: auto;
}
.modal-box {
  background: #1a1c22;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 22px 18px 18px;
  width: 100%; max-width: 360px;
  position: relative;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6);
  margin: auto;
}
.modal-close {
  position: absolute; top: 12px; right: 12px;
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(255,255,255,0.08); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.modal-logo {
  display: flex; align-items: center; justify-content: center; gap: 4px;
  margin-bottom: 16px;
}
.logo-img { height: 20px; }
.logo-ug {
  font-size: 12px; font-weight: 800;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tab-row {
  display: flex; gap: 0;
  background: rgba(255,255,255,0.05); border-radius: 8px; padding: 3px;
  margin-bottom: 16px;
}
.tab-btn {
  flex: 1; padding: 7px; border-radius: 6px;
  border: none; background: none;
  color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.15s;
}
.tab-btn.active { background: rgba(255,255,255,0.1); color: white; }
.auth-form { display: flex; flex-direction: column; gap: 12px; }
.form-error {
  background: rgba(255,59,48,0.12); border: 1px solid rgba(255,59,48,0.3);
  border-radius: 8px; padding: 9px 12px;
  font-size: 12px; color: #ff6b6b;
}
.field-group { display: flex; flex-direction: column; gap: 4px; }
.field-group label { font-size: 11px; color: rgba(255,255,255,0.55); font-weight: 500; }
.field-group input {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
  padding: 10px 12px; color: white; font-size: 13px; outline: none;
  transition: border-color 0.2s;
}
.field-group input:focus { border-color: rgba(28,183,255,0.5); }
.field-group input::placeholder { color: rgba(255,255,255,0.3); }
.submit-btn {
  padding: 11px; border-radius: 8px; border: none;
  background: linear-gradient(91deg, #1cb7ff, #2ff58b);
  color: #101114; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: opacity 0.2s;
}
.submit-btn:hover { opacity: 0.9; }
.divider {
  display: flex; align-items: center; gap: 10px;
  color: rgba(255,255,255,0.25); font-size: 11px;
}
.divider::before, .divider::after {
  content: ""; flex: 1; height: 1px; background: rgba(255,255,255,0.1);
}
.google-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px; border-radius: 8px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: white; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: background 0.2s;
}
.google-btn:hover { background: rgba(255,255,255,0.11); }
.switch-link {
  text-align: center; font-size: 11px; color: rgba(255,255,255,0.45); margin: 0;
}
.switch-link button {
  background: none; border: none; color: #1cb7ff;
  font-size: 11px; font-weight: 600; cursor: pointer;
  text-decoration: underline;
}

@media (max-width: 400px) {
  .modal-box { padding: 18px 14px 14px; border-radius: 12px; }
}
</style>
