import http from './http-service';

const endpoint = '/api/categories/';

export const getCategories = () => http.get(endpoint);
export const getCategory = (id) => http.get(`${endpoint}${id}/`);
export const addCategory = (data) => http.post(endpoint, data);
