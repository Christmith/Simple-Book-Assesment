<template>
  <div
    class="min-h-screen font-sora flex items-center justify-center bg-gray-50 p-10"
  >
    <div
      class="flex w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden p-8"
    >
      <div class="w-full">
        <h2 class="text-3xl font-black text-gray-800 mb-4">Reset Password</h2>
        <p class="text-gray-600 text-sm mb-6">
          Enter your email address to receive a password reset link.
        </p>

        <!-- Error or Success Message -->
        <div
          v-if="resetMessage"
          class="mb-4 p-4 text-sm rounded-md"
          :class="{
            'text-green-700 bg-green-100': isSuccess,
            'text-red-700 bg-red-100': !isSuccess,
          }"
        >
          {{ resetMessage }}
        </div>

        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-500"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>

        <!-- Reset Password Button -->
        <button
          @click="sendPasswordReset"
          class="w-full py-2 text-white font-semibold rounded-md transition bg-purple-500 hover:bg-purple-600"
        >
          Send Reset Link
        </button>

        <!-- Sign In Link -->
        <p class="mt-6 text-center text-sm text-gray-600">
          Remembered your password?
          <router-link to="/signin" class="text-purple-500 hover:underline"
            >Sign In</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default {
  name: "ResetPassword",
  setup() {
    const email = ref("");
    const resetMessage = ref("");
    const isSuccess = ref(false);

    const sendPasswordReset = async () => {
      // Regex pattern to match a valid email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.value) {
        resetMessage.value = "Please enter your email address.";
        isSuccess.value = false;
        return;
      }

      if (!emailPattern.test(email.value)) {
        resetMessage.value = "Please enter a valid email address.";
        isSuccess.value = false;
        return;
      }

      try {
        await sendPasswordResetEmail(auth, email.value);
        resetMessage.value = "Password reset email sent successfully!";
        isSuccess.value = true;
      } catch (error) {
        console.error("Error sending reset email: ", error.message);
        resetMessage.value =
          "Failed to send reset email. Please check your email address.";
        isSuccess.value = false;
      }
    };

    return {
      email,
      resetMessage,
      isSuccess,
      sendPasswordReset,
    };
  },
};
</script>

<style scoped></style>
