import { Link } from "react-router-dom";
import logo from "../../../public/yfn.png"; // adjust path based on your setup

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="App Logo" className="h-40 w-40" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
