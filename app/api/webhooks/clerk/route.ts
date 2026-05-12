// app/api/webhooks/clerk/route.ts
// Webhook Clerk → synchronise les utilisateurs dans Neon DB via Prisma

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret manquant" },
      { status: 500 },
    );
  }

  // Vérification de la signature Svix
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Headers Svix manquants" },
      { status: 400 },
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  const { type, data } = evt;

  // ── Création d'un utilisateur ──
  if (type === "user.created") {
    const emailPrimaire = data.email_addresses?.[0]?.email_address;
    const telephone = data.phone_numbers?.[0]?.phone_number;

    await prisma.user.create({
      data: {
        clerkId: data.id,
        email: emailPrimaire ?? null,
        telephone: telephone ?? null,
        prenom: data.first_name ?? "Prénom",
        nom: data.last_name ?? "Nom",
        role: "CITOYEN",
      },
    });
  }

  // ── Mise à jour d'un utilisateur ──
  if (type === "user.updated") {
    const emailPrimaire = data.email_addresses?.[0]?.email_address;
    const telephone = data.phone_numbers?.[0]?.phone_number;

    await prisma.user.update({
      where: { clerkId: data.id },
      data: {
        email: emailPrimaire ?? null,
        telephone: telephone ?? null,
        prenom: data.first_name ?? undefined,
        nom: data.last_name ?? undefined,
      },
    });
  }

  // ── Suppression d'un utilisateur ──
  if (type === "user.deleted") {
    await prisma.user.delete({ where: { clerkId: data.id! } });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
