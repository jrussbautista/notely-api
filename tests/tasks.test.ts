import request from 'supertest';
import mongoose from 'mongoose';

import app from '../src/app';
import { setupTestDatabase, user1, user2, generateUserToken, user1Task1 } from './fixtures/db';

beforeEach(setupTestDatabase);

describe('GET /tasks', () => {
  test('should get user tasks', async () => {
    const token = generateUserToken(user1._id);
    const response = await request(app).get(`/api/tasks`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get(`/api/tasks`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('POST /tasks', () => {
  test('should create new task when all fields are valid', async () => {});

  test('should validates create tasks request body', async () => {});

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get(`/api/tasks`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('GET /tasks/id', () => {
  test('should get user individual task', async () => {
    const id = user1Task1._id;
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .get(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ task: user1Task1 });
  });

  test('should return 404 status and not found message when task is not found', async () => {
    const id = new mongoose.Types.ObjectId();
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .get(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ message: 'Task not found.' });
  });

  test('should not get other user individual task', async () => {
    const id = user1Task1._id;
    const token = generateUserToken(user2._id);
    const response = await request(app)
      .get(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ message: 'Task not found.' });
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get(`/api/tasks`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('DELETE /tasks/id', () => {
  test('should delete user task', async () => {});

  test('should return 404 status and not found message when task is not found', async () => {});

  test('should not delete other user tasks', async () => {});

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get(`/api/tasks`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('PUT /tasks/id', () => {
  test('should update user task', async () => {});

  test('should return 404 status and not found message when task is not found', async () => {});

  test('should not update other user tasks', async () => {});

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get(`/api/tasks`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});
