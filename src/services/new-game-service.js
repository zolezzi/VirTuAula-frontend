const axios = require("axios");
const newGameService = (function() {
  function fetchNewGames(token, accountId) {
    return axios.get(`/api/new-games/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function createNewGame(token, accountId, formData) {
    return axios.post(`/api/new-games/create/${accountId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function assignPlayerToNewGame(token, newGameId, accountId, players) {
    return axios.post(
      `/api/new-games/assign/${newGameId}/${accountId}`,
      players,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  return {
    fetchNewGames: fetchNewGames,
    createNewGame: createNewGame,
    assignPlayerToNewGame: assignPlayerToNewGame,
  };
})();

module.exports = newGameService;
