import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, title, index, column }) => {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id,
    data: {
      index,
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 mb-2 rounded shadow cursor-move"
    >
      {title}
    </div>
  );
};
