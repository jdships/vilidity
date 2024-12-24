import type { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@repo/database';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

interface ClerkUserData {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  username: string | null;
  external_id: string | null;
}

async function handleUserEvent(data: ClerkUserData) {
  const {
    id,
    email_addresses,
    first_name,
    last_name,
    image_url,
    username,
    external_id,
  } = data;

  const primaryEmail = email_addresses?.[0]?.email_address;
  if (!primaryEmail) {
    return new Response('No email address found', { status: 400 });
  }

  await db.user.upsert({
    where: { id },
    create: {
      id,
      email: primaryEmail,
      firstName: first_name ?? null,
      lastName: last_name ?? null,
      imageUrl: image_url ?? null,
      username: username ?? null,
      externalId: external_id ?? null,
    },
    update: {
      email: primaryEmail,
      firstName: first_name ?? null,
      lastName: last_name ?? null,
      imageUrl: image_url ?? null,
      username: username ?? null,
      externalId: external_id ?? null,
    },
  });
}

export async function POST(req: Request) {
  const headersList = await headers();
  const svixHeaders = {
    'svix-id': headersList.get('svix-id') as string,
    'svix-timestamp': headersList.get('svix-timestamp') as string,
    'svix-signature': headersList.get('svix-signature') as string,
  };

  if (!Object.values(svixHeaders).every(Boolean)) {
    return new Response('Missing svix headers', { status: 400 });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response('Missing webhook secret', { status: 500 });
  }

  try {
    const evt = new Webhook(webhookSecret).verify(
      JSON.stringify(await req.json()),
      svixHeaders
    ) as WebhookEvent;

    if (['user.created', 'user.updated'].includes(evt.type)) {
      const { data } = evt;
      if ('email_addresses' in data) {
        await handleUserEvent(data as ClerkUserData);
      }
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch {
    return new Response('Error verifying webhook', { status: 400 });
  }
}
