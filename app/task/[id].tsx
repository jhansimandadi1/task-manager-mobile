import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
  
  import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
  
  import { taskRepository } from '../../src/data/repositories';
import { Task } from '../../src/domain/entities/Task';
  
  import {
  useAppDispatch
} from '../../src/presentation/hooks/useTasks';
  
  import {
  removeTask,
  updateTask
} from '../../src/store/taskSlice';
  
  export default function TaskDetailsScreen() {
    const { id } = useLocalSearchParams<{
      id: string;
    }>();
  
    const router = useRouter();
  
    const dispatch = useAppDispatch();
  
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      loadTask();
    }, [id]);
  
    const loadTask = async () => {
      try {
        const result = await taskRepository.getTask(
          Number(id),
        );
  
        setTask(result);
      } catch {
        Alert.alert(
          'Error',
          'Unable to load task',
        );
      } finally {
        setLoading(false);
      }
    };
  
    const handleComplete = async () => {
      if (!task) {
        return;
      }
  
      const updated = {
        ...task,
        completed: !task.completed,
      };
  
      try {
        const result = await dispatch(
          updateTask(updated),
        ).unwrap();
  
        setTask(result);
      } catch {
        Alert.alert(
          'Error',
          'Unable to update task',
        );
      }
    };
  
    const handleDelete = async () => {
      if (!task) {
        return;
      }
  
      try {
        await dispatch(
          removeTask(task.id),
        ).unwrap();
  
        router.back();
      } catch {
        Alert.alert(
          'Error',
          'Unable to delete task',
        );
      }
    };
  
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      );
    }
  
    if (!task) {
      return (
        <View style={styles.center}>
          <Text>Task not found</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {task.todo}
        </Text>
  
        <Text>
          Status:{' '}
          {task.completed
            ? 'Completed'
            : 'Pending'}
        </Text>
  
        <Button
          title={
            task.completed
              ? 'Mark Pending'
              : 'Mark Completed'
          }
          onPress={handleComplete}
        />
  
        <Button
          title="Delete"
          onPress={handleDelete}
          color="red"
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      gap: 20,
    },
  
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    title: {
      fontSize: 22,
      fontWeight: '700',
    },
  });