// 'use client';
// import { useSession } from 'next-auth/react';

import { Columns } from '@/components/Columns';
import { TasksPage } from '@/components/TasksPage';

export default function Home() {
  // const { data } = useSession();
  return (
    <TasksPage className="grid gap-6 lg:grid-cols-3">
      <Columns />
    </TasksPage>
  );
  // return <main>{JSON.stringify(data)}</main>;
}
