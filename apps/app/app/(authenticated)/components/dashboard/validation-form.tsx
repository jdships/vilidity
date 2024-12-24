'use client';

import { createValidation } from '@/actions/create-validation';
import { useUploadThing } from '@/lib/uploadthing';
import { validationFormSchema } from '@/lib/validations/validation-form';
import type { ValidationFormInput } from '@/lib/validations/validation-form';
import { useValidationStore } from '@/store/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/design-system/components/ui/button';
import {} from '@repo/design-system/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import { cn } from '@repo/design-system/lib/utils';
import { FileText, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CATEGORIES = [
  'SaaS',
  'Mobile App',
  'E-commerce',
  'AI/ML',
  'Health Tech',
  'EdTech',
  'FinTech',
  'Other',
];

function FileUpload({
  onChange,
  value = [],
}: {
  onChange: (files: ValidationFormInput['files']) => void;
  value?: ValidationFormInput['files'];
}) {
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing('imageUploader');

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop: async (acceptedFiles, rejected) => {
        setRejectedFiles(rejected.map((r) => r.file));

        if (acceptedFiles.length === 0) return;

        const toastId = toast.loading('Uploading files...');

        try {
          const uploadedFiles = await startUpload(acceptedFiles);

          if (uploadedFiles) {
            onChange([
              ...value,
              ...uploadedFiles.map((file) => ({
                name: file.name,
                url: file.url,
                size: file.size,
                mimeType: file.type,
              })),
            ]);
            toast.success('Files uploaded successfully', { id: toastId });
          }
        } catch (error) {
          toast.error('Upload failed', {
            id: toastId,
            description:
              error instanceof Error ? error.message : 'Unknown error',
          });
        } finally {
          setRejectedFiles([]);
        }
      },
      accept: {
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ['.docx'],
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg'],
      },
      maxSize: 4 * 1024 * 1024, // 4MB
    });

  const removeFile = (fileUrl: string) => {
    onChange(value.filter((f) => f.url !== fileUrl));
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          'relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-muted-foreground/25 border-dashed px-5 py-4 text-center transition',
          isDragActive && 'border-primary bg-primary/10',
          isDragReject && 'border-destructive bg-destructive/10',
          'hover:bg-muted/80'
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Upload
          className={cn(
            'h-5 w-5',
            isDragActive ? 'text-primary' : 'text-muted-foreground',
            isDragReject && 'text-destructive'
          )}
        />
        <p className="mt-2 text-muted-foreground text-sm">
          {isDragActive
            ? 'Drop files here...'
            : isDragReject
              ? 'Some files are not supported'
              : 'Drag & drop files here, or click to select'}
        </p>
        <p className="text-muted-foreground text-xs">
          Supported file types: PDF, Word, PNG, JPG (Max 4MB)
        </p>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file) => (
            <div
              key={file.url}
              className="flex items-center justify-between rounded-md border px-2 py-1"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs">{file.name}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFile(file.url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {rejectedFiles.length > 0 && (
        <div className="mt-2 space-y-1">
          {rejectedFiles.map((file, i) => (
            <p key={i} className="text-destructive text-xs">
              {file.name} -{' '}
              {file.size > 4 * 1024 * 1024
                ? 'File too large (max 4MB)'
                : 'Unsupported file type'}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function ValidationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setValidationId, setIsProcessing, isProcessing } =
    useValidationStore();

  const form = useForm<ValidationFormInput>({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      files: [],
    },
  });

  const onSubmit = async (data: ValidationFormInput) => {
    try {
      setIsSubmitting(true);
      const result = await createValidation(data);

      if (result.success) {
        toast.success('Validation created successfully');
        setValidationId(result.validationId);
        setIsProcessing(true);
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to create validation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your idea title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your idea in detail"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Files (Optional)</FormLabel>
              <FormControl>
                <FileUpload onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-center pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || isProcessing}
            className="w-full"
          >
            {isSubmitting
              ? 'Creating...'
              : isProcessing
                ? 'Processing...'
                : 'Create Validation'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
