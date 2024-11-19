import { Column } from '@/components/Column';
// import { Columns } from '@/components/Columns';
import { TasksPage } from '@/components/TasksPage';

export default function Home() {
  return (
    <TasksPage className="grid h-full gap-6 lg:grid-cols-3">
      <Column title="To do" status="TO_DO" />
      <Column title="In progress" status="IN_PROGRESS" />
      <Column title="Done" status="DONE" />
    </TasksPage>
  );
}
