<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{ name: 'yourfeed' }"
          class="nav-link"
          :class="{ active: routeName == 'yourfeed' }"
        >
          YourFeed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'globalfeed' }"
          class="nav-link"
          :class="{ active: routeName == 'globalfeed' }"
        >
          GlobalFeed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{ name: 'tag' }"
          class="nav-link"
          :class="{ active: routeName == 'tag' }"
        >
          <i class="ion-pound"></i>
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import YourFeed from "../views/YourFeed";
export default {
  name: "McvFeedToggler",
  props: {
    tagName: {
      type: String,
      required: true,
    },
  },
  components: { YourFeed },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    routeName() {
      return this.$route.name;
    },
  },
};
</script>

<style>
</style>