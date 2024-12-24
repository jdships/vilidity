'use client';

import { createValidation } from '@/actions/create-validation';
import { useUploadThing } from '@/lib/uploadthing';
import type {
  ValidationFormData,
  ValidationFormState,
} from '@/types/validation';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import { useToast } from '@repo/design-system/components/ui/use-toast';
import { ArrowRight, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ValidationForm() {
  const [formState, setFormState] = useState<ValidationFormState>({
    status: 'idle',
  });
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const { startUpload } = useUploadThing('validationFiles');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: 'submitting' });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Upload files first
      let uploadedFiles = [];
      if (files.length > 0) {
        const uploadResponse = await startUpload(files);
        if (!uploadResponse) throw new Error('File upload failed');
        uploadedFiles = uploadResponse;
      }

      // Create validation data
      const validationData: ValidationFormData = {
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string,
        files: uploadedFiles,
      };

      const result = await createValidation(validationData);

      if (!result.success) throw new Error(result.error);

      // Redirect to validation page
      router.push(`/validations/${result.validationId}`);
    } catch (error) {
      console.error('Submission error:', error);
      setFormState({
        status: 'error',
        error: 'Failed to submit validation',
      });
      toast({
        title: 'Error',
        description: 'Failed to submit validation. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter a clear title for your idea"
            className="text-sm"
            autoComplete="off"
            data-1p-ignore
            data-form-type="other"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder="Select a category"
                className="text-sm"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="web">Web Application</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your idea in detail..."
            className="min-h-[150px] text-sm"
            autoComplete="off"
            data-1p-ignore
          />
        </div>
        <div className="space-y-2">
          <Label>Additional Documentation (Optional)</Label>
          <div className="relative rounded-lg border-2 border-muted-foreground/25 border-dashed p-6">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <div className="font-medium text-sm">
                Click or drag file to upload
              </div>
              <div className="text-muted-foreground text-xs">
                PDF, DOC, DOCX or TXT (max 10MB)
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {/* <InteractiveHoverButton className="w-full" text="Validate My Idea" /> */}
        <Button className="w-full" size="sm" variant="default">
          Validate My Idea
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
