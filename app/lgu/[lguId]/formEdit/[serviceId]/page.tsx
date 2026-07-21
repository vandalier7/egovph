'use client'

import { useParams, useRouter } from 'next/navigation'

import FormEdit from './FormEdit'

import { MY_LGUS } from '@/lib/data'

import { getService } from '@/lib/store'

import type { LGU, Service } from '@/lib/types'


export default function FormEditPage() {

  const params = useParams()
  const router = useRouter()
  
  
  const lguId = Number(params.lguId)
  const serviceId = Number(params.serviceId)


  const lgu: LGU | undefined =
    MY_LGUS.find(
      (l) => l.id === lguId
    )


  const service = getService(serviceId)


  if (!lgu) {
    return <div>LGU not found</div>
  }


  if (!service) {
    return <div>Service not found</div>
  }


  return (
    <FormEdit
      lgu={lgu}
      service={service}
      blocks={service.formBlocks}
      onBack={() =>
        router.push(`/lgu/${lguId}`)
      }
    />
  )
}