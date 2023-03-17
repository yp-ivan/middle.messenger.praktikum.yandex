import { server } from 'tests/apiMock';
import HTTPTransport from './HTTPTransport';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const endpoint = `${process.env.API_ENDPOINT}/mock`;
const data = { check: 'Test' };

describe('helpers/HTTPTransport', () => {
  it('GET request', async () => {
    const { responseText } = await HTTPTransport.get(`${endpoint}/get`);
    expect(JSON.parse(responseText).type).toBe('GET');
  });

  it('POST request', async () => {
    const { responseText } = await HTTPTransport.post(`${endpoint}/post`, { data });
    expect(JSON.parse(responseText).type).toBe('POST');
  });

  it('PUT request', async () => {
    const { responseText } = await HTTPTransport.put(`${endpoint}/put`, { data });
    expect(JSON.parse(responseText).type).toBe('PUT');
  });

  it('DELETE request', async () => {
    const { responseText } = await HTTPTransport.delete(`${endpoint}/delete`, { data });
    expect(JSON.parse(responseText).type).toBe('DELETE');
  });
});
