'use client'

import { useParams, useRouter } from 'next/navigation'

import LGUProgramEdit from './HomeEdit'

import { MY_LGUS, SERVICES } from '@/lib/data'

import type { LGU, Service } from '@/lib/types'


export default function LGUPage() {

  const params = useParams()
  const router = useRouter()

  const lguId = Number(params.lguId)


  const lgu: LGU | undefined =
    MY_LGUS.find(
      (l) => l.id === lguId
    )


  if (!lgu) {
    return <div>LGU not found</div>
  }


  const services: Service[] =
    SERVICES.filter(
      (s) => s.lguId === lgu.id
    )


  return (
    <LGUProgramEdit
      lgu={lgu}
      services={services}
      onGoToFormEdit={(service) => {
        router.push(
          `/lgu/${lgu.id}/formEdit/${service.id}`
        )
      }}
    />
  )
}