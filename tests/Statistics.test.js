const Statistics = require("../src/Classes/Statistics");
const mockFileInfo = require("./mocks/mockFileInfo.js");
const mockFileResults = require("./mocks/mockFileResults.js");

describe("Statistics", () => {
  let statistics;

  beforeEach(() => {
    statistics = new Statistics();
  });

  describe("-> parseMatchInfo", () => {
    it("should parse correctly", () => {
      statistics.parseMatchInfo(mockFileInfo);
      const rawMatchStats = statistics.getResults();
      expect(rawMatchStats).toEqual(mockFileResults);
    });
  });

  describe("-> formatIndividualMatchStats", () => {
    it("should format match stats correctly for existing match", () => {
      statistics.parseMatchInfo(mockFileInfo);
      const matchStats = statistics.getMatchStatisticsById(1);

      const res = statistics.formatIndividualMatchStats(matchStats);
      expect(res).toEqual({
        loserName: "Person B",
        loserSets: 0,
        winnerName: "Person A",
        winnerSets: 2,
      });
    });

    it("should return false for match that doesn't exist", () => {
      statistics.parseMatchInfo(mockFileInfo);
      const matchStats = statistics.getMatchStatisticsById(11);

      const res = statistics.formatIndividualMatchStats(matchStats);
      expect(res).toEqual(false);
    });
  });

  describe("-> getGamesWonLossByPlayer", () => {
    it("should return won/loss record for player with found matches", () => {
      statistics.parseMatchInfo(mockFileInfo);
      const playerStats = statistics.getGamesWonLossByPlayer("Person A");

      expect(playerStats).toEqual({ otherPlayerGames: 17, playerGames: 23 });
    });

    it("should return false for player with zero matches", () => {
      statistics.parseMatchInfo(mockFileInfo);
      const playerStats = statistics.getGamesWonLossByPlayer("Person D");

      expect(playerStats).toEqual(false);
    });
  });

  describe("-> totalGamesWonLostByPlayerName", () => {
    it("returns correct won/loss breakdown for player in position 0", () => {
      statistics.parseMatchInfo(mockFileInfo);
      const playerName = "Person A";
      const matchesByPlayer = statistics.findAllMatchesByPlayerName(playerName);
      const playerWonLoss = statistics.totalGamesWonLostByPlayerName(
        playerName,
        matchesByPlayer
      );

      expect(playerWonLoss).toEqual({ otherPlayerGames: 17, playerGames: 23 });
    });

    it("returns correct won/loss breakdown for player in position 1", () => {
      statistics.parseMatchInfo(mockFileInfo);
      const playerName = "Person B";
      const matchesByPlayer = statistics.findAllMatchesByPlayerName(playerName);
      const playerWonLoss = statistics.totalGamesWonLostByPlayerName(
        playerName,
        matchesByPlayer
      );

      expect(playerWonLoss).toEqual({ otherPlayerGames: 12, playerGames: 0 });
    });
  });

  describe("-> findAllMatchesByPlayerName", () => {
    it("finds matches for player with existing games", () => {
      statistics.parseMatchInfo(mockFileInfo);
      const playerName = "Person B";
      const matchesByPlayer = statistics.findAllMatchesByPlayerName(playerName);

      expect(matchesByPlayer).toEqual([
        {
          players: ["Person A", "Person B"],
          points: [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
          ],
        },
      ]);
    });
  });

  describe("-> calculateSetsFromMatch", () => {
    it("3-1", () => {
      const points = [
        ...Array.from({ length: 24 * 3 }, () => "0"),
        ...Array.from({ length: 24 }, () => "1"),
      ];
      const res = statistics.calculateSetsFromMatch(points);
      expect(res).toEqual({ playerASets: 3, playerBSets: 1 });
    });
    it("1-3", () => {
      const points = [
        ...Array.from({ length: 24 * 1 }, () => "0"),
        ...Array.from({ length: 24 * 3 }, () => "1"),
      ];
      const res = statistics.calculateSetsFromMatch(points);
      expect(res).toEqual({ playerASets: 1, playerBSets: 3 });
    });
  });

  describe("-> getGamesWonByPoints", () => {
    it("Player in position `0`, 18 - 6", () => {
      const points = [
        ...Array.from({ length: 24 * 3 }, () => "0"),
        ...Array.from({ length: 24 }, () => "1"),
      ];
      const res = statistics.getGamesWonByPoints({
        points,
        playerPoint: "0",
        otherPlayerPoint: "1",
      });
      expect(res).toEqual({ otherPlayerGames: 6, playerGames: 18 });
    });
    it("Player in position `1`, 6 - 18", () => {
      const points = [
        ...Array.from({ length: 24 * 3 }, () => "0"),
        ...Array.from({ length: 24 }, () => "1"),
      ];
      const res = statistics.getGamesWonByPoints({
        points,
        playerPoint: "1",
        otherPlayerPoint: "0",
      });
      expect(res).toEqual({ otherPlayerGames: 18, playerGames: 6 });
    });

    it("Can handle longer duece game", () => {
      const points = [
        ...Array.from({ length: 3 }, () => "0"),
        ...Array.from({ length: 3 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "1"),
        ...Array.from({ length: 1 }, () => "0"),
        ...Array.from({ length: 1 }, () => "0"),
      ];
      const res = statistics.getGamesWonByPoints({
        points,
        playerPoint: "0",
        otherPlayerPoint: "1",
      });
      expect(res).toEqual({ otherPlayerGames: 0, playerGames: 1 });
    });
  });
});
