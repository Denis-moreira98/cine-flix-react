import { useEffect, useState } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
   const [filmes, setFilmes] = useState([]);

   useEffect(() => {
      const minhaLista = localStorage.getItem("@primeflix");
      setFilmes(JSON.parse(minhaLista) || []);
   }, []);

   function excluirFilme(id) {
      let filtroFilmes = filmes.filter((item) => {
         return item.id !== id;
      });

      setFilmes(filtroFilmes);
      localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
      toast.success("Filme removido com sucesso!");
   }

   return (
      <div className="meus-filmes">
         <h1>Meus filmes</h1>

         {filmes.length === 0 && (
            <span>Você não possui nenhum filme salvo ☹️ </span>
         )}

         <ul>
            {filmes.map((item) => {
               return (
                  <li key={item.id}>
                     <div className="div_poster">
                        <img
                           src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                           alt="poster"
                        />
                        <span>{item.title}</span>
                     </div>

                     <div>
                        <Link to={`/filme/${item.id}`}>Detalhes</Link>
                        <button
                           className="button-delete"
                           onClick={() => excluirFilme(item.id)}
                        >
                           Excluir
                        </button>
                     </div>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

export default Favoritos;
