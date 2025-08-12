import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

const Contact = () => (
    <section id="kontak" className="text-center mb-20 ">
        <div data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4 text-white">Got something in mind?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">I’m always open to collaborations, new ideas, and projects that push creative boundaries. Let's talk!</p>
            <div className="mt-4">
                <a href="https://www.github.com/richielagito" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white mx-4 transition-color duration-300 ease-in-out">
                    <FontAwesomeIcon icon="fa-brands fa-github" size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/richie-lagito-8769bb226" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white mx-4 transition-color duration-300 ease-in-out">
                    <FontAwesomeIcon icon="fa-brands fa-linkedin" size="2x" />
                </a>
                <a href="https://www.instagram.com/richielagito_/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white mx-4 transition-color duration-300 ease-in-out">
                    <FontAwesomeIcon icon="fa-brands fa-square-instagram" size="2x" />
                </a>
            </div>
        </div>
    </section>
);

export default Contact;
