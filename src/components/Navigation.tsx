import { useLocation, Link } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            COUNSELOR AI
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/"
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-gray-300 hover:text-blue-300 hover:bg-blue-500/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/atlas"
              className={`px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/atlas"
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-gray-300 hover:text-blue-300 hover:bg-blue-500/10"
              }`}
            >
              Atlas
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;