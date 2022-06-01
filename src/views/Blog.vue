<template>
  <div class="blog">
    <div class="container">
      <h1 class="text-green shadows-font">Blog</h1>
      <hr />
      <BlogList />
    </div>
  </div>
</template>
<script>
import BlogList from "@/components/BlogList.vue";

export default {
  name: "Blog",
  components: { BlogList },
};
</script>

<style scoped>
</style>