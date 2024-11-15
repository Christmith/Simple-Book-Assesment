<template>
  <div
    v-if="showDialog"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white p-6 rounded-lg max-w-xl w-full shadow-lg">
      <h2 class="text-xl font-semibold mb-4">{{ dialogTitle }}</h2>

      <!-- Two-column layout with grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select v-model="category" id="category" class="p-2 border w-full">
          <option value="" disabled>Select Category</option>
          <option id="electronics" value="Electronics">Electronics</option>
          <option id="clothing" value="Clothing">Clothing</option>
          <option id="food" value="Food">Food</option>
        </select>

        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Product Name"
          class="p-2 border w-full"
        />

        <input
          type="text"
          id="brand"
          v-model="brand"
          placeholder="Brand"
          class="p-2 border w-full"
        />

        <select v-model="status" class="p-2 border w-full">
          <option id="available" value="Available">Available</option>
          <option id="unavailable" value="Unavailable">Unavailable</option>
        </select>

        <input
          type="number"
          id="price"
          v-model="price"
          placeholder="Price"
          class="p-2 border w-full mb-4"
        />

        <input
          type="number"
          id="quantity"
          v-model="quantity"
          placeholder="Stock Quantity"
          class="p-2 border w-full mb-4"
        />
      </div>

      <textarea
        id="description"
        v-model="description"
        placeholder="Description"
        class="mb-2 p-2 border w-full"
        rows="3"
      ></textarea>

      <input
        id="image"
        type="file"
        accept="image/*"
        @change="onFileChange"
        class="mb-4 p-2 border w-full"
      />

      <!-- Submit and Close Buttons -->
      <button
        @click="handleSubmit"
        :disabled="!isFormValid"
        class="w-full py-2 mb-2 text-white font-semibold rounded-md transition bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ dialogButtonText }}
      </button>
      <button
        @click="closeDialog"
        class="w-full py-2 text-white font-semibold rounded-md transition bg-gray-500 hover:bg-gray-600"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { uploadImage } from "@/util/uploadService";

export default {
  name: "ProductDialog",
  props: {
    showDialog: Boolean,
    dialogTitle: String,
    dialogButtonText: String,
    product: Object,
  },

  data() {
    return {
      category: this.product?.category || "",
      name: this.product?.name || "",
      brand: this.product?.brand || "",
      status: this.product?.status || "Available",
      price: this.product?.price || "",
      quantity: this.product?.quantity || "",
      description: this.product?.description || "",
      imageUrl: this.product?.imageUrl || "",
    };
  },

  computed: {
    // Checks if all fields are filled (excluding image)
    isFormValid() {
      return (
        this.category &&
        this.name &&
        this.brand &&
        this.status &&
        this.price &&
        this.description
      );
    },
  },

  watch: {
    product: {
      handler(newProduct) {
        if (newProduct) {
          this.category = newProduct.category || "";
          this.name = newProduct.name || "";
          this.brand = newProduct.brand || "";
          this.status = newProduct.status || "Available";
          this.price = newProduct.price || "";
          this.quantity = newProduct.quantity || "";
          this.description = newProduct.description || "";
          this.imageUrl = newProduct.imageUrl || "";
        }
      },
      immediate: true,
    },
  },

  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
        uploadImage(file)
          .then((url) => {
            this.imageUrl = url;
            console.log("Image uploaded successfully:", url);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      }
    },

    handleSubmit() {
      const product = {
        category: this.category,
        name: this.name,
        brand: this.brand,
        status: this.status,
        price: this.price,
        quantity: this.quantity,
        description: this.description,
        imageUrl: this.imageUrl,
      };
      this.$emit("submit", product);
      this.resetForm();
      this.closeDialog();
      console.log(product);
    },

    closeDialog() {
      this.$emit("close");
    },

    resetForm() {
      this.category = "";
      this.name = "";
      this.brand = "";
      this.status = "Available";
      this.price = "";
      this.quantity = "";
      this.description = "";
      this.imageUrl = "";
    },
  },
};
</script>

<style scoped></style>
