import MyIcon from "./MyIcon";

export default function Hero() {
  return (
    <section>
      <div className="px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div>
            <MyIcon />
          </div>
          <div className="flex flex-col text-[#111111]">
            <h1 className="text-5xl sm:text-6xl md:text-[128px] sm:text-left text-center">
              FitPlan
            </h1>
            <p className="text-xl sm:text-2xl md:text-[40px] -mt-2 sm:-mt-4 md:-mt-5">
              Monte seu treino ou sua dieta
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-10 gap-4 sm:gap-0 text-center sm:text-left">
          <a
            href="#"
            className="px-4 sm:px-6 md:px-10 py-2 sm:py-3 text-lg sm:text-xl md:text-[32px] text-[#f5f5f5] bg-[#111111] border-2 border-transparent rounded-[5px] hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-colors duration-300 ease-in-out"
          >
            Monte seu treino
          </a>
          <a
            href="#"
            className="px-4 sm:px-6 md:px-10 py-2 sm:py-3 text-lg sm:text-xl md:text-[32px] text-[#f5f5f5] bg-[#111111] border-2 border-transparent rounded-[5px] hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-colors duration-300 ease-in-out"
          >
            Monte seu treino
          </a>
        </div>
      </div>
    </section>
  );
}
