const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function strikeRateOfBatterPerSeason(matches, deliveries) {
  if (
    matches === undefined ||
    deliveries === undefined ||
    typeof matches !== "object" ||
    typeof deliveries !== "object"
  ) {
    throw new Error("Parameters passed is not correct");
  }
  let strikeRatePerSeason = {};
  //count RunsAndBalls Per Player Per Season
  //total runs and balls of a batsman in perticular season
  let countRunsAndBalls = {};
  let season = matches[0].season;

  for (let match of matches) {
    if (match.season !== season) {
      season = match.season;
    }
    for (let delivery of deliveries) {
      if (match.id === delivery.match_id) {
        let batsman = delivery.batsman;
        // wide and no ball will not be considered
        let balls =
          delivery.wide_runs === "0" && delivery.noball_runs === "0" ? 1 : 0;
        if (countRunsAndBalls[batsman] === undefined) {
          countRunsAndBalls[batsman] = {};
        }
        if (countRunsAndBalls[batsman][season] === undefined) {
          countRunsAndBalls[batsman][season] = {
            runs: Number(delivery.batsman_runs),
            balls: balls,
          };
        } else {
          countRunsAndBalls[batsman][season].runs += Number(
            delivery.batsman_runs
          );
          countRunsAndBalls[batsman][season].balls += balls;
        }
      }
    }
  }
  console.log(JSON.stringify(countRunsAndBalls));
  //calculating strike of each batsman per season
  Object.keys(countRunsAndBalls).forEach((batsman) => {
    strikeRatePerSeason[batsman] = {};
    Object.keys(countRunsAndBalls[batsman]).forEach((year) => {
      strikeRatePerSeason[batsman][year] = {};
      let runs = countRunsAndBalls[batsman][year]["runs"];
      let balls = countRunsAndBalls[batsman][year]["balls"];
      console.log(runs, balls);
      countRunsAndBalls[batsman][year]["strike"] = (
        (runs / balls) *
        100
      ).toFixed(2);
      strikeRatePerSeason[batsman][year] = {
        strike: countRunsAndBalls[batsman][year]["strike"],
      };
    });
  });

  return strikeRatePerSeason;
}

csvtojson()
  .fromFile("js-ipl-data-project/src/data/matches.csv")
  .then((matchObj) => {
    csvtojson()
      .fromFile("js-ipl-data-project/src/data/deliveries.csv")
      .then((deliveriesObj) => {
        let strikeRatePerSeason = strikeRateOfBatterPerSeason(
          matchObj,
          deliveriesObj
        );

        fs.writeFileSync(
          "js-ipl-data-project/src/public/output/7-strike-rate-per-season.json",
          JSON.stringify(strikeRatePerSeason),
          "utf-8"
        );
      });
  });
module.exports = strikeRateOfBatterPerSeason;
