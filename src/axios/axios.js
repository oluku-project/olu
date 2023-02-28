import axios from 'axios';

const baseURL = 'https://oluku.pythonanywhere.com/api/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		// Authorization: localStorage.getItem('access_token')
		// 	? 'JWT ' + localStorage.getItem('access_token')
		// 	: null,
		// 'Content-Type': 'application/json',
		// accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			return Promise.reject(error);
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
