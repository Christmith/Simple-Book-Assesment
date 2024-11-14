<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ title }}</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <div class="flex justify-center gap-4">
        <button
          @click="onCancel"
          class="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-md transition duration-300"
        >
          Cancel
        </button>
        <button
          @click="onConfirm"
          class="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  emits: ["confirm", "cancel"],
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped></style>
