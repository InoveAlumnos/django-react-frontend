import { api } from "./client"

const controller = new AbortController();

export const buyAPI = {
  post: async function (cart) {
    
    const response = await api.request({
      url: `api/buy/`,
      method: "POST",
      data: {
        cart: cart
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