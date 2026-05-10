import { ref, computed } from "vue";

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  role: "user" | "admin";
}

const STORAGE_KEY = "mbug_auth_user";

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const currentUser = ref<AuthUser | null>(loadUser());
const showAuthModal = ref(false);
const authTab = ref<"login" | "register">("login");

export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value);
  const isAdmin = computed(() => currentUser.value?.role === "admin");

  function openLogin() {
    authTab.value = "login";
    showAuthModal.value = true;
  }

  function openRegister() {
    authTab.value = "register";
    showAuthModal.value = true;
  }

  function closeAuthModal() {
    showAuthModal.value = false;
  }

  function login(phone: string, _password: string): boolean {
    const users = getAllUsers();
    const user = users.find((u) => u.phone === phone);
    if (!user) return false;
    currentUser.value = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    showAuthModal.value = false;
    return true;
  }

  function register(name: string, phone: string, _password: string): boolean {
    const users = getAllUsers();
    if (users.find((u) => u.phone === phone)) return false;
    const newUser: AuthUser = {
      id: Date.now().toString(),
      name,
      phone,
      role: "user",
    };
    users.push(newUser);
    localStorage.setItem("mbug_users", JSON.stringify(users));
    currentUser.value = newUser;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    showAuthModal.value = false;
    return true;
  }

  function logout() {
    currentUser.value = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  function getAllUsers(): AuthUser[] {
    try {
      const raw = localStorage.getItem("mbug_users");
      const users: AuthUser[] = raw ? JSON.parse(raw) : [];
      if (!users.find((u) => u.phone === "0700000000")) {
        users.push({ id: "admin-1", name: "Admin", phone: "0700000000", role: "admin" });
        localStorage.setItem("mbug_users", JSON.stringify(users));
      }
      return users;
    } catch {
      return [];
    }
  }

  return {
    currentUser,
    isLoggedIn,
    isAdmin,
    showAuthModal,
    authTab,
    openLogin,
    openRegister,
    closeAuthModal,
    login,
    register,
    logout,
    getAllUsers,
  };
}
