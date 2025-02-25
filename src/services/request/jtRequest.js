import JTRequest from '.'

const jtRequest = new JTRequest({
  interceptors: {
    requestFulfillFn: (config) => {
      console.log(config)
      return config
    },
  },
})

export default jtRequest
