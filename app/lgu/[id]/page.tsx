import LguAdminPortal from '@/components/admin/LguAdminPortal';

export default async function LguAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LguAdminPortal lguId={id} />;
}
