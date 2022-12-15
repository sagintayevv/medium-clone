<template>
  <div class="setting-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <mcv-validation-errors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="Url of image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="Password"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isSubmitting"
              >
                Update
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout" type="text">
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors";
export default {
  name: "McvSettings",
  computed: {
    isSubmitting() {
      return this.$store.state.settings.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.settings.validationErrors;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: "",
      };
    },
  },
  components: {
    McvValidationErrors,
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("updateCurrentUser", {
        currentUserInput: this.form,
      });
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "globalfeed" });
      });
    },
  },
};
</script>

<style>
</style>