import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { TaskItem } from '../src/presentation/components/TaskItem';

import {
  useAppDispatch,
  useAppSelector,
} from '../src/presentation/hooks/useTasks';

import { fetchTasks } from '../src/store/taskSlice';

export default function TaskListScreen() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    items,
    loading,
    error,
  } = useAppSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading && items.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error}
        </Text>

        <Pressable
          style={styles.retryButton}
          onPress={() => dispatch(fetchTasks())}
          accessibilityRole="button"
          accessibilityLabel="Retry loading tasks"
        >
          <Text style={styles.retryText}>
            Retry
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={
          items.length === 0
            ? styles.emptyList
            : styles.list
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(fetchTasks())}
          />
        }
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() =>
              router.push(`/task/${item.id}`)
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tasks found
          </Text>
        }
      />

      {/* Floating Action Button */}
      <Pressable
        style={styles.fab}
        onPress={() => router.push('/create-task')}
        accessibilityRole="button"
        accessibilityLabel="Create new task"
        accessibilityHint="Opens the create task screen"
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    paddingTop: 8,
    paddingBottom: 100,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  empty: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },

  error: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#d32f2f',
  },

  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#333',
  },

  retryText: {
    color: '#fff',
    fontWeight: '600',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,

    width: 56,
    height: 56,

    borderRadius: 28,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#007AFF',

    elevation: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 32,
  },
});