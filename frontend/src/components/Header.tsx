import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="h-[64px]">
      <div className="flex w-full gap-4 px-10 py-5 bg-gray-200">
        <Link
          to="/"
          className="hover:text-gray-600 hover:underline decoration-gray-600"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-gray-600 hover:underline decoration-gray-600"
        >
          About
        </Link>
        <Link
          to="/signIn"
          className="hover:text-gray-600 hover:underline decoration-gray-600"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
