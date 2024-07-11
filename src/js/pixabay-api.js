import axios from 'axios';

const API_KEY = '44784729-ebc9a0f5cc587c2700d41657d';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPicturesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
}
