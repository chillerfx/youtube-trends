import express from 'express';
import * as config from '../config.json';
import { YoutubeService } from '../services/youtube';

const router = express.Router();
const service = new YoutubeService();

/* GET home page. */
router.get('/', async (req, res) => {
  const country = req.query.country
  const trends = await service.getTrendingVideos(country)
  Promise.all(trends)
  .then(trends => {
    res.render('youtube/index', {
      title: config.title,
      videos: trends,
      countries: config.countryList
    });
  })
});

router.get('/:videoId', async (req, res) => {
  res.render('youtube/player', {
    title: config.title,
    countries: config.countryList
  });
});

module.exports = router;
