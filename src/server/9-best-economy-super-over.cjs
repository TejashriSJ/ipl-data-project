const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function superOverBestEconomy(deliveries) {
  if (deliveries === undefined || typeof deliveries !== "object") {
    throw new Error("Parameters passed is not correct");
  }
  let superOverData = {};
  let superOverEconomy = [];
  //for each delivery if it is super over then take their data and count
  deliveries.forEach((delivery) => {
    if (delivery.is_super_over === "1") {
      let runs = Number(delivery.total_runs);

      let balls =
        delivery.wide_runs === "0" && delivery.noball_runs === "0" ? 1 : 0;

      let byeRuns = Number(delivery.bye_runs);
      let legbyeRuns = Number(delivery.legbye_runs);

      if (superOverData[delivery.bowler] === undefined) {
        superOverData[delivery.bowler] = {
          runs: runs,
          balls: balls,
          byeRuns: byeRuns,
          legbyeRuns: legbyeRuns,
        };
      } else {
        superOverData[delivery.bowler].runs += runs;
        superOverData[delivery.bowler].balls += balls;
        superOverData[delivery.bowler].byeRuns += byeRuns;
        superOverData[delivery.bowler].legbyeRuns += legbyeRuns;
      }
    }
  });
  // calculate economy of each bowler in super overs
  for (let bowler in superOverData) {
    let runs = superOverData[bowler].runs;
    let balls = superOverData[bowler].balls.toFixed(2);
    let byeRuns = superOverData[bowler].byeRuns;
    let legbyeRuns = superOverData[bowler].legbyeRuns;
    let economyRate = ((runs - byeRuns - legbyeRuns) / (balls / 6)).toFixed(2);
    superOverEconomy.push([bowler, economyRate]);
  }
  // best economy bowler
  let bestEconomyBowler = superOverEconomy.sort((bowler1, bowler2) => {
    return bowler1[1] - bowler2[1];
  })[0];

  return bestEconomyBowler;
}

csvtojson()
  .fromFile("js-ipl-data-project/src/data/deliveries.csv")
  .then((deliveriesObj) => {
    let bestEconomyBowler = superOverBestEconomy(deliveriesObj);
    fs.writeFileSync(
      "js-ipl-data-project/src/public/output/9-best-economy-super-over.json",
      JSON.stringify(bestEconomyBowler),
      "utf-8"
    );
  });

module.exports = superOverBestEconomy;
