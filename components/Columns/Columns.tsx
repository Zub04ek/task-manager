'use client';

import { useEffect, useState } from 'react';

// import { useEditTask } from '@/app/api/hooks';
import { Column } from '@/components/Column';
import { useTasksStore } from '@/stores';
import { ColumnType, Task } from '@/types';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  // DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

// import { TaskItem } from '../TaskItem';

// export const Columns = () => {
//   const selectedTask = useSelectedTask((state) => state.task);
//   const setAllTasks = useTasksStore((state) => state.setTasks);

//   const { data: allTasks, isPending, error } = useTasks();

//   useEffect(() => {
//     if (allTasks) {
//       setAllTasks(allTasks);
//     }
//   }, [allTasks]);

//   if (isPending)
//     return (
//       <div className="flex h-full items-center justify-center">
//         <Loader className="size-6 animate-spin text-muted-foreground" />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="grid h-full place-content-center px-4">
//         <div className="text-center">
//           <h1>Oops, something went wrong!</h1>
//           <h2 className="text-sm font-medium text-muted-foreground">
//             {error.message}
//           </h2>
//         </div>
//       </div>
//     );

//   return (
//     <section className="grid h-full gap-6 lg:grid-cols-3">
//       <TaskForm initialData={selectedTask} />
//       <Column title="To do" status="TO_DO" />
//       <Column title="In progress" status="IN_PROGRESS" />
//       <Column title="Done" status="DONE" />
//     </section>
//   );
// };

// const defaultAnnouncements = {
//   onDragStart(id) {
//     console.log(`Picked up draggable item ${id}.`);
//   },
//   onDragOver(id, overId) {
//     if (overId) {
//       console.log(
//         `Draggable item ${id} was moved over droppable area ${overId}.`
//       );
//       return;
//     }

//     console.log(`Draggable item ${id} is no longer over a droppable area.`);
//   },
//   onDragEnd(id, overId) {
//     if (overId) {
//       console.log(
//         `Draggable item ${id} was dropped over droppable area ${overId}`
//       );
//       return;
//     }

//     console.log(`Draggable item ${id} was dropped.`);
//   },
//   onDragCancel(id) {
//     console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
//   },
// };

const COLUMNS: ColumnType[] = [
  { id: 'TO_DO', title: 'To do' },
  { id: 'IN_PROGRESS', title: 'In progress' },
  { id: 'DONE', title: 'Done' },
];

// type ColumnsType = {
//   TO_DO: Task[];
//   IN_PROGRESS: Task[];
//   DONE: Task[];
// };

export const Columns = () => {
  const allTasks = useTasksStore((state) => state.tasks);

  const [items, setItems] = useState<Record<string, Task[]>>({
    TO_DO: [],
    IN_PROGRESS: [],
    DONE: [],
  });
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  // const setAllTasks = useTasksStore((state) => state.setTasks);
  // const { mutate: editTaskMutate } = useEditTask();

  useEffect(() => {
    if (allTasks) {
      setItems({
        TO_DO: allTasks.filter((task) => task.status === 'TO_DO'),
        IN_PROGRESS: allTasks.filter((task) => task.status === 'IN_PROGRESS'),
        DONE: allTasks.filter((task) => task.status === 'DONE'),
      });
    }
  }, [allTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findContainer(id: UniqueIdentifier) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].some((el) => el.id === id)
    );
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;

    // const { id: overId } = over;

    const overId = over?.id;
    if (!overId) return;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((items) => {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems?.findIndex(
        (item) => item.id === activeId
      );
      const overIndex = overItems?.findIndex((item) => item.id === overId);
      let newIndex: number;
      if (overId in items) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      return {
        ...items,
        [activeContainer]: items[activeContainer].filter(
          (item) => item.id !== active.id
        ),
        [overContainer]: [
          ...items[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...items[overContainer].slice(newIndex, items[overContainer].length),
        ],
      };
    });

    // setItems((prev) => {
    //   const activeItems = prev[activeContainer];
    //   const overItems = prev[overContainer];

    //   // Find the indexes for the items
    //   const activeIndex = activeItems.indexOf(id);
    //   const overIndex = overItems.indexOf(overId);

    //   let newIndex;
    //   if (overId in prev) {
    //     // We're at the root droppable of a container
    //     newIndex = overItems.length + 1;
    //   } else {
    //     const isBelowLastItem =
    //       over &&
    //       overIndex === overItems.length - 1 &&
    //       draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

    //     const modifier = isBelowLastItem ? 1 : 0;

    //     newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
    //   }

    //   return {
    //     ...prev,
    //     [activeContainer]: [
    //       ...prev[activeContainer].filter((item) => item !== active.id),
    //     ],
    //     [overContainer]: [
    //       ...prev[overContainer].slice(0, newIndex),
    //       items[activeContainer][activeIndex],
    //       ...prev[overContainer].slice(newIndex, prev[overContainer].length),
    //     ],
    //   };
    // });
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;
    if (!overId) return;
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer]?.findIndex(
      (item) => item.id === activeId
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item.id === overId
    );

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    setActiveId(null);

    // if (!over) return;
    // const taskId = active.id as string;
    // const newStatus = over.id as Task['status'];
    // const updatedTasks = allTasks.map((task) =>
    //   task.id === taskId
    //     ? {
    //         ...task,
    //         status: newStatus,
    //       }
    //     : task
    // );
    // setAllTasks(updatedTasks);

    // const task = { id: taskId, status: newStatus };
    //   editTaskMutate(task);
  };

  // const activeTask = useMemo(() => {
  //   if (activeId) {
  //     return allTasks.find((task) => task.id === activeId);
  //   }
  // }, [activeId]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {COLUMNS.map((column) => {
        return (
          <Column
            key={column.id}
            title={column.title}
            status={column.id}
            items={items[column.id]}
          />
        );
      })}

      {/* <Column title="To do" status="TO_DO" items={items.TO_DO} />
      <Column
        title="In progress"
        status="IN_PROGRESS"
        items={items.IN_PROGRESS}
      />
      <Column title="Done" status="DONE" items={items.DONE} /> */}

      {/* </SortableContext> */}
      {/* ); */}
      {/* })} */}
      {/* <DragOverlay>
        {activeId ? <TaskItem task={activeTask} /> : null}
      </DragOverlay> */}
    </DndContext>
  );
};
