<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>WeDevs</h1>

      <v-spacer></v-spacer>
      <router-link :to="{ name: 'posts' }" class="white--text text-bold pr-4"
        >Posts</router-link
      >
      <router-link
        :to="{ name: 'categories' }"
        class="white--text text-bold pr-4"
        >Categories</router-link
      >
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({}),
};
</script>
