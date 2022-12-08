<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message :message="'foo'" />
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
import McvErrorMessage from "@/components/ErrorMessage";

export default {
  name: "McvPopularTags",
  components: {
    McvLoading,
    McvErrorMessage,
  },
  computed: {
    popularTags() {
      return this.$store.state.popularTags.data;
    },
    isLoading() {
      return this.$store.state.popularTags.isLoading;
    },
    errorMessage() {
      return this.$store.state.popularTags.error;
    },
  },
  mounted() {
    this.$store.dispatch("getPopularTags");
  },
};
</script>

<style>
</style>