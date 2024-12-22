declare module '@clerk/nextjs/server' {
  export interface WebhookEvent {
    data: {
      id: string;
      email_addresses: Array<{ email_address: string }>;
      first_name: string | null;
      last_name: string | null;
      image_url: string | null;
      username: string | null;
      external_id: string | null;
    };
    type: string;
  }
}
