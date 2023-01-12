
import axios from "axios";

const BASE_URL = "https://agathe-power.onrender.com/api/";

let TOKEN
if (localStorage.getItem("persist:root") !== null){
TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken 
}


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});