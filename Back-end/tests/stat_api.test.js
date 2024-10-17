import { test } from 'node:test'
import supertest from 'supertest'
import { app } from '../app.js'

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .post('/auth/login')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
