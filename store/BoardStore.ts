import { ID, databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

  newTodoInput: string;
  setNewTodoInput: (input: string) => void;

  newTodoType: TypedColumn;
  setNewTodoType: (newTodoType: TypedColumn) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  image: File | null;
  setImage: (image: File | null) => void;

  addTodo: (todo: string, columnId: TypedColumn, image?: File | null) => void;
  deleteTodo: (todoIndex: number, todo: Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },

  // New todo input
  newTodoInput: '',
  setNewTodoInput: (input: string) => set({ newTodoInput: input }),

  // Search string
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),

  // Get board from DB
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  // Set board state
  setBoardState: (board) => set({ board }),

  // Set new todo type
  newTodoType: 'todo',
  setNewTodoType: (columnId: TypedColumn) => set({ newTodoType: columnId }),

  // Set image
  image: null,
  setImage: (image: File | null) => set({ image }),

  // Delete todo from board
  deleteTodo: async (todoIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);

    newColumns.get(id)?.todos.splice(todoIndex, 1);

    set({
      board: {
        columns: newColumns,
      },
    });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      todo.$id
    );
  },

  // Update todo in DB
  updateTodoInDB: async (todo, columnId) => {
    const { databases } = await import('@/appwrite');

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  // Add new todo to board
  addTodo: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({ newTodoInput: '' });

    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },

  //End of add todo
}));
