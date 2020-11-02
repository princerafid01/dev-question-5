<template>
  <div>
    <h1 class="text-center mt-5">Welcome to this Project</h1>
    <router-link
      class="text-center d-block mt-5 p-3 black--text"
      :to="{ name: 'posts' }"
      >Posts</router-link
    >
    <router-link
      class="text-center d-block mt-5 p-3 black--text"
      :to="{ name: 'Categories' }"
      >Categories</router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>