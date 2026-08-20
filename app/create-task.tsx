import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useState } from 'react';

import {
  useAppDispatch,
} from '../src/presentation/hooks/useTasks';

import { addTask } from '../src/store/taskSlice';

export default function CreateTaskScreen() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleTitleChange = (value: string) => {
    setTitle(value);

    // Clear validation error when user starts correcting input
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required');
      return;
    }

    try {
      await dispatch(addTask(trimmedTitle)).unwrap();

      router.back();
    } catch {
      Alert.alert(
        'Error',
        'Unable to create task',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Task title
      </Text>

      <TextInput
        value={title}
        onChangeText={handleTitleChange}
        placeholder="Enter task title"
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        accessibilityLabel="Task title"
        accessibilityState={{
          invalid: !!error,
        }}
        autoCapitalize="sentences"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      {error ? (
        <Text
          style={styles.errorText}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          title="Create"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },

  inputError: {
    borderColor: '#D32F2F',
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});