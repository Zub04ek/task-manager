import { TaskList } from '@/components/TaskList';
import { TasksPage } from '@/components/TasksPage';

export default function Planned() {
  return (
    <TasksPage className="grid grid-rows-[36px_1fr] gap-3 rounded-xl bg-accent p-6 lg:h-full">
      <div className="flex items-center justify-between pr-3">
        <h2 className="font-semibold">Planned tasks</h2>
      </div>
      <TaskList
        className="grid gap-6 overflow-y-auto [grid-auto-rows:152px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        status="TO_DO"
      />
    </TasksPage>
  );
}
