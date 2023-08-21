import { databases } from '@/appwrite';

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );

  console.log('DATA====>>>>>>>>>', data);

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    const column = todo.status;

    if (!acc.get(column)) {
      acc.set(column, {
        id: column,
        todos: [],
      });
    }

    acc.get(column)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  // If columns doesn't have inprogress , todo and done add them with empty todos
  const columnsTypes: TypedColumn[] = ['todo', 'inprogress', 'done'];

  for (const columnType of columnsTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // Sort todos by Column type
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnsTypes.indexOf(a[0]) - columnsTypes.indexOf(b[0] as any)
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };
  return board;
};
