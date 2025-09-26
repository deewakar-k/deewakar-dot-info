import { readFileSync } from 'fs';
import { join } from 'path';

export const readSourceFile = (filePath: string): string => {
  try {
    const fullPath = join(process.cwd(), 'src', filePath);
    return readFileSync(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Error reading source file ${filePath}:`, error);
    return '// Error loading source code';
  }
};
