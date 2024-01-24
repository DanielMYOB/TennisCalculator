class Statistics {
  constructor() {
    this.rawMatchStats = {};
  }

  getResults() {
    return this.rawMatchStats;
  }

  getRawMatchStatsById(matchId) {
    if (!this.rawMatchStats[matchId]) return false;

    return this.rawMatchStats[matchId];
  }

  getMatchStatisticsById(matchId) {
    const rawMatchStatsById = this.getRawMatchStatsById(matchId);
    if (!rawMatchStatsById) {
      return false;
    }

    return rawMatchStatsById;
  }

  // @TODO: test
  formatIndividualMatchStats(matchData) {
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

    // *** EXPORT TO FUNCTION 1:
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
    // ^^^ EXPORT TO FUNCTION 1: ^^^

    // *** EXPORT TO FUNCTION 2:
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
    // ^^^ EXPORT TO FUNCTION 2: ^^^

    return {
      winnerName,
      loserName,
      winnerSets,
      loserSets,
    };
  }

  // @TODO: test
  getGamesWonLossByPlayer(playerName) {
    const matchesByPlayer = this.findAllMatchesByPlayerName(playerName);

    if (matchesByPlayer.length === 0) {
      return false;
    }

    const playerWonLossRecord = this.totalGamesWonLostByPlayerName(
      playerName,
      matchesByPlayer
    );

    return playerWonLossRecord;
  }

  // @TODO: test
  totalGamesWonLostByPlayerName(playerName, matchesByPlayer) {
    // *** EXPORT TO FUNCTION 3:
    const res = matchesByPlayer.map((match) => {
      const players = match.players;
      const points = match.points;

      const playerPoint = playerName === players[0] ? "0" : "1";
      const otherPlayerPoint = playerPoint === "0" ? "1" : "0";

      // do the counting stuff:

      // *********************

      let playerPoints = 0;
      let otherPlayerPoints = 0;

      let playerGames = 0;
      let otherPlayerGames = 0;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (point === playerPoint) {
          playerPoints++;
        } else if (point === otherPlayerPoint) {
          otherPlayerPoints++;
        }

        // Check for the end of a game
        if (
          playerPoints >= 4 &&
          Math.abs(playerPoints - otherPlayerPoints) >= 2
        ) {
          playerGames++;
          playerPoints = 0;
          otherPlayerPoints = 0;
        } else if (
          otherPlayerPoints >= 4 &&
          Math.abs(otherPlayerPoints - playerPoints) >= 2
        ) {
          otherPlayerGames++;
          playerPoints = 0;
          otherPlayerPoints = 0;
        }
      }

      return {
        playerGames,
        otherPlayerGames,
      };
    });
    // ^^^ EXPORT TO FUNCTION 3:

    // @TODO: EXPORT TO FUNCTION:
    return res.reduce(
      (accumulator, currentValue) => {
        accumulator.playerGames += currentValue.playerGames;
        accumulator.otherPlayerGames += currentValue.otherPlayerGames;
        return accumulator;
      },
      { playerGames: 0, otherPlayerGames: 0 }
    );
  }

  // @TODO: test
  findAllMatchesByPlayerName(playerName) {
    const matches = [];

    for (const matchNumber in this.rawMatchStats) {
      const match = this.rawMatchStats[matchNumber];

      if (match.players.includes(playerName)) {
        matches.push(match);
      }
    }

    return matches;
  }

  // @TODO: test:
  parseMatchInfo(fileInfo) {
    const matches = fileInfo.split("Match: ");

    matches.shift();

    const results = {};

    matches.forEach((match) => {
      const lines = match.trim().split("\n");
      const matchNo = parseInt(lines[0]);
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
