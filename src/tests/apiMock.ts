import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.get(`${process.env.API_ENDPOINT}/mock/get`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ type: 'GET' })
    );
  }),
  rest.post(`${process.env.API_ENDPOINT}/mock/post`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ type: 'POST' })
    );
  }),
  rest.put(`${process.env.API_ENDPOINT}/mock/put`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ type: 'PUT' })
    );
  }),
  rest.delete(`${process.env.API_ENDPOINT}/mock/delete`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ type: 'DELETE' })
    );
  })
];

export const server = setupServer(...handlers);
