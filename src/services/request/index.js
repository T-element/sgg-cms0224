import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const TIMEOUT = import.meta.env.VITE_TIMEOUT

class JTRequest {
  constructor(config) {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      ...config,
    })

    this.instance.interceptors.request.use(
      config.interceptors.requestFulfillFn,
      config.interceptors.requestRejectFn,
    )

    this.instance.interceptors.response.use(
      config.interceptors.responseFulfillFn,
      config.interceptors.responseRejectFn,
    )
  }

  request(config) {
    return this.instance.request({
      ...config,
    })
  }

  get(config) {
    return this.request({
      ...config,
      method: 'GET',
    })
  }

  post(config) {
    return this.request({
      ...config,
      method: 'POST',
    })
  }

  delete(config) {
    return this.request({
      ...config,
      method: 'DELETE',
    })
  }

  patch(config) {
    return this.request({
      ...config,
      method: 'PATCH',
    })
  }
}

export default JTRequest
