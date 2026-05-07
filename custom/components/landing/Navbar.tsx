import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/" className="logo">
        Wa<span>ya</span>
      </Link>
      <ul>
        <li>
          <a href="#fonctionnalites">Fonctionnalités</a>
        </li>
        <li>
          <a href="#processus">Processus</a>
        </li>
        <li>
          <a href="#roles">Rôles</a>
        </li>
      </ul>
      <Link href="/login" className="nav-cta">
        Se connecter
      </Link>
    </nav>
  );
}
