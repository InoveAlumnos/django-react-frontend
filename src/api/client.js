import axios from 'axios'

// Dev enviroment
const baseURL = `http://${window.location.hostname}:8000/e-commerce/`;

export const api = axios.create({
    baseURL: baseURL,
});

const item = JSON.parse(sessionStorage.getItem('userDataEcommerce'));

api.interceptors.request.use(function (config) {
  const token = item? item.token : ""
  config.headers = {
    "Authorization": `Token ${token}`
  }
  return config
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  // const statusCode = error.response?.status

  if (axios.isCancel(error)) {
    console.log('successfully aborted');
    return;
  }

  // logging only errors that are not 401
  // if (statusCode && statusCode !== 401) {
  //   console.error(error);
  // }

  return Promise.reject(error)
}
  
// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})
