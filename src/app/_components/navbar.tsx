import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-background p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="justfy-center flex items-center gap-4 text-xl font-bold text-[#e06666]"
        >
          <Image src="/Untitled-1.png" alt="Momentum Logo" width={32} height={32} />
          MOMENTUM
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-[#e06666] hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-[#e06666] hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-[#e06666] hover:text-gray-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
