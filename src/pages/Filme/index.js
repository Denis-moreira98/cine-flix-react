import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

import "./filme-info.css";

import api from "../../services/api";

function Filme() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [filme, setFilme] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadFilme() {
         await api
            .get(`/movie/${id}`, {
               params: {
                  api_key: "54b976055abc872f37796ede8b6772b4",
                  language: "pt-BR",
               },
            })
            .then((response) => {
               setFilme(response.data);
               setLoading(false);
            })
            .catch(() => {
               console.log("filme não encontrado");
               navigate("/", { replace: true });
               return;
            });
      }
      loadFilme();

      return () => {};
   }, [navigate, id]);

   function salvarFilme() {
      const minhaLista = localStorage.getItem("@primeflix");

      let filmesSalvos = JSON.parse(minhaLista) || [];

      const hasFilme = filmesSalvos.some(
         (filmesSalvos) => filmesSalvos.id === filme.id
      );
      if (hasFilme) {
         toast.warn("Esse filme já está na sua lista!");
         return;
      }
      filmesSalvos.push(filme);
      localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
      toast.success("Filme salvo com sucesso!");
   }

   if (loading) {
      return (
         <div className="filme-info">
            <h1>Carregando detalhes</h1>
         </div>
      );
   }

   return (
      <div className="filme-info">
         <h1>{filme.title}</h1>
         <img
            src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
            alt={filme.title}
         />
         <h3>Sinopse</h3>
         <span>{filme.overview}</span>
         <strong>
            Avaliação: {filme.vote_average.toFixed(1)} {"  "}
            <FaStar size={20} color="#f1e149" />
         </strong>
         <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
               <a
                  target="blank"
                  rel="external"
                  href={`http://youtube.com/results?search_query=${filme.title} Trailer`}
               >
                  Trailer
               </a>
            </button>
         </div>
      </div>
   );
}

export default Filme;
