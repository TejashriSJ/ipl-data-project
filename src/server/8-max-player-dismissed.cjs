const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function maxPlayerDismissed(deliveries) {
  if (deliveries === undefined || typeof deliveries !== "object") {
    throw new Error("Parameters passed is not correct");
  }
  // count of pair of dismissed player and player who dismissed
  let dismissedCount = {};

  deliveries.map((delivery) => {
    if (delivery.player_dismissed !== "") {
      //if it is run out then player is dismissed by fielder
      if (delivery.dismissal_kind === "run out") {
        let playerFielder = [delivery.player_dismissed, delivery.fielder];

        if (dismissedCount[playerFielder] === undefined) {
          dismissedCount[playerFielder] = 1;
        } else {
          dismissedCount[playerFielder] += 1;
        }
      }
      // for other than run out player is dismissed by bowler
      else if (delivery.dismissal_kind !== undefined) {
        let playerBowler = [delivery.player_dismissed, delivery.bowler];
        if (dismissedCount[playerBowler] === undefined) {
          dismissedCount[playerBowler] = 1;
        } else {
          dismissedCount[playerBowler] += 1;
        }
      }
    }
  });
  // Maximum times each player dismissed by another
  let maxDismissedPlayersObj = {};
  for (players in dismissedCount) {
    if (maxDismissedPlayersObj[players] === undefined) {
      maxDismissedPlayersObj[players] = dismissedCount[players];
    } else {
      if (dismissedCount[players] > maxDismissedPlayersObj[players]) {
        maxDismissedPlayersObj[players] = dismissedCount[players];
      }
    }
  }
  // maximum times a player dismissed by another is
  let maxDismissedPlayerArray = Object.entries(maxDismissedPlayersObj).sort(
    (player1, player2) => {
      return player2[1] - player1[1];
    }
  );
  // selecting first 10 maximun dismissed player count
  return maxDismissedPlayerArray.slice(0, 10);
}

csvtojson()
  .fromFile("js-ipl-data-project/src/data/deliveries.csv")
  .then((deliveriesObj) => {
    let maxDismissedPlayer = maxPlayerDismissed(deliveriesObj);
    fs.writeFileSync(
      "js-ipl-data-project/src/public/output/8-max-player-dismissed.json",
      JSON.stringify(maxDismissedPlayer),
      "utf-8"
    );
  });

module.exports = maxPlayerDismissed;
