import jtRequest from '@/services/request/jtRequest'

export function getRoleList(config) {
  const { page, limit, roleName = '' } = config
  return jtRequest.get({
    url: `/admin/acl/role/${page}/${limit}?roleName=${roleName}`,
  })
}

export function getPermissionList() {
  return jtRequest.get({
    url: '/admin/acl/permission',
  })
}

export function getRolePermissionById(id) {
  return jtRequest.get({
    url: `/admin/acl/permission/toAssign/${id}`,
  })
}

export function assignPermission(config) {
  const { roleId, permissionIdList } = config
  return jtRequest.post({
    url: `/admin/acl/permission/doAssign?roleId=${roleId}&permissionId=${permissionIdList.join(',')}`,
  })
}

export function createRole(config) {
  return jtRequest.post({
    url: '/admin/acl/role/save',
    data: {
      ...config,
    },
  })
}

export function updataRole(config) {
  return jtRequest.put({
    url: '/admin/acl/role/update',
    data: {
      ...config,
    },
  })
}

export function deleteRoleById(id) {
  return jtRequest.delete({
    url: `/admin/acl/role/remove/${id}`,
  })
}
