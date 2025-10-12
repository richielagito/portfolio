import Beams from "./Beams.jsx";
import RotatingText from "./RotatingText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <header className="relative w-full h-screen flex items-center justify-center text-start overflow-hidden bg-gray-100">
            <div style={{ width: "100%", height: "100vh", position: "absolute" }}>
                <Beams beamWidth={3} beamHeight={30} beamNumber={20} lightColor="#ffffff" speed={2} noiseIntensity={1.75} scale={0.2} rotation={30} />
            </div>
            <div id="header-content" className="relative z-10 p-5 w-[90%] max-w-5xl flex flex-col items-center md:items-start justify-center">
                <div className="mb-3 flex flex-col justify-start md:flex-row items-center gap-4 mb-6">
                    <h1 className="text-center text-4xl md:text-4xl lg:text-5xl font-bold text-white" style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.5)" }}>
                        Websites Should Be {""}
                    </h1>
                    <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white" style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.5)" }}>
                        <RotatingText
                            texts={["Simple.", "Responsive.", "Cool!"]}
                            mainClassName="px-3 sm:px-3 md:px-4 backdrop-blur-md border border-white/20 bg-white/15 shadow-lg text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-full"
                            staggerFrom={"last"}
                            initial={{ y: "1.2em" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-1.2em" }}
                            staggerDuration={0.025}
                            splitLevelClassName="inline-block overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </h1>
                </div>
                <p className="text-md md:text-md lg:text-lg text-white text-center md:text-start max-w-lg lg:max-w-xl" style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.5)" }}>
                    I'm a Front-end Web Developer passionate about creating functional and visually beautiful experiences.
                </p>
                <div className="mt-8">
                    <a href="#about" className="inline-flex items-center bg-white text-black font-semibold py-3 px-6 rounded-full shadow-lg group transition-transform duration-300 ease-in-out hover:scale-105">
                        Know Me More
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2 transition-transform duration-300 ease-in-out group-hover:rotate-45" />
                    </a>
                </div>
            </div>
            <a href="#about" aria-label="Scroll to top" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer">
                <div className="w-10 h-10 text-gray-700 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
            </a>
        </header>
    );
};

export default Header;
