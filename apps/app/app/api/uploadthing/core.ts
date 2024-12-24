import { auth } from '@clerk/nextjs/server';
import { type FileRouter, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter: FileRouter = {
  validationFiles: f({
    pdf: { maxFileSize: '4MB' },
    image: { maxFileSize: '4MB' },
    text: { maxFileSize: '4MB' },
    'application/msword': { maxFileSize: '4MB' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      maxFileSize: '4MB',
    },
  })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new Error('Unauthorized');
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('File URL:', file.url);
    }),
} as const;

export type OurFileRouter = typeof ourFileRouter;
