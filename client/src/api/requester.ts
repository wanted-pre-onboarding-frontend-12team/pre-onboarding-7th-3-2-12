import axios from 'axios';

export const Requester = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNldW5nQGdtYWlsLmNvbSIsImlhdCI6MTY2ODQzMDI0MiwiZXhwIjoxNjY4NDMzODQyLCJzdWIiOiIxMDMifQ.9KRQrpyq3g8Z_h4l-SI0veAECdGxGMBlRA_lgrTxQwE',
	},
});
