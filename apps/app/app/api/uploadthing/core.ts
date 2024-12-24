import { auth } from '@clerk/nextjs/server';
import { type FileRouter, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

const fileRouter: FileRouter = {
  imageUploader: f({
    'application/pdf': { maxFileSize: '4MB' },
    'application/msword': { maxFileSize: '4MB' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      maxFileSize: '4MB',
    },
    'image/png': { maxFileSize: '4MB' },
    'image/jpeg': { maxFileSize: '4MB' },
  })
    .middleware(async ({ req }) => {
      const { userId } = await auth();

      if (!userId) {
        throw new Error('Unauthorized');
      }

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('File URL:', file.url);
      return { uploadedBy: metadata.userId };
    }),
};

export { fileRouter };
export type OurFileRouter = typeof fileRouter;
