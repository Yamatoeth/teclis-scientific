import { describe, it } from 'node:test';
import assert from 'node:assert';

// We test the detection logic without running the full script against real files.
// The script uses require('fs') style CJS — we re-implement the key extraction for isolated tests.

function getAllKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key] as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function findMissingKeys(allTranslations: Record<string, Record<string, unknown>>): Record<string, string[]> {
  const allKeysSet = new Set<string>();
  Object.values(allTranslations).forEach(t => getAllKeys(t).forEach(k => allKeysSet.add(k)));
  const allKeys = Array.from(allKeysSet);
  const result: Record<string, string[]> = {};
  for (const locale of Object.keys(allTranslations)) {
    const localeKeys = new Set(getAllKeys(allTranslations[locale]));
    result[locale] = allKeys.filter(k => !localeKeys.has(k)).sort();
  }
  return result;
}

describe('i18n check logic', () => {
  describe('getAllKeys', () => {
    it('extracts flat keys', () => {
      const obj = { a: 'x', b: 'y' };
      assert.deepStrictEqual(getAllKeys(obj), ['a', 'b']);
    });

    it('extracts nested keys with dot notation', () => {
      const obj = { nav: { home: 'x', products: 'y' } };
      assert.deepStrictEqual(getAllKeys(obj), ['nav.home', 'nav.products']);
    });

    it('handles deep nesting', () => {
      const obj = { a: { b: { c: 'val' } } };
      assert.deepStrictEqual(getAllKeys(obj), ['a.b.c']);
    });

    it('ignores arrays (treats them as leaf values)', () => {
      const obj = { features: ['a', 'b'] };
      assert.deepStrictEqual(getAllKeys(obj), ['features']);
    });

    it('handles empty object', () => {
      assert.deepStrictEqual(getAllKeys({}), []);
    });

    it('handles mixed nesting and leaf arrays', () => {
      const obj = {
        nav: { home: 'x' },
        features: ['a', 'b'],
        deep: { a: { b: 'c' } },
      };
      assert.deepStrictEqual(getAllKeys(obj).sort(), ['deep.a.b', 'features', 'nav.home']);
    });
  });

  describe('findMissingKeys', () => {
    it('detects missing keys in one locale', () => {
      const translations = {
        en: { a: '1', b: '2', c: '3' },
        fr: { a: '1', b: '2' },
      };
      const missing = findMissingKeys(translations);
      assert.deepStrictEqual(missing.en, []);
      assert.deepStrictEqual(missing.fr, ['c']);
    });

    it('detects missing keys in multiple locales', () => {
      const translations = {
        en: { a: '1', b: '2', c: '3' },
        fr: { a: '1' },
        de: { b: '2' },
      };
      const missing = findMissingKeys(translations);
      assert.deepStrictEqual(missing.en, []);
      assert.deepStrictEqual(missing.fr.sort(), ['b', 'c']);
      assert.deepStrictEqual(missing.de.sort(), ['a', 'c']);
    });

    it('returns empty for identical translations', () => {
      const translations = {
        en: { a: '1', b: '2' },
        fr: { a: '1', b: '2' },
      };
      const missing = findMissingKeys(translations);
      assert.deepStrictEqual(missing.en, []);
      assert.deepStrictEqual(missing.fr, []);
    });

    it('collects all keys across all locales (union)', () => {
      const translations = {
        en: { a: '1' },
        fr: { b: '2' },
        de: { c: '3' },
      };
      const missing = findMissingKeys(translations);
      assert.deepStrictEqual(missing.en.sort(), ['b', 'c']);
      assert.deepStrictEqual(missing.fr.sort(), ['a', 'c']);
      assert.deepStrictEqual(missing.de.sort(), ['a', 'b']);
    });

    it('handles a single locale', () => {
      const translations = {
        en: { a: '1', b: '2' },
      };
      const missing = findMissingKeys(translations);
      assert.deepStrictEqual(missing.en, []);
    });

    it('handles locales with no keys', () => {
      const translations = {
        en: { a: '1' },
        fr: {},
      };
      const missing = findMissingKeys(translations);
      assert.deepStrictEqual(missing.en, []);
      assert.deepStrictEqual(missing.fr, ['a']);
    });
  });
});
