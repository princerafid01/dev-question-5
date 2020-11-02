<template>
  <div class="text-right">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          @click="newPostButtonClick"
        >
          Add New Post
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ isEditMode() ? "Edit" : "Create" }} Post
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Post Name"
            :rules="rules"
            hide-details="auto"
            v-model="name"
            class="my-5"
          ></v-text-field>
          <v-combobox
            v-model="selectedCategories"
            :items="categories"
            label="Categories"
            multiple
            chips
            class="my-5"
          >
          </v-combobox>
          <CategoryModal
            @addedCategory="addedCategory"
            @newCategoryName="newCategoryName"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="isEditMode() ? editPost() : createPost()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CategoryModal from "../components/CategoryModal.vue";
import EventBus from "../event-bus";

export default {
  components: { CategoryModal },
  data() {
    return {
      dialog: false,
      name: "",
      posts: null,
      categories: null,
      selectedCategories: [],
      mode: "create",
      currentEditPost: null,
      rules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    newPostButtonClick() {
      this.dialog = false;
      this.mode = "create";
      this.dialog = true;
    },
    createPost() {
      this.posts.push({
        name: this.name,
        createdAt: Date.now(),
        categories: this.selectedCategories,
      });

      this.set("posts", this.posts);
      this.$emit("addedPost", this.posts);

      this.dialog = false;
      this.name = null;
      this.selectedCategories = null;
    },
    editPost() {
      this.posts.forEach((element, index) => {
        if (element.createdAt === this.currentEditPost.createdAt) {
          this.posts[index].name = this.name;
          this.posts[index].categories = this.selectedCategories;
        }
      });
      this.set("posts", this.posts);
      this.dialog = false;
      this.name = null;
      this.selectedCategories = null;
      this.$emit("editedPost", this.posts);
      this.mode = "create";
    },
    isEditMode() {
      return !!(this.mode === "edit");
    },
    addedCategory(categories) {
      this.categories =
        categories.length && categories.map((value) => value.name);
    },
    newCategoryName(newCategory) {
      console.log(this.selectedCategories);
      this.selectedCategories && this.selectedCategories.push(newCategory);
    },
  },
  created() {
    this.categories = this.get("categories")
      ? this.get("categories").map((value) => value.name)
      : [];
    this.posts = this.get("posts") || [];

    EventBus.$on("editThisPost", (args) => {
      this.dialog = true;
      this.mode = "edit";
      this.currentEditPost = this.posts.find(
        (value) => value.createdAt === args.createdAt
      );
      this.name = this.currentEditPost.name;
      this.selectedCategories = this.currentEditPost.categories;
    });

    EventBus.$on("deleteThisPost", (args) => {
      if (confirm("Are you sure to delete this?")) {
        this.posts = this.posts.filter(
          (value) => value.createdAt !== args.createdAt
        );
        this.set("posts", this.posts);
        this.$emit("deletedPost", this.posts);
        alert("Deleted Successfully!");
      } else {
        return;
      }
    });
  },
};
</script>

<style>
</style>