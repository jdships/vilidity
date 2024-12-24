'use client';

import { createValidation } from '@/actions/create-validation';
import { useFileUpload } from '@/lib/uploadthing';
import type { ValidationFormInput } from '@/lib/validations/validation-form';
import { validationFormSchema } from '@/lib/validations/validation-form';
import type { ValidationFormState } from '@/types/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
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
import { ArrowRight, FileText, Loader2, Trash2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function FileUpload({
  onChange,
}: {
  onChange: (files: ValidationFormInput['files']) => void;
}) {
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
  const { uploadFiles } = useFileUpload();

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop: async (acceptedFiles, rejected) => {
        setRejectedFiles(rejected.map((r) => r.file));

        if (acceptedFiles.length === 0) return;

        const toastId = toast.loading('Uploading files...');

        try {
          const uploadedFiles = await uploadFiles(acceptedFiles, (progress) => {
            toast.loading(`Uploading... ${Math.round(progress)}%`, {
              id: toastId,
            });
          });

          if (uploadedFiles) {
            onChange(uploadedFiles);
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
      maxSize: 5 * 1024 * 1024, // 5MB
    });

  return (
    <div>
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
          Supported file types: PDF, Word, PNG, JPG (Max 5MB)
        </p>
      </div>

      {rejectedFiles.length > 0 && (
        <div className="mt-2 space-y-1">
          {rejectedFiles.map((file, i) => (
            <p key={i} className="text-destructive text-xs">
              {file.name} -{' '}
              {file.size > 5 * 1024 * 1024
                ? 'File too large (max 5MB)'
                : 'Unsupported file type'}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function ValidationForm() {
  const router = useRouter();
  const form = useForm<ValidationFormInput>({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      title: '',
      category: undefined,
      description: '',
      files: [],
    },
  });

  const [formState, setFormState] = useState<ValidationFormState>({
    status: 'idle',
  });

  const onSubmit = async (data: ValidationFormInput) => {
    try {
      setFormState({ status: 'submitting' });

      const result = await createValidation(data);

      if (!result.success) {
        throw new Error(result.error);
      }

      router.push(`/validations/${result.validationId}`);
      setFormState({ status: 'completed' });
      toast.success('Validation submitted successfully');
    } catch (error) {
      console.error('Submission error:', error);
      setFormState({
        status: 'error',
        error: 'Failed to submit validation',
      });
      toast.error('Failed to submit validation');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
        <Card>
          <CardHeader>
            <CardTitle>Validate Your Idea</CardTitle>
            <CardDescription>
              Enter your idea details for AI-powered validation
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SaaS">SaaS</SelectItem>
                      <SelectItem value="Mobile App">Mobile App</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                      placeholder="Describe your idea in detail..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Documentation (Optional)</FormLabel>
                  <FormControl>
                    <FileUpload onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('files').length > 0 && (
              <div className="mt-4 space-y-2">
                {form.watch('files').map((file) => (
                  <div
                    key={file.url}
                    className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2 py-1"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate text-xs">{file.name}</span>
                    <span className="ml-auto text-muted-foreground text-xs">
                      {(file.size / 1024 / 1024).toFixed(2)}MB
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-2 h-8 w-8 shrink-0 text-muted-foreground/50 hover:text-destructive"
                      onClick={() => {
                        const currentFiles = form.getValues('files');
                        form.setValue(
                          'files',
                          currentFiles.filter((f) => f.url !== file.url)
                        );
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={formState.status === 'submitting'}
            >
              {formState.status === 'submitting' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Validate My Idea</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
