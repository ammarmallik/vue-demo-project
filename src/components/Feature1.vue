<template>
  <div>
    <table>
      <tr>
        <th>#</th>
        <th>Month</th>
        <th>Total</th>
      </tr>
      <tr v-for="(index, row) in featureData">
        <td>{{ index }} + 1</td>
        <td>{{row.month}}</td>
        <td>{{row.total}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      featureData: []
    };
  },

  mounted() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/");
    }
    this.featureData = this.getFeatureData();
  },
  methods: {
    getFeatureData: function() {
      const postData = {
        value: "3",
        date: "2019-01-13",
        metric_id: "2"
      };
      axios({
        url: "https://trackboard.doolta.com/v1/measure",
        data: postData,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(resp => {
          console.log(resp);
          return resp.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
