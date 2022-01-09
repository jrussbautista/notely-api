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
    expect(response.body.tasks.length).toBe(2);
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get(`/api/tasks`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('POST /tasks', () => {
  test('should create new task when all fields are valid', async () => {
    const task = {
      title: 'New task',
      description: 'new task desc',
    };
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .post(`/api/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send(task);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ task });
  });

  test('should validates create task request body', async () => {
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      message: 'The given data was invalid',
    });
  });

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
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get(`/api/tasks`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('DELETE /tasks/id', () => {
  test('should delete user task', async () => {
    const id = user1Task1._id;
    const token = generateUserToken(user1._id);
    const deleteResponse = await request(app)
      .delete(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteResponse.statusCode).toBe(204);

    // task should not found
    const getResponse = await request(app)
      .get(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(getResponse.statusCode).toBe(404);
  });

  test('should return 404 status and not found message when task is not found', async () => {
    const id = new mongoose.Types.ObjectId();
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .delete(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should not delete other user tasks', async () => {
    const id = user1Task1._id;
    const token = generateUserToken(user2._id);
    const response = await request(app)
      .delete(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId();
    const response = await request(app).delete(`/api/tasks/${id}`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('PUT /tasks/id', () => {
  test('should update user task', async () => {
    const task = {
      title: 'New task',
      description: 'new task desc',
      completed: true,
    };
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .put(`/api/tasks/${user1Task1._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(task);
    expect(response.status).toBe(202);
    expect(response.body).toMatchObject({ task });
  });

  test('should validates update task request body', async () => {
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      message: 'The given data was invalid',
    });
  });

  test('should return 404 status and not found message when task is not found', async () => {
    const id = new mongoose.Types.ObjectId();
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .put(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ message: 'Task not found.' });
  });

  test('should not update other user tasks', async () => {
    const id = user1Task1._id;
    const token = generateUserToken(user2._id);
    const response = await request(app)
      .put(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const id = user1Task1._id;
    const response = await request(app).get(`/api/tasks/${id}`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});
