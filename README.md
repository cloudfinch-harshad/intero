# Intero - Next.js & FastAPI Monorepo

A modern full-stack application with Next.js frontend and FastAPI backend.

## Tech Stack

### Frontend
- Next.js 15
- React 19
- shadcn/ui components
- Tailwind CSS

### Backend
- FastAPI
- Python 3.12
- uvicorn server

## Development Setup

### Prerequisites
- Node.js 20+
- Python 3.12
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd intero
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Run the development server**
   ```bash
   # Start both frontend and backend with a single command
   npm run dev
   ```

This will start:
- Frontend at [http://localhost:3000](http://localhost:3000)
- Backend at [http://localhost:8000](http://localhost:8000)

## Project Structure

```
intero/
├── frontend/          # Next.js application
│   ├── app/           # Next.js App Router
│   ├── components/    # React components including shadcn/ui
│   └── ...
├── backend/           # FastAPI application
│   ├── .venv/         # Python virtual environment
│   ├── main.py        # FastAPI entry point
│   └── ...
├── scripts/           # Utility scripts
│   └── dev.sh         # Development startup script
└── ...
```

## API Endpoints

- `GET /` - Root endpoint returning welcome message
- `GET /api/hello` - Sample endpoint returning a hello message
- `POST /api/items` - Create a new item

## Deployment

### Frontend Deployment (AWS Amplify)

1. Create a new Amplify app in the AWS console
2. Connect it to your GitHub repository
3. Set the following build settings in AWS Amplify:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `.next`

### Backend Deployment (AWS Elastic Beanstalk)

The application is configured to be deployed to Elastic Beanstalk using GitHub Actions.

You need to set up the following secrets in your GitHub repository:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `ECR_REPOSITORY`
- `EB_APPLICATION_NAME`
- `EB_ENVIRONMENT_NAME`
- `AMPLIFY_APP_ID`

## GitHub Actions

The repository is configured with GitHub Actions workflows for CI/CD:

1. Frontend workflow: `.github/workflows/frontend-deploy.yml`
   - Triggered on pushes to `main` branch (only affects files in the `frontend` directory)
   - Builds the Next.js application and deploys it to AWS Amplify

2. Backend workflow: `.github/workflows/backend-deploy.yml`
   - Triggered on pushes to `main` branch (only affects files in the `backend` directory)
   - Builds a Docker image, pushes it to AWS ECR, and deploys to Elastic Beanstalk
