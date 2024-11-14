<template>
  <div
    class="min-h-screen font-sora flex items-center justify-center bg-gray-50 p-10"
  >
    <div
      class="flex w-full max-w-5xl min-h-[500px] bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <!-- Left Section: Gradient and Welcome Message -->
      <div
        class="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 text-white p-10"
      >
        <div class="text-center">
          <h1 class="text-4xl font-bold">Welcome Back!</h1>
          <p class="mt-4">We're glad to see you again.</p>
        </div>
      </div>

      <!-- Right Section: Form -->
      <div class="w-full md:w-1/2 p-10">
        <h2 class="text-3xl font-black text-gray-800 mb-2">Login</h2>
        <p class="text-gray-600 text-sm mb-6">
          Welcome back! Please login to your account.
        </p>

        <!-- Error Dialog Box -->
        <div
          v-if="errorMessage"
          class="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-md"
        >
          {{ errorMessage }}
        </div>

        <div class="mb-4">
          <label
            for="email"
            class="block text-sm text-left font-medium text-gray-500"
            >User Name</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="username@gmail.com"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
          />
          <p v-if="!isEmailValid && email" class="text-sm text-red-500 mt-1">
            Please enter a valid email address
          </p>
        </div>

        <div class="mb-4">
          <label
            for="password"
            class="block text-sm text-left font-medium text-gray-500"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="********"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>

        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              id="remember"
              v-model="rememberMe"
              class="text-purple-500 focus:ring-0 rounded-sm mr-2 checked:bg-purple-500"
            />
            Remember Me
          </label>
          <router-link
            to=/reset-password
            class="text-sm text-purple-500 hover:underline"
            >Forgot Password?</router-link
          >
        </div>

        <!-- Login Button -->
        <button
          @click="signIn"
          :disabled="isLoginDisabled"
          class="w-full py-2 text-white font-semibold rounded-md transition"
          :class="
            isLoginDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600'
          "
        >
          Login
        </button>

        <p class="mt-6 text-center text-sm text-gray-600">
          New User?
          <router-link to="/signup" class="text-purple-500 hover:underline"
            >Sign up here</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);
    const errorMessage = ref("");
    const router = useRouter();
    const store = useStore();

    // Email validation using regex
    const isEmailValid = computed(() =>
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
    );

    // Disable button if email is invalid or fields are empty
    const isLoginDisabled = computed(() => {
      return !isEmailValid.value || !email.value || !password.value;
    });

    const signIn = async () => {
      try {
        // Set persistence based on "Remember Me" checkbox value
        const persistence = rememberMe.value
          ? browserLocalPersistence
          : browserSessionPersistence;
        await setPersistence(auth, persistence);

        // Sign in the user
        await signInWithEmailAndPassword(auth, email.value, password.value);

        // Reset the `justSignedUp` state after redirection
        store.dispatch("resetSignUp");

        // Redirect to the admin dashboard
        router.push("/admin");
      } catch (error) {
        console.error("Error signing in: ", error.message);
        errorMessage.value =
          "Failed to sign in. Please check your credentials.";
        setTimeout(() => {
          errorMessage.value = "";
        }, 5000);
      }
    };

    return {
      email,
      password,
      signIn,
      rememberMe,
      isEmailValid,
      errorMessage,
      isLoginDisabled,
    };
  },
};

</script>

<style scoped></style>
