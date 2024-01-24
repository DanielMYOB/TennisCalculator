const inquirer = require("inquirer");
const { readFile } = require("./utils/fileReader");
const Statistics = require("./Classes/Statistics");
const Output = require("./Classes/Output");

const statistics = new Statistics();
const output = new Output();

function uploadFile() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fileDirectory",
        message: "Enter file directory:",
        validate: (value) => {
          return value.length > 0
            ? true
            : "Please enter a valid file directory.";
        },
      },
    ])
    .then((answers) => {
      const fileDirectory = answers.fileDirectory;
      const fileInfo = readFile(fileDirectory);
      if (!fileInfo) {
        output.print("Error: Incorrect file path");
        return showMenu();
      }
      statistics.parseMatchInfo(fileInfo);
      output.print("Successfully uploaded file");

      showMenu();
    });
}

function queryMatchResult() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "matchId",
        message: "Enter match ID:",
        validate: (value) => {
          return value.length > 0 ? true : "Please enter a valid match ID.";
        },
      },
    ])
    .then((answers) => {
      const matchId = answers.matchId;
      const matchStats = statistics.getMatchStatisticsById(matchId);
      if (!matchStats) {
        output.print(`Statistics for match ID: ${matchId} not found.`);
        return showMenu();
      }

      const { winnerName, winnerSets, loserName, loserSets } =
        statistics.formatIndividualMatchStats(matchStats);

      output.print(`${winnerName} defeated ${loserName}`);
      output.print(`${winnerSets} sets to ${loserSets}`);

      showMenu();
    });
}

function getPlayerResults() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "playerName",
        message: "Enter player name:",
        validate: (value) => {
          return value.length > 0 ? true : "Please enter a valid player name.";
        },
      },
    ])
    .then((answers) => {
      const playerName = answers.playerName;
      output.print(`Get Player Results: ${playerName}`);

      const playerStats = statistics.getGamesWonLossByPlayer(playerName);
      if (!playerStats) {
        output.print(`No Matches Found For: ${playerName}`);
      } else {
        output.print(
          `Games Win/Loss Record for ${playerName}: ${playerStats.playerGames} / ${playerStats.otherPlayerGames}`
        );
      }
      showMenu();
    });
}

function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: [
          "Upload file",
          "Query match result",
          "Get player results",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Upload file":
          uploadFile();
          break;
        case "Query match result":
          queryMatchResult();
          break;
        case "Get player results":
          getPlayerResults();
          break;
        case "Exit":
          output.print("Exiting program.");
          break;
        default:
          output.print("Invalid action selected.");
          showMenu();
      }
    });
}

showMenu();
