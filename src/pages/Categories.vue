<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="text-left float-left">Categories</h1>
        <CategoryModal
          @addedCategory="addedCategory"
          @editedCategory="editedCategory"
          @deletedCategory="deletedCategory"
        />

        <v-simple-table style="clear: both">
          <template>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Created At</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, index) in categories" :key="index">
                <td class="text-left">{{ category.name }}</td>
                <td class="text-left w-33">
                  {{ new Date(category.createdAt).toDateString().substr(4) }}
                </td>
                <td class="text-left w-33">
                  <v-btn
                    depressed
                    color="primary"
                    class="mr-5"
                    @click="editCategory(category.createdAt)"
                    >Edit</v-btn
                  >
                  <v-btn
                    depressed
                    color="error"
                    @click="deleteCategory(category.createdAt)"
                  >
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoryModal from "../components/CategoryModal.vue";
import EventBus from "../event-bus";

export default {
  name: "Categories",
  components: { CategoryModal },
  data() {
    return {
      categories: this.get("categories") ? this.get("categories") : [],
    };
  },
  methods: {
    addedCategory(categories) {
      this.categories = categories;
    },
    editedCategory(categories) {
      this.categories = categories;
    },
    deletedCategory(categories) {
      this.categories = categories;
    },
    editCategory(createdAt) {
      EventBus.$emit("editThisCategory", {
        createdAt,
      });
    },
    deleteCategory(createdAt) {
      EventBus.$emit("deleteThisCategory", {
        createdAt,
      });
    },
  },
};
</script>

<style scoped>
.w-33 {
  width: 33%;
}
</style>
