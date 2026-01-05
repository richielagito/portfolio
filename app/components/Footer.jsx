const Footer = () => {
    return (
        <footer className="bg-black py-10">
            <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-center">
                <p className="text-white/80 text-sm sm:text-base tracking-wide">
                    &copy; 2025 - {new Date().getFullYear()} <span className="text-white">Richie Lagito</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
