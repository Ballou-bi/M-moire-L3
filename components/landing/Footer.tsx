import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <Link href="/" className="logo">
        Wa<span>ya</span>
      </Link>
      <p className="footer-copy">
        Mémoire L3 — Application Web et Mobile &mdash; 2025
      </p>
      <div className="footer-links">
        <Link href="/confidentialite">Politique de confidentialité</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/docs">Documentation API</Link>
      </div>
    </footer>
  );
}
