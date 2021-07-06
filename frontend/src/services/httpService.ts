import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2'

// criar conexão com o backend
const http = axios.create({
  baseURL: process.env.REACT_APP_URLSERVER,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// tratar erros recebidos nas requisições
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      if (error.response.data.errors && (error.response.data.errors.length > 0)) {

        Swal.fire({
          title: 'Ocorreu um erro',
          html: error.response.data.errors.map((erro: any) => {
            return "<p>" + erro.message + "</p>";
          }),
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Ocorreu um erro',
          html: "<p>" + error.response.data + "</p>",
          icon: 'error'
        });
      }

    }

    setTimeout(() => { }, 1000);

    return Promise.reject(error);
  }
);

export default http;
