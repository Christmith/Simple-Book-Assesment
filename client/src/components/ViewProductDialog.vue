<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
  >
    <div
      class="flex w-full max-w-4xl min-h-[500px] bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <!-- Left Section: Product Image -->
      <div
        class="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 text-white p-10"
      >
        <img
          :src="product.imageUrl"
          alt="Product Image"
          class="w-3/4 h-3/4 object-cover rounded-lg shadow-lg"
        />
      </div>

      <!-- Right Section: Product Details -->
      <div class="w-full md:w-1/2 p-10 relative flex flex-col">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          {{ product.name }}
        </h1>
        <h2 class="text-xl text-gray-600 mb-6">{{ product.category }}</h2>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-500">Brand</label>
            <p class="text-gray-800">{{ product.brand }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500">Price</label>
            <p class="text-gray-800">${{ product.price }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500"
              >Quantity</label
            >
            <p class="text-gray-800">{{ product.quantity }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500"
              >Status</label
            >
            <p
              :class="
                product.status === 'Available'
                  ? 'text-green-600'
                  : 'text-red-600'
              "
            >
              {{ product.status }}
            </p>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-500"
            >Description</label
          >
          <p class="text-gray-800">{{ product.description }}</p>
        </div>

        <button
          @click="close"
          class="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewProductDialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 24px;
}
</style>
