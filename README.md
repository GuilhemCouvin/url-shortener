# URL Shortener

URL Shortener is a project aimed at shortening long URLs into shorter, more manageable links.

## How to Run Locally in Dev Mode

To run this project locally in development mode, follow these steps:

### Prerequisites

-   Node.js installed on your machine. You can download it from the [official Node.js website](https://nodejs.org/).
-   Docker installed on your machine.

### Installation

-   Clone the repository to your local machine:

    ```bash
     git clone https://github.com/GuilhemCouvin/url-shortener.git
    ```

### If you want to run each service separately

1. Navigate to the project directory:

    ```bash
    cd url-shortener
    ```

2. Navigate to the `api` directory:

    ```bash
    cd api
    ```

3. Install dependencies for the backend API using npm:

    ```bash
    npm install
    ```

4. Run the backend API using npm:

    ```bash
    npm start
    ```

5. Navigate back to the root directory:

    ```bash
    cd ..
    ```

6. Navigate to the `app` directory:

    ```bash
    cd app
    ```

7. Install dependencies for the APP using npm:

    ```bash
    npm install
    ```

8. Run the APP using npm:

    ```bash
    npm start
    ```

### Running the full Application with docker-compose

You can run the application using Docker Compose:

1. Navigate back to the root directory if you're not already there:

    ```bash
    cd ..
    ```

2. Start the Docker containers using Docker Compose:

    ```bash
    docker-compose up
    ```

This command will start both the APP (React TypeScript) and API (NestJS) applications in development mode.

### Accessing the Applications

-   **APP (React TypeScript)**: After the Docker containers are running, you can access the frontend app in your web browser by navigating to:

    ```
    http://localhost:3000
    ```

-   **API (NestJS)**: The backend API will be accessible at:

    ```
    http://localhost:4000
    ```

-   **Database (MongoDB)**: The database will be accessible at:

    ```
    mongodb://database:27017/url-shortener
    ```

Replace `3000` with the appropriate port number if you have configured a different port for the frontend application.

Replace `4000` with the appropriate port number if you have configured a different port for the backend API.

Replace `mongodb://database:27017/url-shortener` inside the `docker-compose.yml` and `api/.env` files if you have configured a different URI for the database.
