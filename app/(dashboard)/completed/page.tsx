import { TaskList } from '@/components/TaskList';

export default function Completed() {
  return (
    <section className="h-full rounded-xl bg-accent p-6">
      <TaskList
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        status="DONE"
      />
    </section>
  );
}
