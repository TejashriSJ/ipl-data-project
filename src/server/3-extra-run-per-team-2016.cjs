const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function extraRunsPerTeam(matches, deliveries) {
  if (
    matches === undefined ||
    deliveries === undefined ||
    typeof matches !== "object" ||
    typeof deliveries !== "object"
  ) {
    throw new Error("Parameters passed is not correct");
  }
  let extraRunPerTeam2016 = {};

  // match ids in 2016
  matchIDin2016 = matches
    .filter((match) => {
      return match.season === "2016";
    })
    .map((match) => {
      return match.id;
    });

  for (let delivery of deliveries) {
    // for each of the delivery in the given season counts extra runs per each team
    if (matchIDin2016.includes(delivery.match_id)) {
      if (extraRunPerTeam2016[delivery.bowling_team] === undefined) {
        extraRunPerTeam2016[delivery.bowling_team] = Number(
          delivery.extra_runs
        );
      } else {
        extraRunPerTeam2016[delivery.bowling_team] += Number(
          delivery.extra_runs
        );
      }
    }
  }
  return extraRunPerTeam2016;
}

csvtojson()
  .fromFile("js-ipl-data-project/src/data/matches.csv")
  .then((matchObj) => {
    csvtojson()
      .fromFile("js-ipl-data-project/src/data/deliveries.csv")
      .then((deliveriesObj) => {
        const extraRunPerTeam2016 = extraRunsPerTeam(matchObj, deliveriesObj);

        fs.writeFileSync(
          "js-ipl-data-project/src/public/output/3-extra-run-per-team-2016.json",
          JSON.stringify(extraRunPerTeam2016),
          "utf-8"
        );
      });
  });

module.exports = extraRunsPerTeam;
