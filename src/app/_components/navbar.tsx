import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-background p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white text-[#e06666]">
          MOMENTUM
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-300 text-[#e06666]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-gray-300 text-[#e06666]">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-gray-300 text-[#e06666]">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
