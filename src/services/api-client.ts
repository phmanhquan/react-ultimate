import axios, { CanceledError } from "axios";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 20,
  // trickle: true,
  // easing: "ease",
  // speed: 500,
});

const apiClient = axios.create({
  baseURL: "http://localhost:8081",
});

// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    NProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log("🚀 ~ file: api-client.ts:22 ~ response:", response);
    // //custom response data success
    // return response && response.data ? response.data : response;

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // console.log("🚀 ~ file: api-client.ts:28 ~ error:", error);
    // // custom response data error
    // return error && error.response && error.response.data
    //   ? error.response.data
    //   : Promise.reject(error);

    return Promise.reject(error);
  }
);

export default apiClient;

export { CanceledError };
