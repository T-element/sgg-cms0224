import jtRequest from '@/services/request/jtRequest'

export function getUserList(config) {
  const { page, limit, name = '' } = config
  return jtRequest.get({
    url: `/admin/acl/user/${page}/${limit}?username=${name}`,
  })
}

export function getAssignRolesById(userId) {
  return jtRequest.get({
    url: `/admin/acl/user/toAssign/${userId}`,
  })
}

export function patchAssignRole(config) {
  return jtRequest.post({
    url: '/admin/acl/user/doAssignRole',
    data: {
      ...config,
    },
  })
}

export function createUser(config) {
  return jtRequest.post({
    url: '/admin/acl/user/save',
    data: {
      ...config,
    },
  })
}

export function updataUser(config) {
  return jtRequest.put({
    url: '/admin/acl/user/update',
    data: {
      ...config,
    },
  })
}

export function deleteUserById(id) {
  return jtRequest.delete({
    url: `/admin/acl/user/remove/${id}`,
  })
}
