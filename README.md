# Task Manager Mobile App

A simple React Native task management application built with **Expo, TypeScript, and Clean Architecture**. The project demonstrates practical software engineering principles including REST API integration, CRUD operations, navigation, background processing, accessibility, and automated testing.

## Overview

The application allows users to:

* View a list of tasks
* See the task name and current status
* Create a new task
* Update a task
* Delete a task
* Navigate between task screens
* Synchronise task information using a background task
* Handle API failures gracefully
* Run automated unit and component tests

The application is intentionally kept small and focused because the assessment requires an implementation that can be completed within a few hours.

---

# API / Data Source

The application uses **DummyJSON** as the REST API to demonstrate
CRUD operations without requiring a custom backend.

DummyJSON provides mock REST endpoints that are suitable for demonstrating
API integration in a mobile application assessment.

The application uses the DummyJSON Todo API for:

- Fetching tasks
- Creating tasks
- Updating tasks
- Deleting tasks

## Architecture

The project follows a simplified **Clean Architecture** approach.

### Architecture responsibilities

**Presentation**

Responsible for:

* Rendering UI
* User interaction
* Navigation
* Displaying loading/error states
* Dispatching application actions

**Application**

Contains business use cases such as:

* `GetTasks`
* `CreateTask`
* `UpdateTask`
* `DeleteTask`

**Domain**

Contains the core business models and abstractions.

The domain layer does not depend on React Native, Expo or Axios.

**Data**

Responsible for:

* REST API communication
* Repository implementations
* Mapping API responses to domain entities

---

## Project Structure

```text
TaskManager/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── create-task.tsx
│   └── task/
│       └── [id].tsx
│
├── src/
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Task.ts
│   │   │
│   │   └── repositories/
│   │       └── TaskRepository.ts
│   │
│   ├── application/
│   │   └── useCases/
│   │       ├── GetTasks.ts
│   │       ├── CreateTask.ts
│   │       ├── UpdateTask.ts
│   │       └── DeleteTask.ts
│   │
│   ├── data/
│   │   ├── api/
│   │   │   └── apiClient.ts
│   │   │
│   │   └── repositories/
│   │       └── TaskRepositoryImpl.ts
│   │
│   ├── presentation/
│   │   ├── components/
│   │   │   └── TaskItem.tsx
│   │   │
│   │   └── state/
│   │       └── taskSlice.ts
│   │
│   └── infrastructure/
│       └── background/
│           ├── backgroundTask.ts
│           └── registerBackgroundTask.ts
│
├── tests/
│   ├── CreateTask.test.ts
│   └── TaskItem.test.tsx
│
├── assets/
├── .gitignore
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

# Features

## 1. Task List

The main screen displays:

```text
Task Name                 Status

Complete assessment       Pending
Submit application        Completed
Prepare interview         Pending
```

Each task displays its name and current status.

---

## 2. Create Task

Users can enter a task title.

The application validates the input before sending the request to the API.

For example:

```text
Task title: Complete assessment
```

Empty or whitespace-only task names are rejected.

---

## 3. Update Task

Users can update the task information/status.

The update operation is handled through the application use-case layer rather than directly from the UI.

---

## 4. Delete Task

Tasks can be removed through the delete operation.

The flow is:

```text
UI->DeleteTask use case->TaskRepository->API
```

---

# API Integration

The application uses Axios for HTTP communication.

API responsibilities are isolated inside the data layer.

Example:

```text
Presentation->GetTasks->TaskRepository->TaskRepositoryImpl->Axios->REST API
```

This separation allows the API implementation to be replaced without changing the business logic.

---

# Navigation

The application uses **Expo Router** for file-based navigation.

```text
app/
│
├── index.tsx
│       └── Task List
│
├── create-task.tsx
│       └── Create Task
│
└── task/
    └── [id].tsx
            └── Task Details
```

Navigation configuration is defined in:

```text
app/_layout.tsx
```

Example:

```tsx
<Stack>
  <Stack.Screen
    name="index"
    options={{ title: 'Tasks' }}
  />

  <Stack.Screen
    name="create-task"
    options={{ title: 'Create Task' }}
  />

  <Stack.Screen
    name="task/[id]"
    options={{ title: 'Task Details' }}
  />
</Stack>
```

---

# Background Processing

Background synchronization is implemented using:

* `expo-background-task`
* `expo-task-manager`

The background task retrieves tasks and performs synchronization-related processing.

```text
Background Task
       ↓
Task Repository
       ↓
REST API
```
# State Management

Redux Toolkit is used for application state where appropriate.

The UI does not contain the core business logic.

Redux is primarily responsible for maintaining and exposing application state to the presentation layer.

---

# Error Handling

The application handles common failure scenarios including:

* Empty task title
* API failure
* Background task failure
* Loading state
* Failed task retrieval

Errors are handled at appropriate architectural boundaries rather than exposing raw API implementation details to the UI.

---

# Testing

The project uses:

* Jest
* React Native Testing Library

---

# Installation

Clone the repository:

```bash
git clone https://github.com/jhansimandadi1/task-manager-mobile.git
```

Navigate to the project:

```bash
cd task-manager-mobile
```

Install dependencies:

```bash
npm install
```

---

# Running the Application

Start Expo:

```bash
npm start
```

### Web

```bash
npx expo start --web
```

### iOS

Make sure an iOS Simulator is installed and available:

```bash
npx expo start --ios
```

### Android

With an Android emulator/device configured:

```bash
npx expo start --android
```

---

# Testing

Run all tests:

```bash
npm test
```

Run tests once:

```bash
npm test -- --runInBand
```

Run a specific test:

```bash
npx jest tests/CreateTask.test.ts --runInBand
```

Run component tests:

```bash
npx jest tests/TaskItem.test.tsx --runInBand
```


