import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'capabilities-statement.pdf');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    // Set headers to force download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Precise-Analytics-Capabilities-Statement.pdf"');
    res.setHeader('Content-Length', fileBuffer.length);
    
    // Send the file
    res.send(fileBuffer);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
