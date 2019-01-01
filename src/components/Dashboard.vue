<template>
  <div class="hello">
    <h1>ARAMStats</h1>
    <input
      type="text"
      @change="fetchData"
      v-model="username"
    >

  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      API_KEY: process.env.VUE_APP_API_KEY,
      API_URL:
        "https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/",
      username: ""
    };
  },
  methods: {
    fetchData: function() {
      const axios = require("axios");

      axios
        .get(this.API_URL + this.username + this.API_KEY)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  color: white;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
