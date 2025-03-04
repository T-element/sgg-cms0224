import jtRequest from '@/services/request/jtRequest'

export function getBrandList(config) {
  const { page, limit } = config
  return jtRequest.get({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
  })
}
