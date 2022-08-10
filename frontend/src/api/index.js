import axios from 'axios';

const url = 'http://localhost:4000/user';

export const fetchProfile = (email) => axios.get(url, {withCredentials : true, crossdomain : true, params : {email}});
export const registerUser = (user) => axios.post(url, user);
export const updateTopArtists = (list, id) => axios.patch(`${url}/${id}`, {list}); 
export const fetchTopArtists = (id) => axios.get(`${url}/${id}`);