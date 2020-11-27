import axios from 'axios';

export default {
  listAlbums() {
    return axios.get('../assets/json/albums.json')
      .then(response => { 
        return response.data.albums;
      });
  }
}