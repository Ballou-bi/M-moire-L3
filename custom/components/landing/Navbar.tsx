import Link from "next/link";

// import { Show, SignInButton, SignOutButton } from "@clerk/nextjs";

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

      {/* <div className="flex gap-4">
         Utilisateur déconnecté 
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="nav-cta flex items-center justify-center">
              Se connecter
            </button>
          </SignInButton>
        </Show>

        Utilisateur connecté 
        <Show when="signed-in">
          <SignOutButton>
            <button className="btn-outline flex items-center justify-center">
              Se déconnecter
            </button>
          </SignOutButton>
        </Show>
      </div> */}
    </nav>
  );
}
