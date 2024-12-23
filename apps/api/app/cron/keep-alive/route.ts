export const POST = async () => {
  // Remove or update this based on your actual schema
  // const newPage = await database.page.create({
  //   data: {
  //     name: 'cron-temp',
  //     email: 'test@test.com',
  //   },
  // });

  // For now, just return a success response
  return new Response('OK', { status: 200 });
};
