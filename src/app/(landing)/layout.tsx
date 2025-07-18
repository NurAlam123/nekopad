import Navbar from "./_components/Navbar";

interface Props {
  children: React.ReactNode;
}

const LandingPageLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default LandingPageLayout;
