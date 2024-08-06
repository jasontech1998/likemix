import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import Logout from './Logout';
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-background">
      <Link href="/" className="text-2xl font-bold">
        Spotify Shared
      </Link>
      <div className="flex items-center space-x-4">
        {session && <Logout />}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;