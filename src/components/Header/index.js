import "./header.css";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

function Header() {
   return (
      <header>
         <div className="nav-header">
            <Link className="logo" to="/">
               <img src={LogoImg} alt="logo" />
            </Link>
            <Link className="favoritos" to="/favoritos">
               Meus favoritos
            </Link>
         </div>
      </header>
   );
}

export default Header;
