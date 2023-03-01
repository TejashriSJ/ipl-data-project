const csvtojson = require("./../node_modules/csvtojson");
const fs = require("fs");

function matchesPerYear(matches, matchesPerYearObject) {
  matches.forEach((match) => {
    let matchYear = match.season;
    // counts the matches per year
    if (matchesPerYearObject[matchYear] === undefined) {
      matchesPerYearObject[matchYear] = 1;
    } else {
      matchesPerYearObject[matchYear] += 1;
    }
  });
}

// asynchronous function
csvtojson()
  .fromFile("js-ipl-data-project/src/data/matches.csv")
  .then((matchObj) => {
    let matchesPerYearObject = {};
    matchesPerYear(matchObj, matchesPerYearObject);
    // writing the output into a json file
    fs.writeFileSync(
      "js-ipl-data-project/src/public/output/1-matches-per-year.json",
      JSON.stringify(matchesPerYearObject),
      "utf-8"
    );
  });

module.exports = matchesPerYear;
