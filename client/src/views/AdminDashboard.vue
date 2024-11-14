<template>
  <div class="min-h-screen font-sora bg-gray-50">
    <!-- Top Navigation Bar -->
    <div class="bg-white text-gray-800 flex justify-between items-center p-6">
      <div class="text-lg font-bold text-purple-600">SimpleBooks</div>
      <div
        class="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-400"
      >
        Hello, {{ username }}!
      </div>
      <button
        @click="signOut"
        class="bg-orange-400 hover:bg-orange-600 text-white py-2 px-6 rounded-md shadow-md transition duration-300"
      >
        Log Out
      </button>
    </div>

    <!-- Filters Section -->
    <div class="p-6">
      <div class="border border-purple-500 rounded-lg p-6 bg-white shadow-md">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Filter Products
        </h2>
        <div class="grid grid-cols-4 gap-6 items-center">
          <div>
            <input
              id="productName"
              type="text"
              v-model="filter.name"
              placeholder="Search by Product Name"
              class="w-full p-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <select
              id="category"
              v-model="filter.category"
              class="w-full p-2 mt-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <div>
            <select
              id="status"
              v-model="filter.status"
              class="w-full p-2 mt-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <button
              @click="clearFilters"
              class="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md shadow-md transition duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Catalogue Management Section -->
    <div class="px-6 py-0 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-purple-500">
        Product Catalogue Management
      </h2>
      <button
        @click="openCreateDialog"
        class="w-full sm:w-1/4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md shadow-md transition duration-300"
      >
        Add New Product
      </button>
    </div>

    <!-- Product Table -->
    <div class="flex justify-center p-6">
      <div
        class="border border-purple-500 w-full bg-white rounded-lg p-6 overflow-auto shadow-md"
      >
        <h2 class="text-xl font-black text-gray-800 mb-6">Product Catalogue</h2>
        <table class="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="px-4 py-2 border-b text-left">Name</th>
              <th class="px-4 py-2 border-b text-left">Category</th>
              <th class="px-4 py-2 border-b text-left">Brand</th>
              <th class="px-4 py-2 border-b text-left">Status</th>
              <th class="px-4 py-2 border-b text-left">Price</th>
              <th class="px-4 py-2 border-b text-left">Quantity</th>
              <th class="px-4 py-2 border-b text-left">Image</th>
              <th class="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in filteredProducts" :key="index">
              <td class="px-4 py-2 border-b text-left">{{ product.name }}</td>
              <td class="px-4 py-2 border-b text-left">
                {{ product.category }}
              </td>
              <td class="px-4 py-2 border-b text-left">{{ product.brand }}</td>
              <td class="px-4 py-2 border-b text-left">{{ product.status }}</td>
              <td class="px-4 py-2 border-b text-left">
                {{ product.price }} $
              </td>
              <td class="px-4 py-2 border-b text-left">
                {{ product.quantity }}
              </td>
              <td class="px-4 py-2 border-b text-left">
                <img
                  :src="product.imageUrl"
                  alt="Product Image"
                  class="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td class="px-4 py-2 border-b text-left">
                <!-- View Button with Gradient -->
                <button
                  @click="viewProductHandler(product)"
                  class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-2 rounded-md text-sm mr-2 transition duration-300"
                >
                  View
                </button>

                <!-- Update Button with Gradient -->
                <button
                  @click="openUpdateDialog(product)"
                  class="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-2 py-2 rounded-md text-sm mr-2 transition duration-300"
                >
                  Update
                </button>

                <!-- Delete Button with Gradient -->
                <button
                  @click="openDeleteConfirmationDialog(product)"
                  class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-2 py-2 rounded-md text-sm transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Product Dialog -->
    <ProductDialog
      :showDialog="showCreateDialog"
      dialogTitle="ADD NEW PRODUCT"
      dialogButtonText="Add Product"
      @submit="createProductHandler"
      @close="showCreateDialog = false"
    />

    <!-- View Product Dialog -->
    <ViewProductDialog
      :visible="showViewDialog"
      :product="selectedProduct"
      @close="showViewDialog = false"
    />

    <!-- Update Product Dialog -->
    <ProductDialog
      :showDialog="showUpdateDialog"
      dialogTitle="UPDATE PRODUCT"
      dialogButtonText="Update Product"
      :product="selectedProduct"
      @submit="updateProductHandler"
      @close="showUpdateDialog = false"
    />

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      :visible="showDeleteConfirmationDialog"
      title="Delete Product"
      message="Are you sure you want to delete this product?"
      @confirm="deleteProductHandler"
      @cancel="showDeleteConfirmationDialog = false"
    />

    <!-- Message Dialog -->
    <MessageDialog
      :visible="showMessageDialog"
      :messageType="messageType"
      :messageTitle="messageTitle"
      :messageText="messageText"
      @close="showMessageDialog = false"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase";
