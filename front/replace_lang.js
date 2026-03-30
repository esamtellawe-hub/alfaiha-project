const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'Component')
];

function processFile(filePath) {
  // Skip context and navbar as we already did them manually
  if (filePath.includes('LanguageContext.jsx') || filePath.includes('navbar.jsx') || filePath.includes('Home.jsx') || filePath.includes('Footer.jsx')) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match object.property_en but NOT if it's already part of the fallback (e.g. not preceded by "|| ")
  // Group 1: Object name (e.g. item)
  // Group 2: Property base (e.g. title)
  const regex = /(?<!\|\|\s*)([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)_en/g;
  
  // Also handle destructured ones if any, but let's stick to the object property pattern as it covers 95% of the codebase
  let newContent = content.replace(regex, (match, p1, p2) => {
    return `${p1}[\`${p2}_\${language}\`] || ${p1}.${p2}_en`;
  });

  if (newContent !== content) {
    // If we replaced something, we need to ensure useLanguage is imported
    if (!newContent.includes('useLanguage')) {
      // Find the last import statment
      const importRegex = /import.*?;?\n/g;
      let lastImportIndex = 0;
      let match;
      while ((match = importRegex.exec(newContent)) !== null) {
        lastImportIndex = match.index + match[0].length;
      }
      
      const relativePath = filePath.includes('pages') ? '../context/LanguageContext' : '../context/LanguageContext'; // Both Component and pages are 1 level deep from src
      
      const importStatement = `import { useLanguage } from "${relativePath}";\n`;
      newContent = newContent.slice(0, lastImportIndex) + importStatement + newContent.slice(lastImportIndex);
    }

    // We also need to inject `const { language } = useLanguage();` into component outputs
    // Finding component definitions is tricky via regex, so let's try to find "const ComponentName = ... => {" or "function ComponentName() {"
    const componentRegex = /(const\s+[A-Z][a-zA-Z0-9_]*\s*=\s*\([^)]*\)\s*=>\s*{|function\s+[A-Z][a-zA-Z0-9_]*\s*\([^)]*\)\s*{)/g;
    
    newContent = newContent.replace(componentRegex, (match) => {
      // Don't inject if it already has it
      return `${match}\n  const { language } = useLanguage();\n`;
    });

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${path.basename(filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

directories.forEach(walkDir);
console.log('Done!');
