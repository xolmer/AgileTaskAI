'use client';

import { useBoardStore } from '@/store/BoardStore';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const types = [
  {
    id: 'todo',
    name: 'Todo',
    description: 'A Todo that needs to be done',
    color: 'bg-red-600',
  },
  {
    id: 'inprogress',
    name: 'In Progress',
    description: 'A Todo that is currently in progress',
    color: 'bg-yellow-600',
  },
  {
    id: 'done',
    name: 'Done',
    description: 'A Todo that is completed',
    color: 'bg-green-600',
  },
];

function TaskTypeRadioGroup() {
  const [setNewTodoType, newTodoType] = useBoardStore((state) => [
    state.setNewTodoType,
    state.newTodoType,
  ]);
  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTodoType} onChange={(e) => setNewTodoType(e)}>
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-blue-500 ring-white ring-opacity-60'
                      : ''
                  }
                    ${checked ? `${type.color} bg-opacity-75 text-white ` : 'bg-white '}
                        relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-bold  ${
                              checked ? 'text-white text-xl' : 'text-gray-900'
                            }`}
                          >
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked ? 'text-white' : 'text-gray-500'}`}
                          >
                            <span>{type.description}</span>{' '}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckCircleIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default TaskTypeRadioGroup;
