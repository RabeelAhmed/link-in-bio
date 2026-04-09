const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('API Health', () => {
  it('should return API is running', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});

afterAll(async () => {
  // Always close connection safely in tests
  if(mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
