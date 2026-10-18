import { fetchNews } from './api.js';
console.log("Kawaii Hotel JavaScript is connected!");

// Export the hotel object so dom.js can use roomTypes
export const hotel = {
  name: "Kawaii Hotel",
  location: "Indonesia",
  roomTypes: [
    { name: "Single Room", category: "single", price: 300000, available: true },
    { name: "Double Room", category: "double", price: 450000, available: true },
    { name: "Deluxe Room", category: "deluxe", price: 650000, available: false },
    { name: "Family Room", category: "family", price: 800000, available: true }
  ]
};

// Functions from your previous steps
export function createWelcomeMessage(name, location) {
  return `Welcome to ${name} in ${location}!`;
}

console.log(createWelcomeMessage(hotel.name, hotel.location));

const statusMessage = document.querySelector('#api-status');
const newsList = document.querySelector('#news-list');


function renderNews(list) {
  newsList.textContent = '';

  if (list.length === 0) {
    statusMessage.textContent = 'No hotel updates available.';
    return;
  }

  list.forEach(function (item) {
    const card = document.createElement('article');
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');

    heading.textContent = item.title;
    paragraph.textContent = item.body;

    card.append(heading, paragraph);
    newsList.append(card);
  });

  statusMessage.textContent = 'Latest hotel updates loaded successfully!';
}

async function loadNews() {
  statusMessage.textContent = 'Loading hotel updates...';

  try {
    const data = await fetchNews();

    const hotelUpdates = [
      {
        title: 'Welcome to Kawaii Hotel',
        body: 'Enjoy a comfortable stay with friendly service and a relaxing atmosphere.'
      },
      {
        title: 'Discover Our Available Rooms',
        body: 'Choose from Single, Double, Deluxe, and Family Rooms to suit your needs.'
      },
      {
        title: 'Plan Your Stay',
        body: 'Choose your check-in and check-out dates when completing the hotel registration form.'
      },
      {
        title: 'A Comfortable Stay Awaits',
        body: 'Our goal is to make every guest feel welcome and comfortable throughout their visit.'
      },
      {
        title: 'Book Your Room Today',
        body: 'Complete the registration form to share your booking details with Kawaii Hotel.'
      }
    ];

    // Confirm the API connection and JSON handling.
    console.log('API data received:', data);
    const textData = JSON.stringify(hotelUpdates);
    const parsedData = JSON.parse(textData);

    renderNews(parsedData);
  } catch (error) {
    statusMessage.textContent =
      'Unable to load hotel updates. Please try again later.';
    console.error('Hotel updates error:', error.message);
  }
}

loadNews();
