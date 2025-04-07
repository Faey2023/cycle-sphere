import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-5 shadow-lg relative z-10">
      <Link to="/">
        <img
          className="w-45 md:w-[250px] h-[50px]"
          src="../assets/logo.png"
          alt="cycle-sphere-logo"
        />
      </Link>
      <ul className="hidden md:flex space-x-6">
        <li>
          <Link to="/" className="text-black  font-medium px-2 py-1 rounded-md hover:bg-gray-100">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/allBicycles"
            className="text-black   font-medium px-2 py-1 rounded-md hover:bg-gray-100"
          >
            All Bicycles
          </Link>
        </li>
        <li>
          <Link
            to="/aboutUs"
            className="text-black   font-medium px-2 py-1 rounded-md hover:bg-gray-100"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/checkout"
            className="text-black   font-medium px-2 py-1 rounded-md hover:bg-gray-100"
          >
            Checkout
          </Link>
        </li>
      </ul>

      <Button asChild>
        <Link to="/signUp">Sign Up</Link>
      </Button>

      <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
        <span
          className={`block w-6 h-1 bg-black my-1 transition-all duration-300 transform ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-1 bg-black my-1 transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-1 bg-black my-1 transition-all duration-300 transform ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        ></span>
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 w-3/5 h-full bg-white p-8 transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul>
          <li>
            <Link
              to="/"
              className="text-black text-sm font-medium px-2 py-1 rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allBicycles"
              className="text-black text-sm font-medium px-2 py-1 rounded-md hover:bg-gray-100"
            >
              All Bicycles
            </Link>
          </li>
          <li>
            <Link
              to="/aboutUs"
              className="text-black text-sm font-medium px-2 py-1 rounded-md hover:bg-gray-100"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="text-black text-sm font-medium px-2 py-1 rounded-md hover:bg-gray-100"
            >
              Checkout
            </Link>
          </li>
        </ul>

        <Button asChild>
          <Link to="/signUp">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
