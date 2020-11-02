<template>
  <div class="text-right">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          @click="newCategoryButtonClick"
        >
          Add New Category
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ isEditMode() ? "Edit" : "Create" }} Category
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Category name"
            :rules="rules"
            hide-details="auto"
            v-model="name"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="isEditMode() ? editCategory() : createCategory()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EventBus from "../event-bus";

export default {
  data() {
    return {
      dialog: false,
      name: "",
      categories: null,
      mode: "create",
      currentEditCategory: null,
      rules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    newCategoryButtonClick() {
      this.dialog = false;
      this.mode = "create";
      this.dialog = true;
      console.log(this.isEditMode());
    },
    createCategory() {
      this.categories.push({
        name: this.name,
        createdAt: Date.now(),
      });

      this.set("categories", this.categories);
      this.$emit("addedCategory", this.categories);

      this.dialog = false;
      this.name = null;
    },
    editCategory() {
      this.categories.forEach((element, index) => {
        if (element.createdAt === this.currentEditCategory.createdAt) {
          this.categories[index].name = this.name;
        }
      });
      this.set("categories", this.categories);
      this.dialog = false;
      this.name = null;
      this.$emit("editedCategory", this.categories);
      this.mode = "create";
    },
    isEditMode() {
      return !!(this.mode === "edit");
    },
  },
  created() {
    if (this.get("categories")) {
      this.categories = this.get("categories");
    } else {
      this.set("categories", []);
    }

    EventBus.$on("editThisCategory", (args) => {
      this.dialog = true;
      this.mode = "edit";
      this.currentEditCategory = this.categories.find(
        (value) => value.createdAt === args.createdAt
      );
      this.name = this.currentEditCategory.name;
    });

    EventBus.$on("deleteThisCategory", (args) => {
      if (confirm("Are you sure to delete this?")) {
        this.categories = this.categories.filter(
          (value) => value.createdAt !== args.createdAt
        );
        this.set("categories", this.categories);
        this.$emit("deletedCategory", this.categories);
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