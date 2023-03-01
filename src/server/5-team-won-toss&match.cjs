const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function teamWonTossAndMatch(matches) {
  if (matches === undefined || typeof matches !== "object") {
    throw new Error("Parameters passed is not correct");
  }
  // for each match checks if toss and match winner are same and counts
  let countTeamWonTossAndMatch = {};
  matches.forEach((match) => {
    if (match.toss_winner === match.winner) {
      if (countTeamWonTossAndMatch[match.winner] === undefined) {
        countTeamWonTossAndMatch[match.winner] = 1;
      } else {
        countTeamWonTossAndMatch[match.winner] += 1;
      }
    }
  });
  return countTeamWonTossAndMatch;
}

csvtojson()
  .fromFile("js-ipl-data-project/src/data/matches.csv")
  .then((matchObj) => {
    let countTeamWonTossAndMatch = teamWonTossAndMatch(matchObj);
    fs.writeFileSync(
      "js-ipl-data-project/src/public/output/5-team-won-toss&match.json",
      JSON.stringify(countTeamWonTossAndMatch),
      "utf-8"
    );
  });

module.exports = teamWonTossAndMatch;
