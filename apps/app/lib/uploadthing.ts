import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react';

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

// Move this logic into a custom hook
export function useFileUpload() {
  const { startUpload } = useUploadThing('validationFiles', {
    onUploadProgress: (progress) => {
      console.log('Upload progress:', progress); // For debugging
      return progress;
    },
  });

  const uploadFiles = async (
    files: File[],
    onProgress?: (progress: number) => void
  ) => {
    try {
      const uploadedFiles = await startUpload(files, {
        onUploadProgress: (progress: number) => {
          console.log('Progress callback:', progress); // For debugging
          onProgress?.(progress);
        },
      });

      return uploadedFiles?.map((file) => ({
        url: file.url,
        name: file.name,
        size: file.size,
        mimeType: file.type,
      }));
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  return { uploadFiles };
}
