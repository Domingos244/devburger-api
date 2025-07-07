import fs from 'fs';
import path from 'path';

const dir = './src';

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const importExportRegex = /(import\s.+?\sfrom\s+['"](.+?)['"]|export\s.+?\sfrom\s+['"](.+?)['"])/g;

  const updated = content.replace(importExportRegex, (match, _import, imp1, imp2) => {
    const importPath = imp1 || imp2;
    if (
      importPath.startsWith('.') &&
      !importPath.endsWith('.js') &&
      !importPath.endsWith('.json') &&
      !importPath.includes('?')
    ) {
      return match.replace(importPath, importPath + '.js');
    }
    return match;
  });

  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    console.log(`✅ Corrigido: ${filePath}`);
  }
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);

  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.js')) {
      fixImportsInFile(fullPath);
    }
  }
}

walkDir(dir);
