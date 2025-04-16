const request = require('supertest');
const express = require('express');
const mongodb = require('../data/database');
const router = require('../routes/index');

const app = new express();
app.use('/', router);

describe('Testing API Endpoints.', function () {

    beforeAll(async () => {
        return new Promise((resolve, reject) => {
            mongodb.initDb((err) => {
                if (err) {
                    console.error('Database connection failed:', err);
                    reject(err);
                } else {
                    console.log('Database connected successfully');
                    resolve();
                }
            });
        });
    }, 10000);

    // ┌──────────────────────────────────────────────────────────────────────────────┐
    // │                                GetAll methods                                │
    // └──────────────────────────────────────────────────────────────────────────────┘

    test('responds to getAll /emotional/', async () => {
        const res = await request(app).get('/emotional/');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text)); // is array
        expect(res.text.length > 0); // non-empty
    });

    test('responds to getAll /physical/', async () => {
        const res = await request(app).get('/physical/');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text)); // is array
        expect(res.text.length > 0); // non-empty
    });

    test('responds to getAll /intellectual/', async () => {
        const res = await request(app).get('/intellectual/');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text)); // is array
        expect(res.text.length > 0); // non-empty
    });

    test('responds to getAll /social/', async () => {
        const res = await request(app).get('/social/');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text)); // is array
        expect(res.text.length > 0); // non-empty
    });

    test('responds to getAll /users/', async () => {
        const res = await request(app).get('/users/');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text)); // is array
        expect(res.text.length > 0); // non-empty
    });

    // ┌──────────────────────────────────────────────────────────────────────────────┐
    // │                                 Get methods                                  │
    // └──────────────────────────────────────────────────────────────────────────────┘

    test('responds to getList /emotional/', async () => {
        const res = await request(app).get('/emotional/67f4937c5f0ee6f5f039552f');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text.dailyChallenges)); // is array
        expect(res.text.dailyChallenges > 0); // non-empty daily challenges list
    });

    test('responds to getList /physical/', async () => {
        const res = await request(app).get('/physical/67f4934d5f0ee6f5f0395525');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text.dailyChallenges)); // is array
        expect(res.text.dailyChallenges > 0); // non-empty daily challenges list
    });

    test('responds to getList /intellectual/', async () => {
        const res = await request(app).get('/intellectual/67f493555f0ee6f5f0395529');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text.dailyChallenges)); // is array
        expect(res.text.dailyChallenges > 0); // non-empty daily challenges list
    });

    test('responds to getList /social/', async () => {
        const res = await request(app).get('/social/67f4933f5f0ee6f5f0395520');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text.dailyChallenges)); // is array
        expect(res.text.dailyChallenges > 0); // non-empty daily challenges list
    });

    test('responds to getList /emotional/', async () => {
        const res = await request(app).get('/emotional/67f4937c5f0ee6f5f039552f');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json; charset=utf-8'); // comes as json
        expect(Array.isArray(res.text.dailyChallenges)); // is array
        expect(res.text.dailyChallenges > 0); // non-empty daily challenges list
    });

    test('responds to getList of /users/', async () => {
        const res = await request(app).get('/users/67f493325f0ee6f5f0395515');
        expect(res.statusCode).toBe(200); // is successful
        expect(res.header['content-type']).toBe('application/json'); // comes as json
        expect(Array.isArray(res.text.challenges)); // list of challenges is array
        expect(res.text.challenges > 0); // non-empty list of challenges
    });
});