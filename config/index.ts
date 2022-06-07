const dev = process.env.NEXT_PUBLIC_ENV === 'dev'

export const server = dev
  ? 'http://localhost:8080/api'
  : 'https://your_deployment.server.com/api'
