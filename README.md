# Diet Soda Atlas

A static, database-free catalog of diet soda reviews.

## Edit the catalog

Update the `sodas` array in `src/data/sodas.ts`, then commit and redeploy. The public API at `/api/sodas` returns the same static catalog.

The `/admin` page explains this workflow; creating, editing, and deleting catalog entries in the browser is intentionally disabled.

## Development

```bash
npm run dev
```

## Deploy

```bash
npm run build
```

No environment variables, database, Prisma client, or migration step are required.
