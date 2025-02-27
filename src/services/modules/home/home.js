import jtRequest from '@/services/request/jtRequest'

export function getMenuList() {
  return jtRequest.get({
    url: '/admin/acl/index/menu',
  })
}
