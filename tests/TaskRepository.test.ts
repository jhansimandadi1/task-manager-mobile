import { taskApi } from '../src/data/api/taskApi';
import { TaskRepositoryImpl } from '../src/data/repositories/TaskRepositoryImpl';

jest.mock('../src/data/api/taskApi');

const mockedTaskApi = jest.mocked(taskApi);

describe('TaskRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns tasks from API', async () => {
    const tasks = [
      {
        id: 1,
        title: 'Test task',
        completed: false,
        userId: 1,
      },
    ];

    mockedTaskApi.getTasks.mockResolvedValue(tasks);

    const repository = new TaskRepositoryImpl();

    const result = await repository.getTasks();

    expect(result).toEqual(tasks);
    expect(mockedTaskApi.getTasks).toHaveBeenCalledTimes(1);
  });
});