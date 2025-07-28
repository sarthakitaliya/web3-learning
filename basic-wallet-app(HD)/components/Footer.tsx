import { Github, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-4 px-7 border-t-[0.2px] border-gray-400 dark:border-gray-700 flex gap-4">
      <Link href="https://x.com/sarthaktwtt">
        <Twitter className="size-5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400" />
      </Link>
      <Link href="https://github.com/sarthakitaliya">
        <Github className="size-5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400" />
      </Link>
    </footer>
  );
};

export default Footer;
