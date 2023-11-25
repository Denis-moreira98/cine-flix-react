import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";
import { FaStar } from "react-icons/fa";

// https://api.themoviedb.org/3/movie/now_playing?api_key=54b976055abc872f37796ede8b6772b4&language=pt-BR

function Home() {
   const [filmes, setFilmes] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadFilmes() {
         const response = await api.get("movie/now_playing", {
            params: {
               api_key: "54b976055abc872f37796ede8b6772b4",
               language: "pt-BR",
               page: 1,
            },
         });
         //console.log(response.data.results.slice(0, 10));
         setFilmes(response.data.results.slice(0, 15));
         setLoading(false);
      }

      loadFilmes();
   }, []);

   if (loading) {
      return (
         <div className="loading">
            <h2>Carregando filmes...</h2>
         </div>
      );
   }

   return (
      <div className="container">
         <h1>Confira os últimos lançamentos do cinema</h1>
         <div className="lista-filmes">
            {filmes.map((filme) => {
               return (
                  <div className="filmes-container" key={filme.id}>
                     <article>
                        <img
                           src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                           alt={filme.title}
                        />
                        <strong>{filme.title}</strong>

                        <strong>
                           <FaStar size={20} color="#f1e149" /> {"  "}
                           {filme.vote_average.toFixed(1)} {"  "}
                        </strong>
                        <Link className="button-link" to={`/filme/${filme.id}`}>
                           Acessar
                        </Link>
                     </article>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Home;
