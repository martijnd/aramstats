require("dotenv").config();
const teemoJS = require("teemojs");
const api = teemoJS(process.env.API_KEY);
const championData = require("./champion.json");

let championIds = [];

Object.keys(championData.data)
  .map(k => championData.data[k])
  .map(el => (championIds[el.key] = el.name));

const getAccountId = async userName => {
  let data;
  try {
    data = await api
      .get("euw1", "summoner.getBySummonerName", userName)
      .catch(error => console.error(error));
  } catch (error) {
    console.error(error);
  }
  console.log(data.name + "'s summoner id is " + data.id + ".");

  return data.accountId;
};
const getMatchData = async (accountId, gameType = null) => {
  if (gameType.toUpperCase() === "ARAM") {
    gameType = 450;
  } else if (gameType.toUpperCase() === "NORMAL") {
    gameType = 400;
  }
  try {
    const data = await api.get("euw1", "match.getMatchlist", accountId, {
      queue: gameType
    });
    return data.matches;
  } catch (error) {
    console.error(error);
  }
};

const parseMatchData = async matchData => {
  matchData = Object.keys(matchData)
    .map(k => matchData[k])
    .reverse();

  let matchResult = [];

  for (let property in matchData) {
    const match = matchData[property];
    match.timestamp = new Date(match.timestamp);
    match.champion = championIds[match.champion];
    matchResult.push(match);
  }

  return matchResult;
};

(async () => {
  const accountId = await getAccountId("Gastlyguy");
  const matchData = await getMatchData(accountId, "NORMAL");
  const result = await parseMatchData(matchData);
  console.log(result);
})();
