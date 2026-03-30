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
  
  // Replace object.property_en with dynamic language property
  let newContent = content.replace(regex, (match, p1, p2) => {
    return `${p1}[\`${p2}_\${language}\`] || ${p1}.${p2}_en`;
  });

  if (newContent !== content) {
    console.log(`Matched translations in: ${path.basename(filePath)}`);
    
    // Ensure useLanguage is imported
    if (!newContent.includes('useLanguage')) {
      // Find the last import statment
      const importRegex = /import.*?;?\n/g;
      let lastImportIndex = 0;
      let match;
      while ((match = importRegex.exec(newContent)) !== null) {
        lastImportIndex = match.index + match[0].length;
      }
      
      const relativePath = filePath.includes('pages') ? '../context/LanguageContext' : '../context/LanguageContext';
      const importStatement = `import { useLanguage } from "${relativePath}";\n`;
      newContent = newContent.slice(0, lastImportIndex) + importStatement + newContent.slice(lastImportIndex);
    }

    // Identify functional components and insert const { language } = useLanguage();
    const componentRegex = /((?:const|let|var)\s+[A-Z][a-zA-Z0-9_]*\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>\s*{|function\s+[A-Z][a-zA-Z0-9_]*\s*\([^)]*\)\s*{)/g;
    
    let isModified = false;
    newContent = newContent.replace(componentRegex, (match) => {
      isModified = true;
      return `${match}\n  const { language } = useLanguage();`;
    });

    if (isModified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated successfully: ${path.basename(filePath)}`);
    } else {
      console.log(`Warning: Could not find component body to inject context in ${path.basename(filePath)}`);
    }
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
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
console.log('Script execution complete!');
