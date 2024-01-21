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
        console.log("Error: Incorrect file path");
        return showMenu();
      }
      statistics.parseMatchInfo(fileInfo);
      console.log("Successfully uploaded file");

      // Implement file upload logic here
      showMenu();
      // Prompt the user again
    });
}

// Function to handle the match query logic
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
        console.log(`Statistics for match ID: ${matchId} not found.`);
        return showMenu();
      }
      // Call to format the raw stats as formatted result.
      const individualMatchStats =
        statistics.formatIndividualMatchStats(matchStats);

      statistics.printIndividualMatchStats(individualMatchStats);

      // Prompt the user again
      showMenu();
    });
}

// Function to handle the player results query logic
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
      console.log(`Get Player Results: ${playerName}`);

      statistics.getGamesWonLossByPlayer(playerName);
      // Implement player results query logic here

      // Prompt the user again
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
