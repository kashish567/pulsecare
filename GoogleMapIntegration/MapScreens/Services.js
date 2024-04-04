import axios from "axios";

const BASE_URL= "https://maps.googleapis.com/maps/api/place";
const API_KEY="AIzaSyBuzdncg4T0lTNQ_UQyDuLzrIMyD_GvQwA"

const nearBYPlaces = (latitude,longitude,type) => {
  return axios.get(BASE_URL + "/nearbysearch/json?" + "&location="+latitude+","+longitude+"&radius=1500&type="+type+"&key="+API_KEY);
};

const searchByText = (searchText) => axios.get(BASE_URL+"/textsearch/json?query="+searchText+"&key="+API_KEY)

export default { nearBYPlaces,API_KEY,searchByText };
