import { databases } from '@/appwrite';

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );

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

  console.log('columns', columns);
};
