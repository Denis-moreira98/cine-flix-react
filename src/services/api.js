import axios from "axios";

//BASE DA URL: https://api.themoviedb.org/3

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=54b976055abc872f37796ede8b6772b4&language=pt-BR

const api = axios.create({
   baseURL: "https://api.themoviedb.org/3",
});

export default api;
