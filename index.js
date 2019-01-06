require("dotenv").config();
const teemoJS = require("teemojs");
const api = teemoJS(process.env.API_KEY);

const getAccountId = async userName => {
  let data;
  try {
    data = await api
      .get("euw1", "summoner.getBySummonerName", userName)
      .catch(error => console.error(error));
  } catch (error) {
    console.error(error);
  }
  console.log(data.name + "'s summoner id is " + data.accountId + ".");

  return data.accountId;
};
const getMatchData = async (accountId, gameType = null) => {
  if (gameType.toUpperCase() === "ARAM") {
    gameType = 450;
  } else if (gameType.toUpperCase() === "NORMAL") {
    gameType = 430;
  }
  try {
    return api.get("euw1", "match.getMatchlist", accountId, {
      queue: gameType
    });
  } catch (error) {
    console.error(error);
  }
};

const parseMatchData = async matchData => {};

(async () => {
  const accountId = await getAccountId("Straenir");
  const matchData = await getMatchData(accountId, "ARAM");
  const result = await parseMatchData(matchData);
})();
