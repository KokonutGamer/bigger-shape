# SHAPE Fullstack Project

Welcome to the Seattle Homeless Aid & Prevention Effort! We've built a web application that assists users in risk of homelessness. To determine a user’s risk, the web application will prompt the user to answer a questionnaire about their current situation, such as financial status, location, and other critical indicators. After completing the questionnaire, the user’s homelessness score will be calculated and displayed, as well as a list of resources for the user to seek assistance.

## Frontend

### Prerequisites

*   **Node.js:** Version 18.x or higher is recommended. This includes npm (Node Package Manager).

### Build

1.  Clone the repository (if you haven't already).
2.  Navigate to the frontend project directory:
    ```sh
    cd bigger-shape-web
    ```
3.  Install the necessary Node.js dependencies:
    ```sh
    npm install
    ```
### Run

1.  Ensure you are in the `bigger-shape-web` directory.
2.  Start the Vite development server:
    ```sh
    npm run dev
    ```
3.  The application will typically open automatically in your browser or be available at `http://localhost:5173`.

## Backend

### Prerequisites

*   **JDK 21:** Make sure you have Java Development Kit version 21 installed.
*   **Supabase Project:** This backend is designed to integrate with Supabase for authentication and user management. You will need an active Supabase project.
    *   **Database Connection:** The application connects to the PostgreSQL database provided by your Supabase project. 
    Schema used: ![Picture of database schema for Postgres](https://ik.imagekit.io/zgp9ctpzpe/image.png?updatedAt=1749600835383)
    *   **JWT Secret:** The application uses a JWT secret from your Supabase project to verify authentication tokens.
*   **OpenAI API Key:** The application uses the OpenAI API for some features. You will need an OpenAI API key.
*   **`env.properties` File:** Create an `env.properties` file in the `bigger-shape-api/src/main/resources/` directory. Populate it with the following details:

    ```properties
    # Supabase PostgreSQL Database Connection Details
    # Found in your Supabase Dashboard: click 'Connect' in the top bar (use the URI components)
    spring.datasource.url=jdbc:postgresql://[YOUR_SUPABASE_HOST]:[YOUR_SUPABASE_PORT]/postgres
    spring.datasource.username=postgres
    spring.datasource.password=[YOUR_SUPABASE_DATABASE_PASSWORD]

    # Supabase JWT Secret
    # Found in your Supabase Dashboard: Project Settings -> Data API -> JWT Settings -> JWT Secret
    supabase.jwt.secret=[YOUR_SUPABASE_JWT_SECRET]

    # OpenAI API Key
    # Obtain this from your OpenAI account dashboard.
    spring.ai.openai.api-key=[YOUR_OPENAI_API_KEY]
    ```

*   **Maven (Optional):** The project uses Maven. You can use the provided Maven Wrapper (`mvnw` or `mvnw.cmd`) which will download Maven if you don't have it installed.

### Build

1.  Clone the repository (if you haven't already).
2.  Navigate to the project directory `bigger-shape-api`.
3.  Build the project using Maven Wrapper:
    *   Windows: `.\mvnw.cmd clean install`
    *   macOS/Linux: `./mvnw clean install`

### Run

1.  After a successful build, run the application:
    *   Windows: `.\mvnw.cmd spring-boot:run`
    *   macOS/Linux: `./mvnw spring-boot:run`
2.  The application will start on `http://localhost:8080` by default (unless overridden in `env.properties` or as a command-line argument). The API endpoint is configured under `/api/v1`.