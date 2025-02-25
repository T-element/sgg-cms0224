import JTRequest from '.'

const jtRequest = new JTRequest({
  interceptors: {
    requestFulfillFn: (config) => {
      return config
    },
  },
})

export default jtRequest
