import axios from 'axios';
import router from '../router/index.js'
const service = axios.create({
	baseURL:'/api',
	timeout: 50000,
})
service.interceptors.request.use(config => {
	return config;
}, error => {
	return Promise.reject();
})

service.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.errcode == 110 || response.data.errcode == 100) {
			router.replace('/');
		}
		return response.data;
	} else {
		Promise.reject();
	}
}, error => {
	// elementUI.Message("网络请求错误.");
	return Promise.reject();
})

export default service;
