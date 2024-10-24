'use client';

import { Column } from './column';

export const Columns = () => {
  return (
    <section className="grid h-full gap-6 lg:grid-cols-3">
      <Column title="To do" status="to do" />
      <Column title="In progress" status="in progress" />
      <Column title="Done" status="done" />
    </section>
  );
};
