const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
Promise.promisifyAll(fs);
const xml2js = require('xml2js');
const vision = require('@google-cloud/vision');

const filePath = path.join(__dirname, './images/img.jpeg');
const apiKeyPath = path.join(__dirname,'visionApiAuth/ApiKey.json' );
const { getGameInfoApi, getIdApi } = require('./api/boardGameGeekApi.js')

const client = new vision.ImageAnnotatorClient({
  keyFilename: apiKeyPath
});
const parser = new xml2js.Parser({trim: true, mergeAttrs: true})

const getImageText = async () => {
  try {
    let data = await client.textDetection(filePath)
    return data[0].fullTextAnnotation.text
  } catch (err) {
    console.log(err)
  }
};

exports.saveFile = async (file) => {
  try {
    await fs.writeFileAsync(filePath, file, {encoding: 'base64'})
    let text = await getImageText();
    return text
  } catch(err) {
    console.log('error writing file', err)
    return err
  }
};

exports.getGameId = async (wordsArray) => {
  console.log(wordsArray)
  //need to find game title?
  let id = await getIdApi()
  //with id convert into json
  //check of each result for closes match to get id
  //return id
  return
};

exports.getGameInfo = async (gameId) => {
  let gameStats = await getGameInfoApi(gameId);
  let format = await parser.parseStringPromise(gameStats.data)
  console.log(format.boardgames.boardgame)
  return format.boardgames.boardgame
};
