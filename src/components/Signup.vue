<template>
  <div>
    <h4>Signup</h4>
    <form @submit.prevent="register">
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required>
      </div>
      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted: function() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    register: function() {
      let data = {
        email: this.email,
        password: this.password,
        product: "Test"
      };
      this.$store
        .dispatch("signup", data)
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    }
  }
};
</script>
