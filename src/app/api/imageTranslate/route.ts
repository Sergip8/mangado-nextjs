// app/api/translate-manga.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';


export const config = {
  api: {
    bodyParser: false, // Disable the built-in body parser for form data
  },
};

type ResponseData = {
  translatedImage?: string; // base64 encoded translated image
  status?: string;
  error?: string;
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log('Request received:', req.method, req.url);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the incoming form data
    const { fields, files } = await parseForm(req);
    
    if (!files.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const filePath = file.filepath;
    
    // Create form data for the external API
    const formData = new FormData();
    const fileContent = fs.readFileSync(filePath);
    formData.append('file', new Blob([fileContent]), file.originalFilename || 'file');

    // Send request to the manga translator API
    const translationResponse = await fetch('https://manga-translator-dmme.onrender.com/translate', {
      method: 'POST',
      body: formData,
    });

    // Clean up the temporary file
    fs.unlinkSync(filePath);

    if (!translationResponse.ok) {
      const errorText = await translationResponse.text();
      throw new Error(`Translation API error: ${translationResponse.status} - ${errorText}`);
    }

    const translationData = await translationResponse.json();

    // Return the translated image data
    return res.status(200).json({
      status: translationData.status,
      translatedImage: translationData.image // The base64 image from the response
    });

  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to translate image'
    });
  }
}

// Helper function to parse form data
const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      keepExtensions: true,
    });
    
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};