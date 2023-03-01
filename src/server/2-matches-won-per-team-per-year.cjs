const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function matchesWonPerTeam(matches) {
  if (matches === undefined || typeof matches !== "object") {
    throw new Error("Parameters passed is not correct");
  }
  let matchesWonPerTeamPerYear = {};
  matches.forEach((match) => {
    // If the match is not draw
    if (match.winner !== "") {
      let WinnerInYear = [match.season, match.winner];
      if (matchesWonPerTeamPerYear[WinnerInYear] === undefined) {
        matchesWonPerTeamPerYear[WinnerInYear] = 1;
      } else {
        matchesWonPerTeamPerYear[WinnerInYear] += 1;
      }
    }
  });
  return matchesWonPerTeamPerYear;
}

csvtojson()
  .fromFile("js-ipl-data-project/src/data/matches.csv")
  .then((matchObj) => {
    let matchesWonPerTeamPerYear = matchesWonPerTeam(matchObj);
    fs.writeFileSync(
      "js-ipl-data-project/src/public/output/2-matches-won-per-team-per-year.json",
      JSON.stringify(matchesWonPerTeamPerYear),
      "utf-8"
    );
  });

module.exports = matchesWonPerTeam;
