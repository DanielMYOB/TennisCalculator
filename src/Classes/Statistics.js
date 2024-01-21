class Statistics {
  // needs to keep match info by matchId:

  // Person A defeated Person B
  // 2 sets to 0
  // need to query by matchId, so k/v store with matchId as key:

  /**
   * // Match 2
   * {
   *    2: {
   *    winnerName: 'Person A',
   *    loserName: 'Person B',
   *    winnerScore: 2,
   *    loserScore: 0
   * }
   * }
   */

  // need to keep total won/loss games per player:
  // Player: Person A
  // Games Won/Loss: 23 17

  /**
   * propose k/v store with player name as key:
   * {
   *    'Person A': {
   *            gamesWon: 23,
   *            gamesLost: 17
   *        }
   * }
   */

  constructor() {
    // does the constructor need any params?
    this.rawMatchStats = {};
  }

  getResults() {
    return this.rawMatchStats;
  }

  // @NOTE: note sure if required:
  addMatchStatistics(matchStats) {
    // *    2: {
    // *    winnerName: 'Person A',
    // *    loserName: 'Person B',
    // *    winnerScore: 2,
    // *    loserScore: 0
    // * }
  }

  // @TODO: test
  getRawMatchStatsById(matchId) {
    if (!this.rawMatchStats[matchId]) return false;

    return this.rawMatchStats[matchId];
  }

  getMatchStatisticsById(matchId) {
    // matchId = 2,
    const rawMatchStatsById = this.getRawMatchStatsById(matchId);
    if (!rawMatchStatsById) {
      return false;
    }

    return rawMatchStatsById;
    // get raw stats by ID returns:
    // *    1: { // Match no.
    // *      players: ['Person A', 'Person B'],
    // *      points: ['0', '0', '1'] // etc
    // *      }
    // ***
    // write calc to get the actual score (ie 2 sets 0),
    // and return a payload like:
    //  {
    //     winnerName: 'Person A',
    //     loserName: 'Person B',
    //     winnerScore: 2,
    //     loserScore: 0
    //  }
    // *** Another func to format the payload:
    // format the response like:
    // Person A defeated Person B
    // 2 sets to 0
  }

  formatIndividualMatchStats(matchData) {
    // and return a payload like:
    //  {
    //     winnerName: 'Person A',
    //     loserName: 'Person B',
    //     winnerScore: 2,
    //     loserScore: 0
    //  }
    const players = matchData.players;
    const points = matchData.points;

    if (
      !players ||
      !Array.isArray(players) ||
      players.length !== 2 ||
      !points ||
      !Array.isArray(points) ||
      points.length % 2 !== 0
    ) {
      return false;
    }

    let playerAPoints = 0;
    let playerBPoints = 0;

    let playerAGames = 0;
    let playerBGames = 0;

    let playerASets = 0;
    let playerBSets = 0;

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (point === "0") {
        playerAPoints++;
      } else if (point === "1") {
        playerBPoints++;
      }

      // Check for the end of a game
      if (playerAPoints >= 4 && Math.abs(playerAPoints - playerBPoints) >= 2) {
        playerAGames++;
        playerAPoints = 0;
        playerBPoints = 0;
      } else if (
        playerBPoints >= 4 &&
        Math.abs(playerBPoints - playerAPoints) >= 2
      ) {
        playerBGames++;
        playerAPoints = 0;
        playerBPoints = 0;
      }

      // Check for the end of a set
      if (playerAGames >= 6 || playerBGames >= 6) {
        if (playerAGames > playerBGames) {
          playerASets++;
        } else {
          playerBSets++;
        }
        playerAGames = 0;
        playerBGames = 0;
      }
    }

    let winnerName, loserName, winnerSets, loserSets;
    if (playerASets > playerBSets) {
      winnerName = players[0];
      loserName = players[1];
      winnerSets = playerASets;
      loserSets = playerBSets;
    } else if (playerBSets > playerASets) {
      winnerName = players[1];
      loserName = players[0];
      winnerSets = playerBSets;
      loserSets = playerASets;
    } else {
      winnerName = null;
      loserName = null;
      winnerSets = 0;
      loserSets = 0;
    }

    return {
      winnerName,
      loserName,
      winnerSets,
      loserSets,
    };
  }

  printIndividualMatchStats({ winnerName, winnerSets, loserName, loserSets }) {
    //  {
    //     winnerName: 'Person A',
    //     loserName: 'Person B',
    //     winnerScore: 2,
    //     loserScore: 0
    //  }
    console.log(`${winnerName} defeated ${loserName}`);
    console.log(`${winnerSets} sets to ${loserSets}`);
  }

  getGamesWonLossByPlayer(playerName) {
    // playerName = 'Person A'
    // returns:
    /**
     * propose k/v store with player name as key:
     * {
     *    'Person A': {
     *            gamesWon: 23,
     *            gamesLost: 17
     *        }
     * }
     */
  }

  // @TODO: test:
  parseMatchInfo(fileInfo) {
    // want a data structure like:
    /**
     * {
     *    1: { // Match no.
     *      players: ['Person A', 'Person B'],
     *      points: ['0', '0', '1'] // etc
     *      }
     *    2: { // Match no.
     *      players: ['Person A', 'Person C'],
     *      points: ['0', '0', '1'] // etc
     *      }
     * }
     */

    const matches = fileInfo.split("Match: ");

    matches.shift();

    const results = {};

    matches.forEach((match) => {
      const lines = match.trim().split("\n");
      const matchNo = parseInt(lines[0].replace(/^0+/, ""));
      const players = lines[1].split(" vs ").map((player) => player.trim());

      const points = lines.slice(2).map((point) => point.trim());

      results[matchNo] = {
        players,
        points,
      };
    });

    this.rawMatchStats = results;
  }
}

module.exports = Statistics;
