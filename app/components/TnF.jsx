import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toolsData from "../json/toolsData.json";
import { faReact, faJs, faHtml5, faCss3Alt, faFigma, faGitAlt, faNodeJs, faVuejs, faAngular, faPython, faBootstrap, faFlutter } from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

// Peta ikon tetap sama
const iconMap = {
    faReact,
    faJs,
    faHtml5,
    faCss3Alt,
    faFigma,
    faGitAlt,
    faNodeJs,
    faVuejs,
    faAngular,
    faDatabase,
    faPython,
    faBootstrap,
    faFlutter,
};

// Komponen helper untuk satu item tool
const ToolItem = ({ tool }) => (
    <div className="marquee-item">
        <FontAwesomeIcon icon={iconMap[tool.icon] || faDatabase} size="3x" style={{ color: tool.color }} />
        <span className="mt-3 text-white text-sm font-semibold text-center">{tool.name}</span>
    </div>
);

// Komponen helper untuk satu baris marquee
const MarqueeRow = ({ tools, reverse = false }) => (
    <div className="marquee-container my-4">
        <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
            {/* Render pertama kali */}
            {tools.map((tool) => (
                <ToolItem key={tool.name} tool={tool} />
            ))}
            {/* Duplikasi untuk loop mulus */}
            {tools.map((tool) => (
                <ToolItem key={`${tool.name}-dup`} tool={tool} />
            ))}
        </div>
    </div>
);

const ToolsAndFrameworks = () => {
    // Memisahkan data
    const frontendTools = toolsData.find((cat) => cat.category === "Frontend")?.tools || [];
    const otherTools = toolsData.filter((cat) => cat.category !== "Frontend").flatMap((cat) => cat.tools);

    return (
        <section id="tools-section" className="mb-40">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Tools & Frameworks</h2>

            <div className="flex flex-col gap-6">
                {/* Baris pertama: Frontend (Maju) */}
                <MarqueeRow tools={frontendTools} />

                {/* Baris kedua: Sisanya (Mundur) */}
                <MarqueeRow tools={otherTools} reverse={true} />
            </div>
        </section>
    );
};

export default ToolsAndFrameworks;
