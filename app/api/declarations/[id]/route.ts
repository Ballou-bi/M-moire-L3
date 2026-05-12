// // app/api/declarations/[id]/route.ts
// // GET   → détail d'une déclaration
// // PATCH → valider ou rejeter (officier/admin uniquement)

// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// type Params = { params: Promise<{ id: string }> };

// // ── GET /api/declarations/:id ──
// export async function GET(_req: Request, { params }: Params) {
//   const { userId } = await auth();
//   if (!userId)
//     return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

//   const { id } = await params;
//   const user = await prisma.user.findUnique({ where: { clerkId: userId } });
//   if (!user)
//     return NextResponse.json(
//       { error: "Utilisateur introuvable" },
//       { status: 404 },
//     );

//   const declaration = await prisma.declaration.findUnique({
//     where: { id },
//     include: {
//       citoyen: {
//         select: { prenom: true, nom: true, email: true, telephone: true },
//       },
//       officierValidateur: { select: { prenom: true, nom: true } },
//       demandes: true,
//     },
//   });

//   if (!declaration)
//     return NextResponse.json(
//       { error: "Déclaration introuvable" },
//       { status: 404 },
//     );

//   // Citoyen ne peut voir que ses propres déclarations
//   if (user.role === "CITOYEN" && declaration.citoyenId !== user.id) {
//     return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
//   }

//   return NextResponse.json(declaration);
// }

// // ── PATCH /api/declarations/:id ──
// // Body: { action: "valider" | "rejeter", motifRejet?: string, numeroActe?: string }
// export async function PATCH(req: Request, { params }: Params) {
//   const { userId } = await auth();
//   if (!userId)
//     return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

//   const { id } = await params;
//   const user = await prisma.user.findUnique({ where: { clerkId: userId } });
//   if (!user)
//     return NextResponse.json(
//       { error: "Utilisateur introuvable" },
//       { status: 404 },
//     );

//   // Seul officier ou admin peut valider/rejeter
//   if (user.role === "CITOYEN") {
//     return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
//   }

//   const { action, motifRejet, numeroActe } = await req.json();

//   if (action === "valider") {
//     const updated = await prisma.declaration.update({
//       where: { id },
//       data: {
//         statut: "VALIDEE",
//         numeroActe: numeroActe ?? `ACT-${Date.now()}`,
//         dateValidation: new Date(),
//         officierIdValidateur: user.id,
//         motifRejet: null,
//       },
//     });
//     return NextResponse.json(updated);
//   }

//   if (action === "rejeter") {
//     if (!motifRejet) {
//       return NextResponse.json(
//         { error: "Motif de rejet obligatoire" },
//         { status: 400 },
//       );
//     }
//     const updated = await prisma.declaration.update({
//       where: { id },
//       data: {
//         statut: "REJETEE",
//         motifRejet,
//         officierIdValidateur: user.id,
//       },
//     });
//     return NextResponse.json(updated);
//   }

//   return NextResponse.json({ error: "Action invalide" }, { status: 400 });
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth-guard";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const guard = await requireAuth();
  if (!guard.ok) return guard.response;
  const { user } = guard;
  const { id } = await params;

  const declaration = await prisma.declaration.findUnique({
    where: { id },
    include: {
      citoyen: {
        select: { prenom: true, nom: true, email: true, telephone: true },
      },
      officierValidateur: { select: { prenom: true, nom: true } },
      demandes: true,
    },
  });

  if (!declaration)
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  // Ownership : citoyen ne voit que ses propres déclarations
  // On répond 404 et non 403 pour ne pas révéler que la ressource existe
  if (user.role === "CITOYEN" && declaration.citoyenId !== user.id) {
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  }

  return NextResponse.json(declaration);
}

export async function PATCH(req: Request, { params }: Params) {
  const guard = await requireRole(["OFFICIER", "ADMIN"]);
  if (!guard.ok) return guard.response;
  const { user } = guard;
  const { id } = await params;

  const { action, motifRejet, numeroActe } = await req.json();

  if (action === "valider") {
    const updated = await prisma.declaration.update({
      where: { id },
      data: {
        statut: "VALIDEE",
        numeroActe: numeroActe ?? `ACT-${Date.now()}`,
        dateValidation: new Date(),
        officierIdValidateur: user.id,
        motifRejet: null,
      },
    });
    return NextResponse.json(updated);
  }

  if (action === "rejeter") {
    if (!motifRejet)
      return NextResponse.json({ error: "Motif obligatoire" }, { status: 400 });
    const updated = await prisma.declaration.update({
      where: { id },
      data: { statut: "REJETEE", motifRejet, officierIdValidateur: user.id },
    });
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Action invalide" }, { status: 400 });
}
