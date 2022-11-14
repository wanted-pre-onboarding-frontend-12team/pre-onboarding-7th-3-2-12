import axios from 'axios';

export const Requester = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNldW5naW4xMkBnbWFpbC5jb20iLCJpYXQiOjE2Njg0MjAwMDksImV4cCI6MTY2ODQyMzYwOSwic3ViIjoiMTAyIn0.3sA5VlomP18Nv28xRE3i8kOEREFRiD-5udQDqYxNnuY',
	},
});
