import jtRequest from '@/services/request/jtRequest'

export function loginRequest(data) {
  const { username, password } = data
  return jtRequest.post({
    url: '/admin/acl/index/login',
    data: {
      username,
      password,
    },
  })
}
