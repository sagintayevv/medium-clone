<template>
  <mcv-article-form
    :initial-values="initialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import McvArticleForm from "@/components/ArticleForm";
export default {
  name: "McvCreateArticle",
  components: {
    McvArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tsgList: [],
      },
    };
  },
  computed: {
    isSubmitting() {
      return this.$store.state.createArticle.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.createArticle.validationErrors;
    },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("createArticle", { articleInput })
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