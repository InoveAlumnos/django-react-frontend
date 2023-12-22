import { api } from "./client"

const controller = new AbortController();

export const UserAPI = {
  post: async function (first_name, last_name, email, username, password) {
    const response = await api.request({
      url: `api/users/modelviewset/users/`,
      method: "POST",
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username,
        password: password,
      },
      signal: controller.signal
    })
    if(response) {
      return response.data
    }
  },
  put: async function (id, first_name, last_name, email, username, password) {
    const response = await api.request({
      url: `api/users/modelviewset/users/${id}/`,
      method: "PUT",
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username,
        password: password,
      },
      signal: controller.signal
    })
    if(response) {
      return response.data
    }
  },
  abort: function(){
    controller.abort()
  },
}