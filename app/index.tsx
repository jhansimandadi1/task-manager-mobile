import {
  ActivityIndicator, Button, FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { TaskItem } from '../src/presentation/components/TaskItem';
import {
  useAppDispatch,
  useAppSelector
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
        <ActivityIndicator />
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>

        <Button
          title="Retry"
          onPress={() => dispatch(fetchTasks())}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Create Task"
        onPress={() => router.push('/create-task')}
      />

      <FlatList
        data={items}
        keyExtractor={item => String(item.id)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
  },
});