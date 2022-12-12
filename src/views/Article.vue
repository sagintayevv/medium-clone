<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" alt="" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span>
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit"> Edit Article </i>
            </router-link>
            <button class="btn btn-outline-danger btn-sm">
              <i class="ion-trash-a">Delete Article</i>
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvLoading from "@/components/Loading";
import McvErrorMessage from "@/components/ErrorMessage";

export default {
  name: "McvArticle",
  computed: {
    isLoading() {
      return this.$store.state.article.isLoading;
    },
    article() {
      return this.$store.state.article.data;
    },
    error() {
      return this.$store.state.article.error;
    },
  },
  components: {
    McvLoading,
    McvErrorMessage,
  },
  mounted() {
    this.$store.dispatch("getArticle", { slug: this.$route.params.slug });
  },
};
</script>

<style>
</style>