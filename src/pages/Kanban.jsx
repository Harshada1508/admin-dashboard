import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../components/SortableItem';

const Kanban = () => {
  const [columns, setColumns] = useState({
    todo: [
      { id: 'task-1', title: 'Design login UI' },
      { id: 'task-2', title: 'Set up routing' },
    ],
    doing: [
      { id: 'task-3', title: 'Implement dashboard' },
    ],
    done: [
      { id: 'task-4', title: 'Install Tailwind CSS' },
    ],
  });

  const [activeItem, setActiveItem] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = ({ active }) => {
    setActiveItem(active.data.current);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const fromCol = active.data.current.column;
    const toCol = over.data.current.column;

    if (fromCol === toCol && active.id === over.id) return;

    const fromItems = [...columns[fromCol]];
    const toItems = [...columns[toCol]];

    const draggedItemIndex = fromItems.findIndex(i => i.id === active.id);
    const draggedItem = fromItems.splice(draggedItemIndex, 1)[0];

    toItems.splice(over.data.current.index, 0, draggedItem);

    setColumns(prev => ({
      ...prev,
      [fromCol]: fromItems,
      [toCol]: toItems,
    }));

    setActiveItem(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🗂️ Kanban Board</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([colKey, items]) => (
            <div key={colKey} className="bg-gray-50 rounded p-4 shadow min-h-[300px]">
              <h3 className="text-lg font-semibold capitalize mb-3">{colKey}</h3>
              <SortableContext
                items={items.map(i => i.id)}
                strategy={rectSortingStrategy}
              >
                {items.map((item, index) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    index={index}
                    column={colKey}
                  />
                ))}
              </SortableContext>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeItem ? (
            <div className="bg-white shadow-lg p-3 rounded text-gray-800">{activeItem.title}</div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Kanban;
