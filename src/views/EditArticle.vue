<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-article-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
    {{ validationErrors }}
  </div>
</template>
  
  <script>
import McvArticleForm from "@/components/ArticleForm";
import McvLoading from "@/components/Loading";

export default {
  name: "McvEditArticle",
  components: {
    McvArticleForm,
    McvLoading,
  },
  //   data() {
  //     return {
  //       initialValues: {
  //         title: "",
  //         description: "",
  //         body: "",
  //         tagList: [],
  //       },
  //     };
  //   },
  computed: {
    isSubmitting() {
      return this.$store.state.editArticle.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.editArticle.validationErrors;
    },
    article() {
      return this.$store.state.editArticle.article;
    },
    isLoading() {
      return this.$store.state.editArticle.isLoading;
    },
    initialValues() {
      if (!this.article) {
        return null;
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
  mounted() {
    this.$store.dispatch("getArticle", {
      slug: this.$route.params.slug,
    });
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.route.params.slug;
      this.$store
        .dispatch("updateArticle", { slug, articleInput })
        .then((article) => {
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
};
</script>
  
  <style>
</style>