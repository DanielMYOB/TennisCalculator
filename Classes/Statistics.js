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
  }

  //
  addMatchStatistics(matchStats) {
    // *    2: {
    // *    winnerName: 'Person A',
    // *    loserName: 'Person B',
    // *    winnerScore: 2,
    // *    loserScore: 0
    // * }
    // push record to global map.
  }

  getMatchStatisticsById(matchId) {
    // matchId = 2,
    // returns:
    //  {
    //     winnerName: 'Person A',
    //     loserName: 'Person B',
    //     winnerScore: 2,
    //     loserScore: 0
    //  }
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
}

module.exports = Statistics;
