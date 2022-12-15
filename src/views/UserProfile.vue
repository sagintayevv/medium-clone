<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>Button</div>
            <router-link
              v-if="isCurrentuserProfile"
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{ name: 'settings' }"
            >
              Edit Profile Settings
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfile',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfile' }"
                >
                  My Post
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfileFavorites' }"
                >
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <mcv-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from "@/components/Feed";
export default {
  name: "McvUserProfile",
  computed: {
    isLoading() {
      return this.$store.state.userProfile.isLoading;
    },
    userProfile() {
      return this.$store.state.userProfile.data;
    },
    error() {
      return this.$store.state.userProfile.error;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    isCurrentuserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }
      return this.currentUser.username === this.userProfile.username;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes("favorites");
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;
    },
    routeName() {
      return this.$route.name;
    },
  },
  components: {
    McvFeed,
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile();
    },
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch("getUserProfile", { slug: this.userProfileSlug });
    },
  },
};
</script>

<style>
</style>