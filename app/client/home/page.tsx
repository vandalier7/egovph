'use client';

import { useRouter } from 'next/navigation';
import CitizenHome from './CitizenHome';

export default function Page() {
  const router = useRouter();

  const handleSelectProgram = (id: number) => {
    router.push(`/client/programs/${id}`);
  };

  return (
    <CitizenHome
      onSelectProgram={handleSelectProgram}
    />
  );
}