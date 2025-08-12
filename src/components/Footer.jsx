const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 py-10">
            <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-center">
                <p className="text-white/80 text-sm sm:text-base tracking-wide">
                    &copy; 2025 <span className="font-semibold text-white">Richie Lagito</span>. Created with passion.
                </p>
                <span className="text-white/50 text-xs">Monochrome Theme</span>
            </div>
        </footer>
    );
};

export default Footer;
