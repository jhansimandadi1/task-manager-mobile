import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Task } from '../../domain/entities/Task';

interface TaskItemProps {
  task: Task;
  onPress: () => void;
}

export function TaskItem({
  task,
  onPress,
}: TaskItemProps) {
  const status = task.completed
    ? 'Completed'
    : 'Pending';

  const statusColor = task.completed
    ? '#2E7D32' // Green
    : '#F9A825'; // Yellow

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${task.todo}, status ${status}`}
    >
      <View style={styles.container}>
        <Text style={styles.taskName}>
          {task.todo}
        </Text>

        <Text
          style={[
            styles.status,
            { color: statusColor },
          ]}
        >
        {status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  taskName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },

  status: {
    fontSize: 14,
    fontWeight: '600',
  },
});