import GradientASCII from "./GradientASCII";

// One instance: behind the head on small screens, fixed full-viewport from lg up.
export default function Background({ fontFamily }) {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute opacity-60 lg:opacity-100 inset-x-0 top-0 z-0 h-[34rem] [mask-image:linear-gradient(to_bottom,#000_45%,transparent_95%)] lg:fixed lg:inset-0 lg:h-auto lg:[mask-image:none]"
        >
            <GradientASCII
                colors={["#3b3b3b", "#858585", "#d4d4d4", "#ffffff"]}
                shape="horizon"
                characters=" .:-=+*x#%@"
                cellSize={14}
                density={0.75}
                glyphOpacity={0.95}
                gradientOpacity={0.24}
                glow={0}
                grain={0.05}
                flicker={0.15}
                speed={0.6}
                clickEffect="none"
                dpr={1.5}
                fontFamily={fontFamily}
            />
        </div>
    );
}
