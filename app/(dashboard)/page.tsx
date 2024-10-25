import { TasksList } from '@/components/TasksList';

// import { Columns } from '../components';

export default function Home() {
  return (
    <div className="grid h-full gap-6 lg:grid-cols-3">
      <TasksList />
    </div>
    // <Columns />
  );
}
