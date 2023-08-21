import openai from '@/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { todos } = await request.json();

  //Communicate with OpenAI API
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content:
          'When responding,Welcome the user always as Guest and say welcome to the Agile Task AI , Limit the response to 200 characters.',
      },
      {
        role: 'user',
        content: `Hi there, provide a summary of the following todos, count how many todos are in each category such as to do, in progress, and done, then tell the user which tasks are more important in (todo and inprogress category) and limit the suggestion to 400 characters! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { data } = response;

  return NextResponse.json(data.choices[0].message);
}
