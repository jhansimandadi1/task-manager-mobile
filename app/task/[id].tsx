import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { useEffect, useRef, useState } from 'react';

import { taskRepository } from '../../src/data/repositories';
import { Task } from '../../src/domain/entities/Task';

import {
  useAppDispatch,
} from '../../src/presentation/hooks/useTasks';

import {
  removeTask,
  updateTask,
} from '../../src/store/taskSlice';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const toastOpacity = useRef(
    new Animated.Value(0),
  ).current;

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

  const showToast = (message: string) => {
    setToastMessage(message);

    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.delay(1800),

      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToastMessage('');
    });
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

      showToast(
        result.completed
          ? 'Task marked as completed'
          : 'Task marked as pending',
      );
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
        <ActivityIndicator size="large" />
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

  const status = task.completed
    ? 'Completed'
    : 'Pending';

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {task.todo}
        </Text>

        <View
          style={[
            styles.statusBadge,
            task.completed
              ? styles.completedBadge
              : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              task.completed
                ? styles.completedText
                : styles.pendingText,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={
              task.completed
                ? 'Mark Pending'
                : 'Mark Completed'
            }
            onPress={handleComplete}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Delete"
            onPress={handleDelete}
            color="red"
          />
        </View>
      </View>

      {toastMessage ? (
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: toastOpacity,
            },
          ]}
          accessibilityRole="alert"
        >
          <Text style={styles.toastText}>
            ✓ {toastMessage}
          </Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    marginRight: 12,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  pendingBadge: {
    backgroundColor: '#FFF3CD',
  },

  completedBadge: {
    backgroundColor: '#DFF5E1',
  },

  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },

  pendingText: {
    color: '#F9A825',
  },

  completedText: {
    color: '#2E7D32',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  button: {
    flex: 1,
  },

  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#333',
    alignItems: 'center',
  },

  toastText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});