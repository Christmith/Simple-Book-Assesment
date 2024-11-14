<template>
  <div
    v-if="showDialog"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white p-6 rounded-lg max-w-xl w-full shadow-lg">
      <h2 class="text-xl font-semibold mb-4">{{ dialogTitle }}</h2>

      <!-- Two-column layout with grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Category Dropdown with Placeholder -->
        <select v-model="category" id="category" class="p-2 border w-full">
          <option value="" disabled>Select Category</option>
          <option id="electronics" value="Electronics">Electronics</option>
          <option id="clothing" value="Clothing">Clothing</option>
          <option id="food" value="Food">Food</option>
        </select>

        <!-- Name Input -->
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Product Name"
          class="p-2 border w-full"
        />

        <!-- Brand Input -->
        <input
          type="text"
          id="brand"
          v-model="brand"
          placeholder="Brand"
          class="p-2 border w-full"
        />

        <!-- Status Dropdown -->
        <select v-model="status" class="p-2 border w-full">
          <option id="available" value="Available">Available</option>
          <option id="unavailable" value="Unavailable">Unavailable</option>
        </select>

        <!-- Price Input -->
        <input
          type="number"
          id="price"
          v-model="price"
          placeholder="Price"
          class="p-2 border w-full mb-4"
        />

        <!-- Stock Quantity Input -->
        <input
          type="number"
          id="quantity"
          v-model="quantity"
          placeholder="Stock Quantity"
          class="p-2 border w-full mb-4"
        />
      </div>

      <!-- Description Textarea -->
      <textarea
        id="description"
        v-model="description"
        placeholder="Description"
        class="mb-2 p-2 border w-full"
        rows="3"
      ></textarea>

      <!-- Image Upload Input -->
      <input
        id="image"
        type="file"
        @change="onFileChange"
        class="mb-4 p-2 border w-full"
      />

      <!-- Submit and Close Buttons -->
      <button
        @click="handleSubmit"
        class="w-full py-2 mb-2 text-white font-semibold rounded-md transition bg-purple-500 hover:bg-purple-600"
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
    product: Object, // Prop to receive product data for updating
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

  watch: {
    // Watch for changes in the passed product prop
    product: {
      handler(newProduct) {
        // Reset data if a product is provided for editing
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
      immediate: true, // Ensure the watcher runs immediately when the component is created
    },
  },

  methods: {
    // Handle file change event
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file); // Preview the image locally

        // Upload the image to Firebase
        uploadImage(file)
          .then((url) => {
            this.imageUrl = url; // Set the image URL from Firebase
            console.log("Image uploaded successfully:", url);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      }
    },

    // Emit the form data to the parent component on submit and reset the form and close the dialog
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

    // Close the dialog
    closeDialog() {
      this.$emit("close");
    },

    // Reset the form fields
    resetForm() {
      this.category = "";
      this.name = "";
      this.brand = "";
      this.status = "available";
      this.price = "";
      this.quantity = "";
      this.description = "";
      this.imageUrl = "";
    },
  },
};
</script>

<style scoped></style>
