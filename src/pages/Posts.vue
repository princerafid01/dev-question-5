<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="text-left float-left">Posts</h1>
        <PostModal
          @addedPost="addedPost"
          @editedPost="editedPost"
          @deletedPost="deletedPost"
        />

        <v-simple-table style="clear: both">
          <template>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Categories</th>
                <th class="text-left">Created At</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in posts" :key="index">
                <td class="text-left">{{ post.name }}</td>
                <td class="text-left">{{ post.categories.join(",") }}</td>
                <td class="text-left w-33">
                  {{ new Date(post.createdAt).toDateString().substr(4) }}
                </td>
                <td class="text-left w-33">
                  <v-btn
                    depressed
                    color="primary"
                    class="mr-5"
                    @click="editPost(post.createdAt)"
                    >Edit</v-btn
                  >
                  <v-btn
                    depressed
                    color="error"
                    @click="deletePost(post.createdAt)"
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
import PostModal from "../components/PostModal.vue";
import EventBus from "../event-bus";

export default {
  name: "Posts",
  components: { PostModal },
  data() {
    return {
      categories: this.get("categories") ? this.get("categories") : [],
      posts: this.get("posts") ? this.get("posts") : [],
    };
  },
  methods: {
    addedPost(posts) {
      this.posts = posts;
    },
    editedPost(posts) {
      this.posts = posts;
    },
    deletedPost(posts) {
      this.posts = posts;
    },
    editPost(createdAt) {
      EventBus.$emit("editThisPost", {
        createdAt,
      });
    },
    deletePost(createdAt) {
      EventBus.$emit("deleteThisPost", {
        createdAt,
      });
    },
  },
};
</script>
