# taxGPT-website

The taxGPT-website is part of the taxGPT project that was designed to provide information related to the Slovenian tax law to users (e.g. accountants, tax advisors) in real-time. This repository handles the application's frontend.

**Features**:

- TypeScript
- Next.js
- Tailwind CSS
- Vercel
- Firebase authentication

## Deployment

Follow these steps to set up the taxGPT-website project on your local machine.

### Creating a KV Database Instance

Follow the steps outlined in the [quick start guide](https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database) provided by Vercel. This guide will assist you in creating and configuring your KV database instance on Vercel, enabling your application to interact with it.

Remember to update your environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) in the `.env` file with the appropriate credentials provided during the KV database setup.

### Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run:

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

### Deploying to production

To deploy your project to production using pnpm and Vercel, follow these steps:

1. Ensure you have the Vercel CLI installed globally:

   ```
   pnpm add -g vercel
   ```

2. If you haven't already, link your project to Vercel:

   ```
   vercel link
   ```

3. Deploy to production:
   ```
   vercel --prod
   ```

This command will build your project and deploy it to the Vercel platform. Vercel will automatically detect that you're using Next.js and apply the appropriate build settings.

Note: Ensure you have the correct environment variables set in your `.env` file before deploying to production.
