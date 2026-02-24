const Footer = () => {
    return (
        <footer className="w-full py-8 border-t border-white/10 mt-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-neutral-500">
                <p>&copy; {new Date().getFullYear()} Richie Lagito. All Rights Reserved.</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0 text-center">
                    <span>Jakarta, Indonesia</span>
                    <span>Local Time: {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" })}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
