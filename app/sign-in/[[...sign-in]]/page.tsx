// import { SignIn } from "@clerk/nextjs";

// export default function SignInPage() {
//   return (
//     <main className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
//       <SignIn />
//     </main>
//   );
// }

// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a1628",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#c9a84c",
          }}
        >
          wa<span style={{ color: "#f8f4ed" }}>ya</span>
        </div>
        <p
          style={{
            color: "#f8f4ed",
            opacity: 0.5,
            fontSize: "0.85rem",
            marginTop: "0.5rem",
          }}
        >
          Connectez-vous pour accéder à votre espace
        </p>
      </div>
      <SignIn />
    </div>
  );
}
