<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <mcv-loading v-if="isLoading" />
    <div class="tag-list">
      <router-link
        v-for="tag in popularTags"
        :key="tag"
        :to="{ name: 'tag', params: { slug: tag } }"
        class="tag-default tag-pill"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import McvLoading from "@/components/Loading";
export default {
  name: "McvPopularTags",
  components: {
    McvLoading,
  },
  computed: {
    popularTags() {
      return this.$store.state.popularTags.data;
    },
    isLoading() {
      return this.$store.state.popularTags.isLoading;
    },
  },
  mounted() {
    this.$store.dispatch("getPopularTags");
  },
};
</script>

<style>
</style>