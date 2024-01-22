const inquirer = require("inquirer");
const { readFile } = require("./utils/fileReader");
const Statistics = require("./Classes/Statistics");

const statistics = new Statistics();

function uploadFile() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fileDirectory",
        message: "Enter file directory:",
        // @TODO:
        //./data/full_tournament.txt (how to make this more elegant)
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
        // @TODO: export to output class
        console.log("Error: Incorrect file path");
        return showMenu();
      }
      statistics.parseMatchInfo(fileInfo);
      // @TODO: export to output class
      console.log("Successfully uploaded file");

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
        // @TODO: export to output class
        console.log(`Statistics for match ID: ${matchId} not found.`);
        return showMenu();
      }

      const individualMatchStats =
        statistics.formatIndividualMatchStats(matchStats);

      // @TODO: export to output class
      statistics.printIndividualMatchStats(individualMatchStats);

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
      // @TODO: export to output class
      console.log(`Get Player Results: ${playerName}`);

      const playerStats = statistics.getGamesWonLossByPlayer(playerName);
      // Implement player results query logic here

      showMenu();
    });
}

// Function to display the menu
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
          console.log("Exiting program.");
          break;
        default:
          console.log("Invalid action selected.");
          // Prompt the user again
          showMenu();
      }
    });
}

// Start the program by displaying the initial menu
showMenu();
