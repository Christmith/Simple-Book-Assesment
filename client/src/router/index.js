import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { store } from "../store"; // Import the store directly
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import ResetPassword from "../views/ResetPassword.vue";

const routes = [
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn },
  { path: "/admin", component: AdminDashboard, meta: { requiresAuth: true } },
  { path: "/reset-password", component: ResetPassword },
  { path: "/", redirect: "/signin" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const auth = getAuth();

// Use a navigation guard with onAuthStateChanged
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Using Firebase's onAuthStateChanged to get real-time authentication state
  new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (requiresAuth && !user) {
        next("/signin"); // Redirect to SignIn if not authenticated
      } else if (user && to.path === "/signin" && store.state.justSignedUp) {
        next(); // Proceed to route if just signed up
      } else if (user && (to.path === "/signin" || to.path === "/signup")) {
        next("/admin"); // Redirect to Admin if already logged in and trying to access auth pages
      } else {
        next(); // Proceed to route
      }
    });
  });
});

export default router;
