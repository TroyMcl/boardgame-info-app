const axios = require('axios');

exports.getIdApi = (searchString) => {
  return axios.get(`https://boardgamegeek.com/xmlapi/search?search=${searchString}`)
};

exports.getGameInfoApi = (gameId) => {
  return axios.get(`https://boardgamegeek.com/xmlapi/boardgame/${gameId}?stats=1`)
}