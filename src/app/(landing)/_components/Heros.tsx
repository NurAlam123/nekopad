import Image from "next/image";

const Heros = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative flex justify-center items-center rounded-xl overflow-hidden">
          <Image
            src="/nosey.gif"
            alt="Nosey Heros"
            width={1022}
            height={540}
            unoptimized
            draggable="false"
            className="dark:invert rounded-xl object-contain pointer-events-none select-none h-1/2 w-1/2 md:w-auto md:h-auto md:aspect-square"
          />
        </div>
      </div>
    </div>
  );
};

export default Heros;
