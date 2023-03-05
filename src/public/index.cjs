//First one
fetch("./output/1-matches-per-year.json")
  .then((data) => data.json())
  .then((data) => {
    const dataValues = Object.values(data);
    const dataKeys = Object.keys(data);
    Highcharts.chart("container1", {
      title: {
        text: "IPL matches per year",
        align: "left",
      },

      subtitle: {
        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
        align: "left",
      },

      yAxis: {
        title: {
          text: "Number of Matches",
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2010 to 2020",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2008,
        },
      },

      series: [
        {
          name: "Matches",
          data: dataValues,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });
// Second One
fetch("./output/2-matches-won-per-team-per-year.json")
  .then((data) => data.json())
  .then((data) => {
    Object.keys(data).map((player) => {
      let yearArray = {
        2008: 0,
        2009: 0,
        2010: 0,
        2011: 0,
        2012: 0,
        2013: 0,
        2014: 0,
        2015: 0,
        2016: 0,
        2017: 0,
      };

      Object.assign(yearArray, data[player]);
      data[player] = yearArray;
    });

    let object = {};
    Object.keys(data).map((teams) => {
      object[teams] = {
        name: teams,
        data: Object.values(data[teams]),
      };
    });
    console.log(Object.values(object));

    Highcharts.chart("container2", {
      chart: {
        type: "column",
      },
      title: {
        text: "Matches Won Per Team Per Year",
      },

      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2010 to 2020",
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Teams",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:1f} </b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2008,
        },
      },

      series: Object.values(object),
    });
  });

// Third one
fetch("./output/3-extra-run-per-team-2016.json")
  .then((data) => data.json())
  .then((data) => {
    const extraRuns = Object.values(data);
    const teamsName = Object.keys(data);
    Highcharts.chart("container3", {
      title: {
        text: "Extra runs per team in 2016",
        align: "left",
      },

      subtitle: {
        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
        align: "left",
      },

      yAxis: {
        title: {
          text: "Runs",
        },
      },

      xAxis: {
        categories: teamsName,
        accessibility: {
          rangeDescription: "Range: 2010 to 2020",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },

      series: [
        {
          name: "Extra runs",
          data: extraRuns,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });
// Fourth one
fetch("./output/4-top-10-econimical-bowlers.json")
  .then((data) => data.json())
  .then((data) => {
    const bowlers = data.map((bowlersEconomy) => {
      return bowlersEconomy[0];
    });
    const economy = data.map((bowlersEconomy) => {
      return Number(bowlersEconomy[1]);
    });

    Highcharts.chart("container4", {
      chart: {
        type: "column",
      },
      title: {
        text: "Top 10 Economical Bowlers",
      },
      subtitle: {
        text: "In the year 2015",
      },
      xAxis: {
        categories: bowlers,
        crosshair: true,
        title: {
          text: "Bowlers",
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Economy",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "economy",
          data: economy,
        },
      ],
    });
  });
// Fifth one
fetch("./output/5-team-won-toss&match.json")
  .then((data) => data.json())
  .then((data) => {
    const matchesCount = Object.values(data);
    const teamsName = Object.keys(data);
    Highcharts.chart("container5", {
      title: {
        text: " Number of times each team won the toss and also won the match ",
        align: "left",
      },

      subtitle: {
        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
        align: "left",
      },

      yAxis: {
        title: {
          text: "match",
        },
      },

      xAxis: {
        categories: teamsName,
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },

      series: [
        {
          name: "Matches",
          data: matchesCount,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });
// Sixth one
fetch("./output/6-playerOfTheSeason.json")
  .then((data) => data.json())
  .then((data) => {
    let players = Object.keys(data).map((year) => {
      return data[year]["playerName"];
    });
    let awardsCount = Object.keys(data).map((year) => {
      return data[year]["maxWon"];
    });
    let years = [
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
    ];
    let playerYearArray = players.map((player) => {
      let index = players.indexOf(player);
      return player + " " + years[index];
    });

    Highcharts.chart("container6", {
      chart: {
        type: "column",
      },
      title: {
        text: "Player of the season",
      },

      xAxis: {
        categories: playerYearArray,
        crosshair: true,
        title: {
          text: "Players",
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Awards count",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:1f} </b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        pointStart: 2008,
      },
      series: [
        {
          name: "awards",
          data: awardsCount,
        },
      ],
    });
  });
// Seventh one
fetch("./output/7-strike-rate-per-season.json")
  .then((data) => data.json())
  .then((data) => {
    Object.keys(data).map((player) => {
      let yearArray = {
        2008: 0,
        2009: 0,
        2010: 0,
        2011: 0,
        2012: 0,
        2013: 0,
        2014: 0,
        2015: 0,
        2016: 0,
        2017: 0,
      };

      Object.assign(yearArray, data[player]);
      data[player] = yearArray;
    });

    let object = {};
    Object.keys(data).map((teams) => {
      object[teams] = {
        name: teams,
        data: Object.values(data[teams]),
      };
    });
    console.log(Object.values(object));
    Highcharts.chart("container7", {
      chart: {
        type: "bar",
      },
      title: {
        text: "Historic World Population by Region",
        align: "left",
      },
      subtitle: {
        text:
          "Source: <a " +
          'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
          'target="_blank">Wikipedia.org</a>',
        align: "left",
      },
      xAxis: {
        categories: [
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
        ],
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "years",
          align: "high",
        },
        labels: {
          overflow: "justify",
        },
      },
      tooltip: {
        valueSuffix: " run/overs",
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      series: Object.values(object),
    });
  });
// Eighth one
fetch("./output/8-max-player-dismissed.json")
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    let playersName = data.map((players) => {
      console.log(players);
      return players[0];
    });
    let dismissedCount = data.map((players) => {
      return Number(players[1]);
    });
    console.log(playersName);
    console.log(dismissedCount);
    Highcharts.chart("container8", {
      title: {
        text: " Number of times one player has been dismissed by another player",
        align: "left",
      },

      subtitle: {
        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
        align: "left",
      },

      yAxis: {
        title: {
          text: "Dismissed",
        },
      },

      xAxis: {
        categories: playersName,
        accessibility: {
          rangeDescription: "Range: 2010 to 2020",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 0,
        },
      },

      series: [
        {
          name: "Dismissed Count",
          data: dismissedCount,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });
// Ninth one
fetch("./output/9-best-economy-super-over.json")
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    let namesOfThePlayers = data.map((players) => {
      console.log(players);
      return players[0];
    });
    let economy = data.map((players) => {
      return Number(players[1]);
    });
    console.log(namesOfThePlayers);
    console.log(economy);
    Highcharts.chart("container9", {
      title: {
        text: "Economy in super over",
        align: "left",
      },

      subtitle: {
        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
        align: "left",
      },

      yAxis: {
        title: {
          text: "Economy",
        },
      },

      xAxis: {
        categories: namesOfThePlayers,
        accessibility: {
          rangeDescription: "Range: 2010 to 2020",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 0,
        },
      },

      series: [
        {
          name: "economy",
          data: economy,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });
