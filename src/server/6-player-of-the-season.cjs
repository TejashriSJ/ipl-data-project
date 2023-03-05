const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function playerOfTheSeason(matches) {
  if (matches === undefined || typeof matches !== "object") {
    throw new Error("Parameters passed is not correct");
  }

  let playerOfTheSeasonObject = {};
  let countPlayerOfMatch = {};
  // count of player in how many matches he was the player_of_match per season

  matches.map((match) => {
    if (
      countPlayerOfMatch[[match.season, match.player_of_match]] === undefined
    ) {
      countPlayerOfMatch[[match.season, match.player_of_match]] = 1;
    } else {
      countPlayerOfMatch[[match.season, match.player_of_match]] += 1;
    }
  });

  // find the player who got max player_of_match per season
  let season = ""; // for keeping tract of individual season
  let maxWon = 0;

  //takes each player from countPlayerOfMatch

  Object.keys(countPlayerOfMatch).map((player) => {
    let playerSeason = player.split(",")[0];
    let playerName = player.split(",")[1];

    // stores the maximum count of player of match per season
    if (playerSeason === season) {
      if (countPlayerOfMatch[player] > maxWon) {
        maxWon = countPlayerOfMatch[player];
        playerOfTheSeasonObject[season] = { playerName, maxWon };
      }
    } else {
      // if season changed means season will be updated and max value will also update
      season = playerSeason;
      maxWon = countPlayerOfMatch[player];
      playerOfTheSeasonObject[season] = { playerName, maxWon };
    }
  });
  console.log(JSON.stringify(playerOfTheSeasonObject));
  return playerOfTheSeasonObject;
}
csvtojson()
  .fromFile("js-ipl-data-project/src/data/matches.csv")
  .then((matchObj) => {
    let playerOfTheSeasonObject = playerOfTheSeason(matchObj);

    fs.writeFileSync(
      "js-ipl-data-project/src/public/output/6-playerOfTheSeason.json",
      JSON.stringify(playerOfTheSeasonObject),
      "utf-8"
    );
  });

module.exports = playerOfTheSeason;
