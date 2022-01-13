import request from 'supertest';
import mongoose from 'mongoose';

import app from '../src/app';
import { setupTestDatabase, user1, user2, generateUserToken, user1Note1 } from './fixtures/db';

beforeEach(setupTestDatabase);

describe('GET /favorites', () => {
  test('should get user favorite notes', async () => {
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .get(`/api/favorites`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.notes.length).toBe(0);
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get('/api/favorites');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('POST /favorites/id', () => {
  test('should toggle favorite note', async () => {
    const token = generateUserToken(user1._id);
    const response1 = await request(app)
      .post(`/api/favorites/${user1Note1._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response1.status).toBe(200);
    expect(response1.body.note).toMatchObject({ ...user1Note1, isFavorite: true });

    const response2 = await request(app)
      .post(`/api/favorites/${user1Note1._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response2.body.note).toMatchObject({ ...user1Note1, isFavorite: false });
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});
