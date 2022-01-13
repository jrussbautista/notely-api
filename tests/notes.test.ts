import request from 'supertest';
import mongoose from 'mongoose';

import app from '../src/app';
import { setupTestDatabase, user1, user2, generateUserToken, user1Note1 } from './fixtures/db';

beforeEach(setupTestDatabase);

describe('GET /notes/trash', () => {
  test('should get user trash notes', async () => {
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .get(`/api/notes/trash`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.notes.length).toBe(0);
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get('/api/notes/trash');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('GET /notes', () => {
  test('should get user notes', async () => {
    const token = generateUserToken(user1._id);
    const response = await request(app).get(`/api/notes`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.notes.length).toBe(2);
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('POST /notes', () => {
  test('should create new note when all fields are valid', async () => {
    const note = {
      title: 'New note',
      description: 'new note desc',
    };
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(note);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ note });
  });

  test('should validates create note request body', async () => {
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      message: 'The given data was invalid',
    });
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('GET /notes/id', () => {
  test('should get user individual note', async () => {
    const id = user1Note1._id;
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .get(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ note: user1Note1 });
  });

  test('should return 404 status and not found message when note is not found', async () => {
    const id = new mongoose.Types.ObjectId();
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .get(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ message: 'Note not found.' });
  });

  test('should not get other user individual note', async () => {
    const id = user1Note1._id;
    const token = generateUserToken(user2._id);
    const response = await request(app)
      .get(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('DELETE /notes/id', () => {
  test('should delete user note', async () => {
    const id = user1Note1._id;
    const token = generateUserToken(user1._id);
    const deleteResponse = await request(app)
      .delete(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteResponse.statusCode).toBe(204);

    // note should not found
    const getResponse = await request(app)
      .get(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.deletedAt).not.toBeNull();
  });

  test('should return 404 status and not found message when note is not found', async () => {
    const id = new mongoose.Types.ObjectId();
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .delete(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should not delete other user note', async () => {
    const id = user1Note1._id;
    const token = generateUserToken(user2._id);
    const response = await request(app)
      .delete(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId();
    const response = await request(app).delete(`/api/notes/${id}`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});

describe('PUT /notes/id', () => {
  test('should update user note', async () => {
    const note = {
      ...user1Note1,
      title: 'New note',
      description: 'new note desc',
    };
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .put(`/api/notes/${user1Note1._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(note);

    expect(response.status).toBe(202);
    expect(response.body.note._id).toBe(user1Note1._id.toString());
    expect(response.body).toMatchObject({ note });
  });

  test('should validates update note request body', async () => {
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .put(`/api/notes/${user1Note1._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      message: 'The given data was invalid',
    });
  });

  test('should return 404 status and not found message when note is not found', async () => {
    const note = {
      title: 'New note',
      description: 'new note desc',
    };
    const id = new mongoose.Types.ObjectId();
    const token = generateUserToken(user1._id);
    const response = await request(app)
      .put(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(note);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ message: 'Note not found.' });
  });

  test('should not update other user note', async () => {
    const note = {
      title: 'New note',
      description: 'new note desc',
    };
    const id = user1Note1._id;
    const token = generateUserToken(user2._id);
    const response = await request(app)
      .put(`/api/notes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(note);
    expect(response.statusCode).toBe(404);
  });

  test('should return 401 status and unauthorized message if user is not authenticated', async () => {
    const id = user1Note1._id;
    const response = await request(app).get(`/api/notes/${id}`);
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized.' });
  });
});
