import axios from 'axios';

const url = 'http://localhost:4000/user';
const url2 = 'http://localhost:4000/artists';

export const fetchProfile = (email) => axios.get(url, {params : {email}});
export const registerUser = (user) => axios.post(url, user);
export const updateTopArtists = (id, list) => axios.patch(`${url}/${id}/updateTopArtists`, {list}); 
export const fetchTopArtists = (id) => axios.get(`${url}/${id}/getTopArtists`);
export const updateGenres = (id, header) => axios.get(`${url2}/${id}/updateGenres`, header);
export const createPlaylist = (id, body) => axios.post(`${url2}/${id}/createPlaylist`, body);