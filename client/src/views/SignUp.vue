<template>
  <div
    class="min-h-screen font-sora flex items-center justify-center bg-gray-50 p-10 transition duration-500 ease-in-out"
  >
    <div
      class="flex w-full max-w-5xl min-h-[500px] bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <!-- Left Section: Form -->
      <div class="w-full md:w-1/2 p-10">
        <h2 class="text-3xl font-black text-gray-800 mb-2">Register</h2>
        <p class="text-gray-600 text-sm mb-6">
          Create an account to join our platform.
        </p>

        <!-- Error Dialog Box -->
        <div
          v-if="errorMessage"
          class="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-md"
        >
          {{ errorMessage }}
        </div>

        <!-- Email Input -->
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm text-left font-medium text-gray-500"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
          />
          <p v-if="!isEmailValid && email" class="text-sm text-red-500 mt-1">
            Please enter a valid email address
          </p>
        </div>

        <!-- Password Input -->
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
            placeholder="Enter your password"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
          />
          <p
            v-if="password && password.length < 6"
            class="text-sm text-red-500 mt-1"
          >
            Password must be at least 6 characters long
          </p>
        </div>

        <!-- Confirm Password Input -->
        <div class="mb-4">
          <label
            for="confirmPassword"
            class="block text-sm text-left font-medium text-gray-500"
            >Confirm Password</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
          />
          <p v-if="passwordMismatch" class="text-sm text-red-500 mt-1">
            Passwords do not match
          </p>
        </div>

        <!-- Register Button -->
        <button
          @click="signUp"
          :disabled="isRegisterDisabled"
          class="w-full py-2 text-white font-semibold rounded-md transition"
          :class="
            isRegisterDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600'
          "
        >
          Register
        </button>

        <!-- Sign In Link -->
        <p class="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <router-link
            to="/signin"
            class="text-purple-500 hover:underline transition duration-300 ease-in-out"
          >
            Sign in here
          </router-link>
        </p>
      </div>

      <!-- Right Section: Gradient and Welcome Message -->
      <div
        class="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 text-white p-10"
      >
        <div class="text-center">
          <h1 class="text-4xl font-bold">Welcome!</h1>
          <p class="mt-4">Create your account to get started.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const router = useRouter();
    const store = useStore();

    // Email validation using regex
    const isEmailValid = computed(() =>
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
    );

    // Computed property to check if passwords match
    const passwordMismatch = computed(
      () =>
        password.value !== confirmPassword.value && confirmPassword.value !== ""
    );

    // Disable the Register button if there are validation errors
    const isRegisterDisabled = computed(
      () =>
        passwordMismatch.value ||
        !isEmailValid.value ||
        password.value.length < 6
    );

    // Sign up function
    const signUp = async () => {
      if (isRegisterDisabled.value) {
        console.error("Validation errors");
        return;
      }

      try {
        // Attempt to create the user
        await createUserWithEmailAndPassword(auth, email.value, password.value);

        // Dispatch Vuex action to update `justSignedUp` to true
        store.dispatch("signUp");

        // After successful sign-up, redirect to sign-in page
        router.push({ path: "/signin" });
      } catch (error) {
        console.error("Error signing up: ", error.message);

        // Handle Firebase-specific error messages
        if (error.code === "auth/email-already-in-use") {
          errorMessage.value =
            "This email is already registered. Please try another.";
        } else if (error.code === "auth/weak-password") {
          errorMessage.value =
            "Password is too weak. Please enter a stronger password.";
        } else {
          errorMessage.value = "An error occurred. Please try again.";
        }

        // Clear error message after 5 seconds
        setTimeout(() => {
          errorMessage.value = "";
        }, 5000);
      }
    };

    return {
      email,
      password,
      confirmPassword,
      isEmailValid,
      passwordMismatch,
      isRegisterDisabled,
      signUp,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Optional: Add additional transition or animation styles here if needed */
</style>
