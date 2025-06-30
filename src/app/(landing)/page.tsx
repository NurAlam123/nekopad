import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Heros from "./_components/Heros";

const LandingPage = () => {
  return (
    <div className="h-svh min-h-full flex flex-col">
      <div className="flex flex-col justify-center items-center md:grid md:grid-cols-3 place-items-center text-center gap-4 md:gap-8 flex-1 px-6 pb-10">
        <Heading />
        <Heros />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
