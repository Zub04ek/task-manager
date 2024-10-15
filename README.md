# Task Manager App

Task Manager is a full-featured task management application built with modern web technologies to help users manage their tasks efficiently. This app allows users to create, update, delete, and organize tasks, providing a smooth and interactive user experience.

## Features

- **Task Management**: Add, edit, delete, and organize tasks with a clean and intuitive UI.
- **User Authentication**: Secure login and registration.
- **Responsive Design**: Optimized for mobile and desktop views using Tailwind CSS and Shadcn UI components.
- **Data Persistence**: Tasks are saved in a MongoDB database via Prisma ORM.
- **State Management**: Powered by Zustand for efficient and scalable state handling.
- **API Handling**: Axios is used with TanStack Query for efficient API requests and caching.
- **Type Safety**: Typescript and Zod for type validation and schema management.
- **Testing**: Jest is used for unit and integration tests to ensure reliability.

## Tech Stack

- **Frontend**:
    - **[Next.js](https://nextjs.org/)** for server-side rendering and static site generation.
    - **[TanStack Query](https://tanstack.com/query/latest)** for efficient data fetching, caching, and state synchronization.
    - **[Shadcn/UI](https://shadcn.dev)** and **[TailwindCSS](https://tailwindcss.com/)** for building a modern and responsive user interface.
    - **[Zustand](https://zustand-demo.pmnd.rs/)** for lightweight and scalable state management.
- **Backend**:
    - **[Prisma](https://www.prisma.io/)** as the ORM for database management and schema definition.
    - **[MongoDB](https://www.mongodb.com/)** for database storage.
- **Utilities**:
    - **[Axios](https://axios-http.com/)** for HTTP requests.
    - **[Zod](https://zod.dev/)** for schema validation and type inference.
    - **[TypeScript](https://www.typescriptlang.org/)** for type safety and improved developer experience.
    - **[Jest](https://jestjs.io/)** for testing.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/task-manager-app.git
```
2. Navigate to the project directory:
```bash
cd task-manager-app
```
3. Install dependencies:
```bash
npm install
```
4. Set up your environment variables:
- Create a `.env` file in the root of the project to configure environment variables.
- Add your MongoDB connection string and other necessary configuration details.
5. Run the development server:
```bash
npm run dev
```
6. Open http://localhost:3000 in your browser to see the application in action.

## Usage

- Register or log in to access your task manager dashboard.
- Create, edit, delete, and organize tasks.
- Monitor your tasks' status and keep track of deadlines.

## Testing

To run tests:

```bash
npm run test
```