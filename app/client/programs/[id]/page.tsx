import { MY_LGUS } from '@/lib/data'
import CitizenProgram from './CitizenProgram'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const program = MY_LGUS.find(
    (item) => item.id === Number(id)
  )

  if (!program) {
    return <div>Program not found</div>
  }

  return <CitizenProgram program={program} />
}