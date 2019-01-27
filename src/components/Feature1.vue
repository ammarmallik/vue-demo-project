<template>
  <div>
    <div>
      <form class="feature-form" @submit.prevent="getFeatureData">
        <h1>Feature 1</h1>
        <label>Metric ID:</label>
        <input required v-model="metric_id" type="text" placeholder="Metric ID">
        <label>Value</label>
        <input required v-model="value" type="text" placeholder="Value">
        <label>Date</label>
        <input required v-model="date" type="text" placeholder="YYYYMMDD">
        <hr>
        <button type="submit">Submit</button>
      </form>
    </div>
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
      value: "",
      date: "",
      metric_id: "",
      featureData: []
    };
  },

  mounted() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    getFeatureData: function() {
      const postData = {
        metric_id: this.metric_id,
        value: this.value,
        date: this.date
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
