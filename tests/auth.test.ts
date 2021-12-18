import request from 'supertest';

import app from '../src/app';
import { User } from '../src/model/User';
import { setupTestDatabase, user1 } from './fixtures/db';

beforeEach(setupTestDatabase);

describe('POST /auth/signup', () => {
  test('should signup a new user when fields are valid', async () => {
    const testUser = {
      name: 'Test User',
      password: 'password',
      email: 'testUser@test.com',
    };

    const response = await request(app).post('/api/auth/signup').send(testUser);

    const user = await User.findOne({ email: testUser.email });
    expect(user).not.toBeNull();

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ name: testUser.name, email: testUser.email });
  });

  test('should validates request body', async () => {
    const response = await request(app).post('/api/auth/signup').send({});
    expect(response.body).toMatchObject({
      message: 'The given data was invalid',
    });
    expect(response.status).toBe(422);
  });

  test('should return 422 status code when email is already taken', async () => {
    const response = await request(app).post('/api/auth/signup').send(user1);
    expect(response.statusCode).toBe(422);
  });
});
