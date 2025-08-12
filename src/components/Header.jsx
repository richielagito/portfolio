import LiquidChrome from "./LiquidChrome.jsx";
import Beams from "./Beams.jsx";
import TextType from "./TextType.jsx";

const Header = () => {
    return (
        <header className="relative w-full h-screen flex items-center justify-center text-start overflow-hidden bg-gray-100">
            {/* <div style={{ width: "100%", height: "100vh", position: "absolute" }}>
                <LiquidChrome baseColor={[0.15, 0.1, 0.15]} speed={0.3} amplitude={0.3} interactive={false} />
            </div> */}
            <div style={{ width: "100%", height: "100vh", position: "absolute" }}>
                <Beams beamWidth={3} beamHeight={30} beamNumber={20} lightColor="#ffffff" speed={2} noiseIntensity={1.75} scale={0.2} rotation={30} />
            </div>
            <div id="header-content" className="relative z-10 p-10 w-full max-w-5xl flex flex-col justify-start">
                <div className="mb-3">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white" style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.5)" }}>
                        Code You Can {""}
                        <TextType text={["Feel.", "Experience.", "Enjoy."]} typingSpeed={75} pauseDuration={3000} showCursor={true} cursorCharacter="|" />
                    </h1>
                </div>
                <p className="text-sm md:text-md lg:text-lg text-white max-w-2xl" style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.5)" }}>
                    I'm a Front-end Web Developer passionate about creating functional and visually beautiful experiences.
                </p>
            </div>
            <a href="#proyek" aria-label="Scroll to top" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer">
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
