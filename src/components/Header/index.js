import "./header.css";
import { Link } from "react-router-dom";
// import LogoImg from "../../assets/logo.png";
//import { logoSvg } from "../../assets/logo2.svg";

function Header() {
   return (
      <header>
         <div className="nav-header">
            <Link className="logo" to="/">
               <img
                  src={require("../../assets/logo2.svg").default}
                  alt="logo"
               />
            </Link>
            <Link className="favoritos" to="/favoritos">
               Meus favoritos
            </Link>
         </div>
      </header>
   );
}

export default Header;
