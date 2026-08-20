import {
    Alert,
    Button,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
  
  import { useRouter } from 'expo-router';
import { useState } from 'react';
  
  import {
    useAppDispatch
} from '../src/presentation/hooks/useTasks';
  
  import { addTask } from '../src/store/taskSlice';
  
  export default function CreateTaskScreen() {
    const router = useRouter();
  
    const dispatch = useAppDispatch();
  
    const [title, setTitle] = useState('');
  
    const handleSubmit = async () => {
      if (!title.trim()) {
        Alert.alert(
          'Validation',
          'Please enter a task title',
        );
  
        return;
      }
  
      try {
        await dispatch(addTask(title)).unwrap();
  
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
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          style={styles.input}
          accessibilityLabel="Task title"
        />
  
        <Button
          title="Create"
          onPress={handleSubmit}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
  
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: 16,
      borderRadius: 6,
    },
  });