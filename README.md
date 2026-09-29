# Task Manager App

Task Manager is a full-featured task management application built with modern web technologies to help users manage their tasks efficiently. Create, organize, update, and reorder tasks seamlessly through a responsive interface featuring smooth drag-and-drop interactions.

> ### 🚧 Development Status
>
> This project is **still under active development**. Some features, UI elements, and application flows may change as the project evolves. The current implementation represents an ongoing development version rather than a final production release.

## Features

- **User Authentication**: Secure login and registration.
- **Task Management**: Add, edit, delete, and organize tasks with a clean and intuitive UI.
- **Drag-and-Drop**: Intuitive task reordering powered by dnd-kit.
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
    - **[dnd-kit](https://dndkit.com/)** for drag-and-drop functionality.
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
git clone https://github.com/Zub04ek/task-manager.git
```
2. Navigate to the project directory:
```bash
cd task-manager
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

## Demo Account

A test account is available for exploring the application:

Email:    testuser@mail.com \
Password: testuser1234

> The account is intended for demonstration and development purposes only.

## Usage

- Register or log in to access your task manager dashboard.
- Create, edit, delete, and organize tasks.
- Monitor your tasks' status and keep track of deadlines.

## Testing

To run tests:

```bash
npm run test
```
