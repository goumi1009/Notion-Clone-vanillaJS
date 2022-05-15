import { API_END_POINT, USERNAME } from '../env.js';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(
      `${API_END_POINT}${url}`,
      (options = {
        headers: {
          'Content-Type': 'application/json',
          'x-username': USERNAME,
        },
        ...options,
      })
    );
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error('API 호출 오류');
  } catch (e) {
    alert(e.message);
  }
};
