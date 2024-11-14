<!-- MessageDialog.vue -->
<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full" @click.stop>
      <h3
        :class="{
          'text-green-600': messageType === 'success',
          'text-red-600': messageType === 'error',
        }"
        class="text-xl font-bold mb-4"
      >
        {{ messageTitle }}
      </h3>
      <p class="mb-6">{{ messageText }}</p>
      <button
        @click="closeDialog"
        class="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 transition duration-300"
      >
        OK!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageDialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    messageType: {
      type: String,
      required: true,
    },
    messageTitle: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped></style>
