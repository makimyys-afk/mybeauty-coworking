# Beauty Coworking - Booking Management System

This is a professional platform designed for managing bookings of workspaces within a beauty coworking environment. It provides a comprehensive solution for both users and administrators, ensuring efficient operation and a seamless user experience.

## Features

*   **Workspace Management:** Users can view available workspaces, filtered by categories, and search by name or description.
*   **Flexible Booking:** Workspaces can be booked on an hourly or daily basis, catering to various needs.
*   **Financial Overview:** Users have access to their financial history and transaction records.
*   **User Profiles:** Personalized user profiles with customizable settings.
*   **Reviews and Ratings:** Users can leave reviews and ratings for workspaces, aiding in community feedback.
*   **Mobile-Friendly Interface:** A responsive design with a dedicated mobile menu ensures accessibility across all devices.
*   **Robust Data Storage:** Utilizes PostgreSQL for reliable and scalable data management.
*   **Type-Safe API:** Implemented with tRPC for a type-safe and efficient API layer.

## Tech Stack

The project leverages a modern and robust technology stack to deliver a high-performance and scalable application.

| Category   | Technologies                                                              |
| :--------- | :------------------------------------------------------------------------ |
| **Frontend** | React 19, TypeScript, Vite 7, TailwindCSS 4, Radix UI, Wouter             |
| **Backend**  | Node.js 22, Express, tRPC, Drizzle ORM                                    |
| **Database** | PostgreSQL 14                                                             |

## Installation & Setup

To get the Beauty Coworking application up and running on your local machine, follow these steps:

### Requirements

Ensure you have the following installed:

*   Node.js (version 22 or higher)
*   PostgreSQL (version 14 or higher)
*   pnpm (version 10 or higher)

### Steps

1.  **Clone the repository:**
    ```bash
    gh repo clone makimyys-afk/mybeauty-coworking
    ```

2.  **Install dependencies:**
    Navigate to the project directory and install the required packages:
    ```bash
    pnpm install
    ```

3.  **Configure PostgreSQL:**
    Create a PostgreSQL user and database, and grant necessary privileges. Replace `beauty_user` and `beauty_pass_2024` with your desired credentials.
    ```bash
    sudo -u postgres psql -c "CREATE USER beauty_user WITH PASSWORD 'beauty_pass_2024';"
    sudo -u postgres psql -c "CREATE DATABASE beauty_coworking OWNER beauty_user;"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE beauty_coworking TO beauty_user;"
    ```

4.  **Set environment variable:**
    Export the `DATABASE_URL` environment variable. Ensure the credentials match those used in the previous step.
    ```bash
    export DATABASE_URL="postgresql://beauty_user:beauty_pass_2024@localhost:5432/beauty_coworking"
    ```

5.  **Apply database migrations:**
    Run the Drizzle ORM migrations to set up the database schema:
    ```bash
    pnpm db:push
    ```

6.  **Seed the database (optional):**
    Populate the database with initial data:
    ```bash
    node seed-complete.mjs
    ```

7.  **Run the application:**
    Start the development server:
    ```bash
    pnpm dev
    ```

## Usage

Once the application is running, you can access it in your web browser at `http://localhost:3000`.

### Available Scripts

*   `pnpm dev`: Starts the development server.
*   `pnpm build`: Builds the application for production.
*   `pnpm start`: Starts the production server.
*   `pnpm db:push`: Applies database migrations.
*   `pnpm check`: Performs TypeScript type checking.
*   `pnpm format`: Formats the code using Prettier.

## License

This project is licensed under the MIT License.