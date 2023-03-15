import HTTPTransport from './HTTPTransport';

const endpoint = 'https://jsonplaceholder.typicode.com/posts';
const data = { userId: 10, title: 'Test' };

describe('helpers/HTTPTransport', () => {
  it('GET request', async () => {
    const { responseText } = await HTTPTransport.get(`${endpoint}/1`);
    expect(JSON.parse(responseText).id).toBe(1);
  });

  it('POST request', async () => {
    const { responseText } = await HTTPTransport.post(`${endpoint}`, { data });
    expect(JSON.parse(responseText).id).toBe(101);
  });

  it('PUT request', async () => {
    const { responseText } = await HTTPTransport.put(`${endpoint}/1`, { data });
    expect(JSON.parse(responseText).id).toBe(1);
  });

  it('DELETE request', async () => {
    const { responseText } = await HTTPTransport.delete(`${endpoint}/1`, { data });
    expect(responseText).toBe('{}');
  });
});
