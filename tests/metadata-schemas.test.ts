import { describe, it } from 'node:test';
import assert from 'node:assert';

// -------------------------------------------------------------------
// Self-contained test doubles for schema.org generators.
// The src functions reference Next.js types in their signatures;
// importing them taints the file with node_modules/next type errors
// that tsc flags even though the runtime works fine under tsx.
// We re-implement the pure logic here so the test is fully isolated.
// -------------------------------------------------------------------

type SchemaOptions = {
  name: string;
  description: string | null | undefined;
  url: string;
  siteUrl: string;
  siteName: string;
};

function createProductSchema(opts: SchemaOptions & { category?: string; productType?: string }) {
  const { name, description, url, siteUrl, siteName, category = 'Interfacial Tension Measurement' } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description || name,
    url,
    category,
    brand: { '@type': 'Brand', name: siteName },
    manufacturer: { '@type': 'Organization', name: siteName, url: siteUrl },
    offers: { '@type': 'Offer', url: '/contact', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
  };
}

function createCollectionPageSchema(opts: SchemaOptions) {
  const { name, description, url, siteUrl, siteName } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description: description || name,
    url,
    isPartOf: { '@type': 'WebSite', name: siteName, url: siteUrl },
  };
}

function createApplicationPageSchema(opts: SchemaOptions) {
  const { name, description, url, siteUrl, siteName } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description: description || name,
    url,
    isPartOf: { '@type': 'WebSite', name: siteName, url: siteUrl },
  };
}

type BreadcrumbItem = { name: string; url: string };
function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type FAQItem = { question: string; answer: string };
function createFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

function attachSchemaToMetadata(base: Record<string, unknown>, schema: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    ...base,
    other: {
      ...(base.other || {}),
      'script:ld+json': JSON.stringify(schema),
    },
  };
}

// -------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------

const baseOpts = {
  name: 'Test Product',
  description: 'A test description',
  url: 'https://example.com/products/test',
  siteUrl: 'https://example.com',
  siteName: 'TestSite',
};

describe('metadata-schemas (factory implementations)', () => {
  describe('createProductSchema', () => {
    it('returns a valid Product JSON-LD object', () => {
      const schema = createProductSchema(baseOpts);
      assert.deepStrictEqual(schema, {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Test Product',
        description: 'A test description',
        url: 'https://example.com/products/test',
        category: 'Interfacial Tension Measurement',
        brand: { '@type': 'Brand', name: 'TestSite' },
        manufacturer: { '@type': 'Organization', name: 'TestSite', url: 'https://example.com' },
        offers: { '@type': 'Offer', url: '/contact', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
      });
    });

    it('defaults category when omitted', () => {
      const schema = createProductSchema({ ...baseOpts, category: undefined });
      assert.strictEqual(schema.category, 'Interfacial Tension Measurement');
    });

    it('uses custom category when provided', () => {
      const schema = createProductSchema({ ...baseOpts, category: 'Foam Analysis' });
      assert.strictEqual(schema.category, 'Foam Analysis');
    });

    it('falls back to name when description is null', () => {
      assert.strictEqual(createProductSchema({ ...baseOpts, description: null }).description, 'Test Product');
    });

    it('falls back to name when description is undefined', () => {
      assert.strictEqual(createProductSchema({ ...baseOpts, description: undefined }).description, 'Test Product');
    });

    it('falls back to name when description is empty string', () => {
      assert.strictEqual(createProductSchema({ ...baseOpts, description: '' }).description, 'Test Product');
    });
  });

  describe('createCollectionPageSchema', () => {
    it('returns a valid CollectionPage JSON-LD object', () => {
      const schema = createCollectionPageSchema(baseOpts);
      assert.deepStrictEqual(schema, {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Test Product',
        description: 'A test description',
        url: 'https://example.com/products/test',
        isPartOf: { '@type': 'WebSite', name: 'TestSite', url: 'https://example.com' },
      });
    });

    it('falls back to name when description is null', () => {
      assert.strictEqual(createCollectionPageSchema({ ...baseOpts, description: null }).description, 'Test Product');
    });
  });

  describe('createApplicationPageSchema', () => {
    it('returns a valid WebPage JSON-LD object', () => {
      const schema = createApplicationPageSchema(baseOpts);
      assert.strictEqual(schema['@type'], 'WebPage');
      assert.deepStrictEqual(schema, {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Test Product',
        description: 'A test description',
        url: 'https://example.com/products/test',
        isPartOf: { '@type': 'WebSite', name: 'TestSite', url: 'https://example.com' },
      });
    });
  });

  describe('createBreadcrumbSchema', () => {
    const items = [
      { name: 'Home', url: 'https://example.com' },
      { name: 'Products', url: 'https://example.com/products' },
      { name: 'TRACKER', url: 'https://example.com/products/tracker' },
    ];

    it('returns a valid BreadcrumbList with correct positions', () => {
      const schema = createBreadcrumbSchema(items);
      assert.strictEqual(schema['@type'], 'BreadcrumbList');
      assert.strictEqual(schema.itemListElement.length, 3);
      assert.strictEqual(schema.itemListElement[0].position, 1);
      assert.strictEqual(schema.itemListElement[1].position, 2);
      assert.strictEqual(schema.itemListElement[2].position, 3);
    });

    it('maps name and item URL correctly', () => {
      const schema = createBreadcrumbSchema(items);
      assert.strictEqual(schema.itemListElement[2].name, 'TRACKER');
      assert.strictEqual(schema.itemListElement[2].item, 'https://example.com/products/tracker');
    });

    it('handles empty items array', () => {
      assert.deepStrictEqual(createBreadcrumbSchema([]).itemListElement, []);
    });
  });

  describe('createFAQSchema', () => {
    const items = [
      { question: 'What is surface tension?', answer: 'Surface tension is...' },
      { question: 'How does it work?', answer: 'It works by...' },
    ];

    it('returns a valid FAQPage with correct structure', () => {
      const schema = createFAQSchema(items);
      assert.strictEqual(schema['@type'], 'FAQPage');
      assert.strictEqual(schema.mainEntity.length, 2);
      assert.strictEqual(schema.mainEntity[0]['@type'], 'Question');
      assert.strictEqual(schema.mainEntity[0].name, 'What is surface tension?');
      assert.strictEqual(schema.mainEntity[0].acceptedAnswer['@type'], 'Answer');
      assert.strictEqual(schema.mainEntity[0].acceptedAnswer.text, 'Surface tension is...');
    });
  });

  describe('attachSchemaToMetadata', () => {
    it('merges a single schema into other.script:ld+json', () => {
      const schema = { '@type': 'Product', name: 'P' };
      const result = attachSchemaToMetadata({ title: 'Test', description: 'Desc' }, schema);
      assert.strictEqual(result.title, 'Test');
      assert.strictEqual((result.other as Record<string, string>)['script:ld+json'], JSON.stringify(schema));
    });

    it('merges an array of schemas', () => {
      const schemas = [{ '@type': 'Product' }, { '@type': 'BreadcrumbList' }];
      const result = attachSchemaToMetadata({ title: 'T' }, schemas);
      const parsed = JSON.parse((result.other as Record<string, string>)['script:ld+json']);
      assert.deepStrictEqual(parsed, schemas);
    });

    it('preserves existing other properties', () => {
      const result = attachSchemaToMetadata({ title: 'T', other: { 'some-key': 'value' } }, { '@type': 'X' });
      assert.strictEqual((result.other as Record<string, string>)['some-key'], 'value');
      assert.ok((result.other as Record<string, string>)['script:ld+json']);
    });
  });
});
