import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Homies
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="text-white hover:text-gray-200">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-white hover:text-gray-200">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
