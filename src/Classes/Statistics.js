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

  formatMatchStats(matchData) {
    // and return a payload like:
    //  {
    //     winnerName: 'Person A',
    //     loserName: 'Person B',
    //     winnerScore: 2,
    //     loserScore: 0
    //  }
    const players = matchData.players;
    const points = matchData.points;
  }

  getPlayerStatisticsByPlayerName(playerName) {
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

  // @TODO: another method for adding won/loss games,
  addPlayerStatisticsByPlayerName({ playerName, gamesWon, gamesLost }) {
    // playerName: `Person A`,
    // gamesWon: 5,
    // gamesLoss: 2
    // logic:
    // first check if the player exists yet or not.
    // if yes, just increment the values won/lost.
    // if not, push a new object to the map.
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
