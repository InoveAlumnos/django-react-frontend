import { api } from "./client"

const controller = new AbortController();

export const LoginAPI = {
  post: async function (username, password) {
    
    const response = await api.request({
      url: `api/login/`,
      method: "POST",
      data: {
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