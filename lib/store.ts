import { SERVICES } from './data'
import type { FormBlock } from './types'


export const SERVICE_STORE = [...SERVICES]


export function updateServiceFormBlocks(
  serviceId: number,
  blocks: FormBlock[]
) {
  const service = SERVICE_STORE.find(
    (s) => s.id === serviceId
  )

  if (!service) return

  service.formBlocks = blocks
}


export function getService(serviceId: number) {
  return SERVICE_STORE.find(
    (s) => s.id === serviceId
  )
}