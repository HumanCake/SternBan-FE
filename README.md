# Stern-FE
This project is a front-end hobby project created to pair with the [Sternban backend](https://github.com/HumanCake/SternBan).
It's built with Angular and Docker, and serves as a learning tool for front-end architecture, containerization, and deployment.
The goal is to gain hands-on experience with frontend/backend integration, Docker, and CI/CD workflows.

## Installation & Deployment (Docker)

This project uses Docker and Docker Compose to serve the Angular frontend and integrate with the rest of the stack.

### Dockerfile

The Dockerfile builds the Angular application using a multi-stage setup and serves it with NGINX on port:  
`4200`

### Docker Compose

`docker-compose.yml` defines three services that this project integrates with (defined in the backend repo):

- **frontend**: Serves the Angular frontend on port `4200`
- **server**: (from backend project) Backend API, runs on port `8085`
- **mongo**: MongoDB instance with a persistent volume

> Note: You can run the frontend standalone by only building the frontend container if you don’t need the backend.

## Start the project
To start the full stack including this frontend, navigate to the root folder of the main project and run:

```bash
docker-compose up --build
```

Now you can reach the application via:
- The backend [api definitions](http://localhost:8085/scalar/v1)
- The frontend [frontpage](http://localhost:4200/)
