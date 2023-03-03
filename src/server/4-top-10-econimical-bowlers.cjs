const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function top10EconomicalBowlers(matches, deliveries) {
  if (
    matches === undefined ||
    deliveries === undefined ||
    typeof matches !== "object" ||
    typeof deliveries !== "object"
  ) {
    throw new Error("Parameters passed is not correct");
  }

  // taking ids from matches of 2015
  const matchID2015 = matches
    .filter((match) => {
      return match.season === "2015";
    })
    .map((match) => {
      return match.id;
    });
  // deliveries in only 2015
  const deliveriesIn2015 = deliveries.filter((delivery) => {
    return matchID2015.includes(delivery.match_id);
  });

  //creating each bowlers data containing their runs,balls,byeRuns,legbyRuns
  const deliveryPerBowler = {};
  deliveriesIn2015.forEach((delivery) => {
    let bowler = delivery.bowler;
    let balls =
      delivery.wide_runs === "0" && delivery.noball_runs === "0" ? 1 : 0;
    if (deliveryPerBowler[bowler] === undefined) {
      deliveryPerBowler[bowler] = {
        runs: Number(delivery.total_runs),
        balls: balls,
        byeRuns: Number(delivery.bye_runs),
        legbyeRuns: Number(delivery.legbye_runs),
      };
    } else {
      deliveryPerBowler[bowler].runs += Number(delivery.total_runs);
      deliveryPerBowler[bowler].balls += balls;
      deliveryPerBowler[bowler].byeRuns += Number(delivery.bye_runs);
      deliveryPerBowler[bowler].legbyeRuns += Number(delivery.legbye_runs);
    }
  });

  // calculating economy of each bowler
  let economyOfBowlers = [];
  for (bowler in deliveryPerBowler) {
    let runs = deliveryPerBowler[bowler].runs;
    let balls = deliveryPerBowler[bowler].balls.toFixed(2);
    let byeRuns = deliveryPerBowler[bowler].byeRuns;
    let legbyeRuns = deliveryPerBowler[bowler].legbyeRuns;
    economyOfBowlers.push([
      bowler,
      ((runs - byeRuns - legbyeRuns) / (balls / 6)).toFixed(2),
    ]);
  }
  // sorting in ascending order of based on bowlers economy
  economyOfBowlers.sort((bowler1, bowler2) => {
    return bowler1[1] - bowler2[1];
  });

  // names of top 10 economical bowlers
  let topEconomicalBowlers10 = [];
  topEconomicalBowlers10 = economyOfBowlers.slice(0, 10).map((bowlerRuns) => {
    return bowlerRuns;
  });
  return topEconomicalBowlers10;
}
csvtojson()
  .fromFile("js-ipl-data-project/src/data/matches.csv")
  .then((matchObj) => {
    csvtojson()
      .fromFile("js-ipl-data-project/src/data/deliveries.csv")
      .then((deliveriesObj) => {
        let topEconomicalBowlers10;
        topEconomicalBowlers10 = top10EconomicalBowlers(
          matchObj,
          deliveriesObj
        );

        fs.writeFileSync(
          "js-ipl-data-project/src/public/output/4-top-10-econimical-bowlers.json",
          JSON.stringify(topEconomicalBowlers10),
          "utf-8"
        );
      });
  });

module.exports = top10EconomicalBowlers;
