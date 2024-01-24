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

  getMatchStatisticsById(matchId) {
    const rawMatchStatsById = this.getRawMatchStatsById(matchId);
    if (!rawMatchStatsById) {
      return false;
    }

    return rawMatchStatsById;
  }

  formatIndividualMatchStats({ players, points }) {
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

    const { playerASets, playerBSets } = this.calculateSetsFromMatch(points);

    return this.getWinnerLoserInfoFromSets({
      players,
      playerASets,
      playerBSets,
    });
  }

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

  totalGamesWonLostByPlayerName(playerName, matchesByPlayer) {
    const res = matchesByPlayer.map(({ players, points }) => {
      const playerPoint = playerName === players[0] ? "0" : "1";
      const otherPlayerPoint = playerPoint === "0" ? "1" : "0";

      return this.getGamesWonByPoints({
        points,
        playerPoint,
        otherPlayerPoint,
      });
    });

    return res.reduce(
      (accumulator, currentValue) => {
        accumulator.playerGames += currentValue.playerGames;
        accumulator.otherPlayerGames += currentValue.otherPlayerGames;
        return accumulator;
      },
      { playerGames: 0, otherPlayerGames: 0 }
    );
  }

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

  calculateSetsFromMatch(points) {
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

    return { playerASets, playerBSets };
  }

  getWinnerLoserInfoFromSets({ players, playerASets, playerBSets }) {
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
    return { winnerName, loserName, winnerSets, loserSets };
  }

  getGamesWonByPoints({ points, playerPoint, otherPlayerPoint }) {
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
  }
}

module.exports = Statistics;
