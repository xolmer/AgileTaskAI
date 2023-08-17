'use client';

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Board = () => {
  const getBoard = useBoardStore((state) => state.getBoard);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <h1>Hello</h1>
    // <DragDropContext onDragEnd={() => {}}>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div className="">{/* Rendering all the columns */}</div>}
    //   </Droppable>
    // </DragDropContext>
  );
};

export default Board;
