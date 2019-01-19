<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <span v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>|
        <router-link to="/signup">Signup</router-link>
      </span>
      <span v-if="isLoggedIn">
        <router-link to="/feature1">Feature1</router-link>|
        <a @click="logout">Logout</a>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    isLoggedIn: function() {
      console.log(this.$store);
      return this.$store.getters.isLoggedIn;
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(this.logout);
        }
        throw err;
      });
    });
  },
  mounted: function() {
    if (this.isLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
