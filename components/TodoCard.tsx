'use client';

import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
  const deleteTodo = useBoardStore((state) => state.deleteTodo);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) setImageUrl(url.toString());
      };

      fetchImage();
    }
  }, [todo]);

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTodo(index, todo, id)}
          className="text-red-700 hover:text-red-600"
        >
          <XCircleIcon className="h-8 w-8 ml-5 " />
        </button>
      </div>
      {/* Image */}
      {imageUrl && (
        <div className="h-full rounded-b-md w-full">
          <Image
            src={imageUrl}
            width={400}
            height={200}
            alt="Todo Image"
            className="rounded-b-md object-contain w-full"
          />
        </div>
      )}
    </div>
  );
}

export default TodoCard;
