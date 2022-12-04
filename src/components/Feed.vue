<template>
  <div>
    <div v-if="isLoading">...Loading</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
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

          <div class="pull-xs-right">ADD TO FAV</div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more</span>
          TAG LIST
        </router-link>
      </div>
      PAG
    </div>
  </div>
</template>
  
<script>
export default {
  name: "McvFeed",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.feed.isLoading;
    },
    feed() {
      return this.$store.state.feed.data;
    },
  },
  created() {
    console.log(this.$store.state.feed.data);
    this.$store.dispatch("getFeed", { apiUrl: this.apiUrl });
  },
};
</script>