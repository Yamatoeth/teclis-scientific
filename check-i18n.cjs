const fs = require('fs');
const path = require('path');

// Load all locale files
const locales = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'th', 'vi', 'zh'];
const messagesPath = './src/messages';
const translations = {};

// Read all translation files
locales.forEach(locale => {
  const filePath = path.join(messagesPath, `${locale}.json`);
  try {
    translations[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading ${locale}.json:`, error.message);
  }
});

// Function to get all keys from an object recursively
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Get all unique keys from all locales
const allKeysSet = new Set();
Object.values(translations).forEach(translation => {
  getAllKeys(translation).forEach(key => allKeysSet.add(key));
});

const allKeys = Array.from(allKeysSet).sort();

// Check for missing keys in each locale
const missingKeys = {};
locales.forEach(locale => {
  const localeKeys = new Set(getAllKeys(translations[locale]));
  missingKeys[locale] = allKeys.filter(key => !localeKeys.has(key));
});

// Display results
console.log('\n=== I18N MISSING KEYS ANALYSIS ===\n');
console.log(`Total unique keys across all locales: ${allKeys.length}\n`);

let hasMissingKeys = false;
locales.forEach(locale => {
  if (missingKeys[locale].length > 0) {
    hasMissingKeys = true;
    console.log(`${locale}.json - Missing ${missingKeys[locale].length} keys:`);
    missingKeys[locale].forEach(key => console.log(`  - ${key}`));
    console.log('');
  }
});

if (!hasMissingKeys) {
  console.log('✓ All locales have complete translations!');
  process.exit(0);
} else {
  console.log('\n=== SUMMARY ===');
  locales.forEach(locale => {
    const status = missingKeys[locale].length === 0 ? '✓ Complete' : `✗ Missing ${missingKeys[locale].length} keys`;
    console.log(`${locale}.json: ${status}`);
  });
  console.log(`\n✗ ${locales.filter(l => missingKeys[l].length > 0).length} / ${locales.length} locales have missing keys.`);
  console.log('Run "npm run i18n:scan" to extract new keys, then translate them.');
  process.exit(1);
}
