import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Resume", to: "/resume" },
  { label: "Contact", to: "/contact" },
  { label: "Playground", to: "/playground" },
];

export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-frosted shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Code2
            size={20}
            className="text-accent transition-transform duration-200 group-hover:rotate-12"
          />
          <span
            className="font-mono text-sm font-semibold tracking-tight"
            style={{ color: "var(--color-ink)" }}
          >
            portfolio.dev
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive(link.to) ? "text-accent" : "text-muted hover:text-ink"
                }`}
                style={
                  isActive(link.to)
                    ? { color: "var(--color-accent)" }
                    : { color: "var(--color-muted)" }
                }
                onMouseEnter={(e) => {
                  if (!isActive(link.to)) {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.to)) {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
                  }
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-md"
                    style={{ backgroundColor: "rgb(110 139 255 / 0.1)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md transition-colors"
          style={{ color: "var(--color-muted)" }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden navbar-frosted border-t"
            style={{ borderColor: "var(--color-line)" }}
          >
            <ul className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block px-3 py-2.5 text-sm font-medium rounded-md transition-colors"
                    style={{
                      color: isActive(link.to) ? "var(--color-accent)" : "var(--color-muted)",
                      backgroundColor: isActive(link.to) ? "rgb(110 139 255 / 0.1)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
