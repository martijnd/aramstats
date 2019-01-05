require("dotenv").config();
const teemoJS = require("teemojs");

let api = teemoJS(process.env.API_KEY);

let accountId = "";
function getData() {
  api.get("euw1", "summoner.getBySummonerName", "Gastlyguy").then(data => {
    accountId = data.accountId;
    // console.log(data);
    console.log(data.name + "'s summoner id is " + data.accountId + ".");
    getMatchData();
  });
}
function getMatchData() {
  console.log(accountId + " test");
  api.get("euw1", "match.getMatchlist", accountId).then(response => {
    console.log(response);
  });
}

getData();
