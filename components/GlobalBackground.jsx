import Particles from "./Particles";

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] bg-black">
            {/* Particles Background */}
            <div className="absolute inset-0 w-full h-full">
                <Particles
                    particleColors={["#ffffff", "#ffffff", "#ffffff"]}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    disableRotation={false}
                    pixelRatio={1}
                />
            </div>
        </div>
    );
};

export default GlobalBackground;
