<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'globalfeed' }"
        >Medium</router-link
      >
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'globalfeed' }"
            exact
            active-class="active"
            >Home</router-link
          >
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'createArticle' }"
              active-class="active"
            >
              <i class="ion-compose"></i> &nbsp; NewArticle
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'settings' }"
              active-class="active"
            >
              <i class="ion-gear-a"></i> &nbsp; Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'userProfile',
                params: { slug: currentUser.username },
              }"
              active-class="active"
            >
              <img class="user-pic" :src="currentUser.image" />&nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">Log out</a>
          </li>
        </template>

        <template v-if="isAnonymus">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'login' }"
              active-class="active"
              >Sign In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'register' }"
              active-class="active"
            >
              Sign Up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "McvTopbar",
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isAnonymus() {
      return this.$store.getters.isAnonymus;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("accessToken");
      this.$router.push("/login");
    },
  },
};
</script>
