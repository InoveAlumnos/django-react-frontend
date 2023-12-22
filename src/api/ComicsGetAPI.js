import { api } from "./client"

const controller = new AbortController();

export const ComicsGetAPI = {
  getAll: async function () {
    
    const response = await api.request({
      url: `api/comics/list/`,
      method: "GET",
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