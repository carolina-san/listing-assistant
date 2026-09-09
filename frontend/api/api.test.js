const request = require('supertest');
const app = require('./index');

describe('POST /api/generate-listing', () => {
  let originalMockMode;

  beforeAll(() => {
    originalMockMode = process.env.MOCK_MODE;
    process.env.MOCK_MODE = 'true';
  });

  afterAll(() => {
    process.env.MOCK_MODE = originalMockMode;
  });

  it('returns 400 if description is missing', async () => {
    const res = await request(app)
      .post('/api/generate-listing')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Description is required.');
  });

  it('returns a generated listing when description is provided (Mock Mode)', async () => {
    let res;
    for (let i = 0; i < 5; i++) {
      res = await request(app)
        .post('/api/generate-listing')
        .send({ description: 'Vintage Leather Jacket' });

      if (res.body && res.body.title && res.body.title.startsWith('[MOCK]')) {
        break;
      }
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('tags');
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body).toHaveProperty('priceRange');
  });
});
