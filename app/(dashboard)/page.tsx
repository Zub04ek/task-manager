import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Columns } from '@/components/Columns';
import { TasksPage } from '@/components/TasksPage';

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <TasksPage className="grid gap-6 lg:grid-cols-3">
      <Columns />
    </TasksPage>
  );
}
