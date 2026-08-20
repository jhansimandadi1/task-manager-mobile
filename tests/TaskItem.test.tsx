import {
  render
} from '@testing-library/react-native';

import { TaskItem } from '../src/presentation/components/TaskItem';

describe('TaskItem', () => {
  it('debug render', () => {
    const result = render(
      <TaskItem
        task={{
          id: 1,
          todo: 'Complete assessment',
          completed: false,
          userId: 1,
        }}
        onPress={jest.fn()}
      />,
    );

    console.log('RENDER RESULT:', Object.keys(result));
    console.log('RENDER TYPE:', typeof render);

    expect(result).toBeTruthy();
  });
});