# cunor-arc

## Installation

To install all project dependencies, run the following command:

\`\`\`bash
npm install
\`\`\`

## Working on the Project

We recommend working on the `developer` branch.

## Database Configuration

Modify the database connection in the Prisma file as follows:

\`\`\`prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
\`\`\`

You can add the database manager of your choice.

## Environment Variables

Modify your environment variables by replacing each part with your own credentials:

\`\`\`env
# Databases
# Local
# DATABASE_URL=""
# DATABASE_URL=""
# POSTGRES_PRISMA_URL=""
# Prod
POSTGRES_PRISMA_URL=""

POSTGRES_URL_NON_POOLING=""

# Local
# NEXTAUTH_URL= ""
# NEXTAUTH_SECRET=""
# API_BASE_URL= ""

# Docker
# NEXTAUTH_URL= ""
# NEXTAUTH_SECRET=""
# API_BASE_URL= ""

# Deploy
NEXTAUTH_URL= ""
NEXTAUTH_SECRET=
API_BASE_URL= ""
\`\`\`

## Firebase Configuration

Include in the `src/app/` directory the `firebase` folder and the `firebase-config.js` file. The final address would be `src/app/firebase/firebase-config.js`. Inside the `firebase-config.js` file, include your own credentials generated in a Firebase Cloud Storage project.

## Running the Program

To run the program, you can use one of the following commands:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

## Deployment

When you have some changes ready, you can deploy the changes to Vercel (recommended) or another cloud platform if you require it.
\`\`\`

