<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message :message="'foo'" />
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
          <h1>{{ article.description }}</h1>
          <p>{{ article.title }}</p>
          <span>Read more</span>
          <ul class="tag-list">
            <li
              v-for="(tag, index) in article.tagList"
              :key="index"
              class="tag-default tag-pill tag-outline"
            >
              {{ tag }}
            </li>
          </ul>
        </router-link>
      </div>
      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>
  
<script>
import McvPagination from "@/components/Pagination";
import McvLoading from "@/components/Loading";
import McvErrorMessage from "@/components/ErrorMessage";
import { stringify, parseUrl } from "query-string";
export default {
  name: "McvFeed",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      limit: 10,
    };
  },
  components: {
    McvPagination,
    McvLoading,
    McvErrorMessage,
  },
  computed: {
    isLoading() {
      return this.$store.state.feed.isLoading;
    },
    feed() {
      return this.$store.state.feed.data;
    },
    currentPage() {
      return Number(this.$route.query.page) || 1;
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * 10 - 10;
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit: 10,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch("getFeed", { apiUrl: apiUrlWithParams });
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
};
</script>