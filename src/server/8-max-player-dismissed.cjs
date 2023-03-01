const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function maxPlayerDismissed(deliveries) {
  if (deliveries === undefined || typeof deliveries !== "object") {
    throw new Error("Parameters passed is not correct");
  }
  // count of pair of dismissed player and player who dismissed
  let dismissed = {};
  let maxDismissedPlayer;
  deliveries.forEach((delivery) => {
    if (delivery.player_dismissed !== undefined) {
      if (delivery.dismissal_kind === "caught") {
        let playerFielder = [delivery.player_dismissed, delivery.fielder];

        if (dismissed[playerFielder] === undefined) {
          dismissed[playerFielder] = 1;
        } else {
          dismissed[playerFielder] += 1;
        }
      }
    } else if (delivery.dismissal_kind === "bowled") {
      let playersBowler = [delivery.player_dismissed, delivery.bowler];

      if (dismissed[playersBowler] === undefined) {
        dismissed[playersBowler] = 1;
      } else {
        dismissed[playersBowler] += 1;
      }
    }
  });
  // selecting the players with max pairs
  let max = 0;
  for (players in dismissed) {
    if (dismissed[players] > max) {
      max = dismissed[players];
      maxDismissedPlayer = [players, max];
    }
  }
  return maxDismissedPlayer;
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
