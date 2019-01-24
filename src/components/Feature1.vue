<template>
  <div>
    <table>
      <tr>
        <th>Month</th>
        <th>Total</th>
      </tr>
      <tr v-for="row in featureData">
        <td>{{ row.month }}</td>
        <td>{{ row.total }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import qs from "querystring";
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
    this.getFeatureData();
  },
  methods: {
    getFeatureData: function() {
      const postData = {
        metric_id: "1",
        value: "47",
        date: "20190126"
      };
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      const context = this;
      return axios
        .post(
          "https://trackboard.doolta.com/v1/measure",
          qs.stringify(postData),
          config
        )
        .then(resp => {
          context.featureData = resp.data;
          return true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
