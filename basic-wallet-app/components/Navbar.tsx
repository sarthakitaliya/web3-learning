import { Wallet } from "lucide-react";
import ThemeToggle from "./theme-toggle";


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <Wallet className="size-7" />
        <h1 className="text-xl font-semibold sm:text-2xl sm:font-bold">Privy</h1>
      </div>
    <ThemeToggle/>
    </nav>
  );
};

export default Navbar;