import ProductDialog from "../components/ProductDialog.vue";
import MessageDialog from "../components/MessageDialog.vue";
import ConfirmationDialog from "../components/ConfirmationDialog.vue";
import ViewProductDialog from "../components/ViewProductDialog.vue";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../lib/productClientRequests";

export default {
  name: "AdminDashboard",
  components: {
    ProductDialog,
    ConfirmationDialog,
    MessageDialog,
    ViewProductDialog,
  },
  setup() {
    // Initialize variables
    const router = useRouter();
    const username = ref("Admin");
    const showCreateDialog = ref(false);
    const showViewDialog = ref(false);
    const showUpdateDialog = ref(false);
    const showDeleteConfirmationDialog = ref(false);
    const showMessageDialog = ref(false);
    const products = ref([]);
    const selectedProduct = ref(null);
    const filter = ref({ name: "", category: "", status: "" });
    const categories = ref(["Electronics", "Clothing", "Food"]);

    // Success/Error Message Dialog States
    const messageType = ref("");
    const messageText = ref("");
    const messageTitle = ref("");

    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        products.value = await getProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    onMounted(() => {
      const user = auth.currentUser;
      if (user) {
        username.value = user.email.split("@")[0];
      }
      fetchProducts();
    });

    // Handlers for product actions
    const openCreateDialog = () => {
      selectedProduct.value = null;
      showCreateDialog.value = true;
    };

    const createProductHandler = async (productData) => {
      try {
        await createProduct(productData);
        showMessageDialog.value = true;
        messageType.value = "success";
        messageTitle.value = "Product Created";
        messageText.value = "Product created successfully!";
        showCreateDialog.value = false;
        fetchProducts();
      } catch (error) {
        showMessageDialog.value = true;
        messageType.value = "error";
        messageTitle.value = "Product Creation Failed";
        messageText.value = "Error creating product!";
        console.error("Error creating product:", error);
      }
    };

    const viewProductHandler = (product) => {
      selectedProduct.value = product;
      showViewDialog.value = true;
    };

    const openUpdateDialog = (product) => {
      selectedProduct.value = { ...product };
      showUpdateDialog.value = true;
    };

    const updateProductHandler = async (productData) => {
      try {
        await updateProduct(selectedProduct.value.id, productData);
        showMessageDialog.value = true;
        messageType.value = "success";
        messageTitle.value = "Product Updated";
        messageText.value = "Product updated successfully!";
        showUpdateDialog.value = false;
        fetchProducts();
      } catch (error) {
        showMessageDialog.value = true;
        messageType.value = "error";
        messageTitle.value = "Product Update Failed";
        messageText.value = "Error updating product!";
        console.error("Error updating product:", error);
      }
    };

    const openDeleteConfirmationDialog = (product) => {
      selectedProduct.value = product;
      showDeleteConfirmationDialog.value = true;
    };

    const deleteProductHandler = async () => {
      try {
        await deleteProduct(selectedProduct.value.id);
        showMessageDialog.value = true;
        messageType.value = "success";
        messageTitle.value = "Product Deleted";
        messageText.value = "Product deleted successfully!";
        fetchProducts();
      } catch (error) {
        showMessageDialog.value = true;
        messageType.value = "error";
        messageTitle.value = "Product Deletion Failed";
        messageText.value = "Error deleting product!";
        console.error("Error deleting product:", error);
      }
      showDeleteConfirmationDialog.value = false;
    };

    const clearFilters = () => {
      filter.value = { name: "", category: "", status: "" };
    };

    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        return (
          (!filter.value.name ||
            product.name
              .toLowerCase()
              .includes(filter.value.name.toLowerCase())) &&
          (!filter.value.category ||
            product.category.toLowerCase() ===
              filter.value.category.toLowerCase()) &&
          (!filter.value.status ||
            product.status.toLowerCase() === filter.value.status.toLowerCase())
        );
      });
    });

    const signOut = async () => {
      try {
        await firebaseSignOut(auth);
        router.push("/signin");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    return {
      username,
      showCreateDialog,
      showUpdateDialog,
      products,
      selectedProduct,
      filter,
      categories,
      createProductHandler,
      updateProductHandler,
      deleteProductHandler,
      viewProductHandler,
      openCreateDialog,
      openUpdateDialog,
      clearFilters,
      filteredProducts,
      signOut,
      showMessageDialog,
      messageType,
      messageText,
      messageTitle,
      showDeleteConfirmationDialog,
      openDeleteConfirmationDialog,
      showViewDialog,
      viewProductHandler,
    };
  },
};
</script>
