import Logo from "@/assets/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-between p-4 flex-col md:flex-row gap-2">
      <div className="flex items-center gap-1">
        <Logo className="w-10 h-10" />
        <p className="font-semibold font-inter">Nekopad</p>
      </div>

      <div className="flex flex-col md:flex-row gap-1 text-muted-foreground">
        <Link href="/" className="w-fit md:px-4 hover:underline">
          Privacy Policy
        </Link>

        <Link href="/" className="w-fit md:px-4 hover:underline">
          Terms &amp; Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
