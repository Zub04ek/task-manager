import { Columns } from '@/components/Columns';
import { TasksPage } from '@/components/TasksPage';

export default function Home() {
  return (
    <TasksPage className="grid gap-6 lg:grid-cols-3">
      <Columns />
    </TasksPage>
  );
}
