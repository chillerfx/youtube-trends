import Axios from 'axios';
import * as config from '../config.json';
import moment from "moment";

const axios = Axios.create({
  baseURL: config.youtubeApi.endpoint
});

export class YoutubeService {
  /* @TODO with some country codes Youtube service returns status 400 */
  getTrendingVideos(countryCode = 'US') {
    const params = {
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: countryCode,
      maxResults: '24',
      key: config.youtubeApi.key
    };

    let result = [];

    return axios.get('/', {params}).then(function(res){
      result = res.data.items;
      for (let i = 0; i < result.length; i++) {
        result[i] = {
          id: result[i].id,
          title: result[i].snippet.title,
          thumbnail: result[i].snippet.thumbnails.high.url,
          publishedAt: moment(result[i].snippet.publishedAt).fromNow()
        };
        result[i] = YoutubeService.getVideoDetails(result[i]);
      }

      return result;
    }).catch(e => {
      console.log(`${e}`)
    });

  }

  static getVideoDetails(video) {
    const params = {
      part: 'statistics',
      id: video.id,
      key: config.youtubeApi.key
    };

    return axios.get('/', {params}).then(function(res) {
      const result = res.data;
      video.viewCount = result['items'][0].statistics.viewCount;
      video.likeCount = result['items'][0].statistics.likeCount;

      return video;
    });
  }
}
