import JTRequest from '.'

const jtRequest = new JTRequest({
  interceptors: {
    requestFulfillFn: (config) => {
      config.headers.token = localStorage.getItem('token')
      return config
    },
  },
})

export default jtRequest
