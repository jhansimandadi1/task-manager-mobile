import { CreateTask } from '../src/application/useCases/CreateTask';
import { Task } from '../src/domain/entities/Task';
import { TaskRepository } from '../src/domain/repositories/TaskRepository';

describe('CreateTask', () => {
  let repository: jest.Mocked<TaskRepository>;
  let useCase: CreateTask;

  beforeEach(() => {
    repository = {
      getTasks: jest.fn(),
      getTask: jest.fn(),
      createTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    };

    useCase = new CreateTask(repository);
  });

  describe('successful creation', () => {
    it('should create a task with a valid title', async () => {
      const task: Task = {
        id: 1,
        title: 'Complete assessment',
        completed: false,
        userId: 1,
      };

      repository.createTask.mockResolvedValue(task);

      const result = await useCase.execute(
        'Complete assessment',
      );

      expect(repository.createTask).toHaveBeenCalledWith(
        'Complete assessment',
      );

      expect(repository.createTask).toHaveBeenCalledTimes(1);

      expect(result).toEqual(task);
    });

    it('should trim whitespace before creating the task', async () => {
      const task: Task = {
        id: 1,
        title: 'Complete assessment',
        completed: false,
        userId: 1,
      };

      repository.createTask.mockResolvedValue(task);

      await useCase.execute(
        '   Complete assessment   ',
      );

      expect(repository.createTask).toHaveBeenCalledWith(
        'Complete assessment',
      );
    });
  });

  describe('validation', () => {
    it('should throw an error when title is empty', () => {
      expect(() => {
        useCase.execute('');
      }).toThrow('Task title is required');

      expect(
        repository.createTask,
      ).not.toHaveBeenCalled();
    });

    it('should throw an error when title contains only spaces', () => {
      expect(() => {
        useCase.execute('   ');
      }).toThrow('Task title is required');

      expect(
        repository.createTask,
      ).not.toHaveBeenCalled();
    });

    it('should throw an error when title contains only tabs and spaces', () => {
      expect(() => {
        useCase.execute(' \t  ');
      }).toThrow('Task title is required');

      expect(
        repository.createTask,
      ).not.toHaveBeenCalled();
    });

    it('should not call the repository when validation fails', () => {
      expect(() => {
        useCase.execute('');
      }).toThrow();

      expect(
        repository.createTask,
      ).not.toHaveBeenCalled();
    });
  });

  describe('repository errors', () => {
    it('should propagate repository errors', async () => {
      const error = new Error(
        'Failed to create task',
      );

      repository.createTask.mockRejectedValue(error);

      await expect(
        useCase.execute('Complete assessment'),
      ).rejects.toThrow(
        'Failed to create task',
      );
    });
  });
});