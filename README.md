# Lista Obecności - Frontend

This is the frontend for the **Lista Obecności** (Attendance List) web application, built using React. For more info visit [https://github.com/szczepanskiamikolaj/lista-obecnosci-backend](https://github.com/szczepanskiamikolaj/lista-obecnosci-backend).

## Environmental Variables

The frontend can be configured with the following environment variables:

| Variable        | Description                                                     | Default Value                     |
| --------------- | --------------------------------------------------------------- | --------------------------------- |
| `SPRING_SERVER` | The base URL of the backend server that the frontend will call.  | `http://localhost:8080`           |
| `PORT`          | The port on which the frontend will run (when using React's development server). | `8081` |

## Getting Started

To get started with the backend, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/szczepanskiamikolaj/lista-obecnosci-frontend.git
   ```
2. Navigate to the project directory:
    ```bash
    cd lista-obecnosci-frontend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Configure the environment variables:
4. Start the development server:
    ```bash
    npm start
    ```