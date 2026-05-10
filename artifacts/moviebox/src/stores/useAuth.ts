import { ref, computed } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, getDocs, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export const ADMIN_EMAIL = "mainplatform.nexus@gmail.com";

export interface AuthUser {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

export interface FirestoreUser {
  uid: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt?: unknown;
  banned?: boolean;
}

const currentUser = ref<AuthUser | null>(null);
const authLoading = ref(true);
const showAuthModal = ref(false);
const authTab = ref<"login" | "register">("login");

onAuthStateChanged(auth, async (fbUser) => {
  if (fbUser) {
    currentUser.value = {
      uid: fbUser.uid,
      name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
      email: fbUser.email || "",
      avatar: fbUser.photoURL || undefined,
      isAdmin: fbUser.email === ADMIN_EMAIL,
    };
  } else {
    currentUser.value = null;
  }
  authLoading.value = false;
});

export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value);
  const isAdmin = computed(() => currentUser.value?.email === ADMIN_EMAIL);

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

  async function login(email: string, password: string): Promise<string | null> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showAuthModal.value = false;
      return null;
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string };
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        return "Invalid email or password.";
      }
      return err.message || "Login failed.";
    }
  }

  async function register(name: string, email: string, password: string): Promise<string | null> {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name,
        email,
        role: email === ADMIN_EMAIL ? "admin" : "user",
        createdAt: serverTimestamp(),
        banned: false,
      } satisfies Omit<FirestoreUser, "createdAt"> & { createdAt: unknown });
      showAuthModal.value = false;
      return null;
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string };
      if (err.code === "auth/email-already-in-use") return "Email already registered.";
      if (err.code === "auth/weak-password") return "Password must be at least 6 characters.";
      return err.message || "Registration failed.";
    }
  }

  async function loginWithGoogle(): Promise<string | null> {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", cred.user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: cred.user.uid,
          name: cred.user.displayName || "User",
          email: cred.user.email || "",
          role: cred.user.email === ADMIN_EMAIL ? "admin" : "user",
          createdAt: serverTimestamp(),
          banned: false,
        });
      }
      showAuthModal.value = false;
      return null;
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string };
      if (err.code === "auth/popup-closed-by-user") return null;
      return err.message || "Google login failed.";
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function getAllUsers(): Promise<FirestoreUser[]> {
    try {
      const snap = await getDocs(collection(db, "users"));
      return snap.docs.map((d) => d.data() as FirestoreUser);
    } catch {
      return [];
    }
  }

  async function updateUserRole(uid: string, role: "user" | "admin") {
    await updateDoc(doc(db, "users", uid), { role });
  }

  async function banUser(uid: string) {
    await deleteDoc(doc(db, "users", uid));
  }

  return {
    currentUser,
    authLoading,
    isLoggedIn,
    isAdmin,
    showAuthModal,
    authTab,
    openLogin,
    openRegister,
    closeAuthModal,
    login,
    register,
    loginWithGoogle,
    logout,
    getAllUsers,
    updateUserRole,
    banUser,
  };
}
