import type { ValidationFile } from '@/types/validation';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

export async function extractFileContent(
  file: ValidationFile
): Promise<string> {
  try {
    const response = await fetch(file.url);
    const blob = await response.blob();

    switch (file.mimeType) {
      case 'application/pdf':
        return extractPdfContent(blob);

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        return extractDocContent(blob);

      case 'text/plain':
        return extractTextContent(blob);

      default:
        throw new Error(`Unsupported file type: ${file.mimeType}`);
    }
  } catch (error) {
    console.error(`Error extracting content from file ${file.name}:`, error);
    throw error;
  }
}

async function extractPdfContent(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

async function extractDocContent(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractTextContent(blob: Blob): Promise<string> {
  return blob.text();
}
