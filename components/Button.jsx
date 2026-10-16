export default function Button({ href, variant = "secondary", external = false, className = "", children }) {
    const rel = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
        <a href={href} className={`btn ${variant === "primary" ? "btn-primary" : ""} ${className}`} {...rel}>
            {children}
        </a>
    );
}
