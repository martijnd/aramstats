<template>
  <div class="hello">
    <h1>ARAMStats</h1>
    <input
      type="text"
      @change="getUserInfo"
      v-model="username"
    >
    <h2>{{ accountId }}</h2>

  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Dashboard",
  data() {
    return {
      API_KEY: process.env.VUE_APP_API_KEY,
      ACCOUNT_URL: `http://localhost:8080/lol/summoner/v4/summoners/by-name/`,
      MATCH_URL: "`http://localhost:8080/lol/match/v4/matchlists/by-account/",
      locale: "?platform=EUW1",
      username: "",
      accountId: null
    };
  },
  methods: {
    getUserInfo: function() {
      axios
        .get(this.ACCOUNT_URL + this.username + this.locale)
        .then(response => {
          console.log(response);
          this.accountId = response.data.accountId;
          this.setUserMatchInfo(this.accountId);
        })
        .catch(error => {
          console.log(error);
        });
    },
    setUserMatchInfo: function(accountId) {
      axios.get(this.MATCH_URL + accountId + this.locale).then(response => {
        console.log(response);
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
