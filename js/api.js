
const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

export async function fetchNews() {
    try {
    const response = await fetch(URL);

    console.log('Status:', response.status);
    console.log('OK:', response.ok);

    if (!response.ok) {
        throw new Error('Request failed: status ' + response.status);
    }

    const data = await response.json();
    console.log('Data:', data);

    return data;
    } catch (error) {
    console.error('Fetch failed:', error.message);
    throw error;
    }
}
