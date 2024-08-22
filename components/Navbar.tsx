import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import Logout from './Logout';
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-background">
      <Link href="/" className="flex items-center text-2xl font-bold">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <circle cx="12" cy="12" r="11" stroke="#1DB954" stroke-width="2"/>
          <path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12" stroke="#1DB954" stroke-width="2" stroke-linecap="round"/>
          <path d="M9 14C9 12.8954 10.3431 12 12 12C13.6569 12 15 12.8954 15 14" stroke="#1DB954" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="16" r="1" fill="#1DB954"/>
        </svg>
        LikeMix
      </Link>
      <div className="flex items-center space-x-4">
        {session && <Logout />}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;