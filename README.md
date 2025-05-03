# Swimmate App

MVP created for coach to train multiple swimmers. And planned to be a Chilean Swimming Platform.
Created with React + TypeScript + Vite

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:3000
```

A `.env.example` file is provided as a template. Copy it to `.env` and adjust the values as needed:

```bash
cp .env.example .env
```

### Available Environment Variables

| Variable     | Description            | Default               |
| ------------ | ---------------------- | --------------------- |
| VITE_API_URL | URL of the backend API | http://localhost:3000 |
