# Update 2024
This is a full-stack web application built for a CSC 307 project at Cal Poly. It's meant to showcase study spots on campus, and lets users register, review, bookmark, add, report and check-in to a study spot. Users can see the capacity level of the study room and locate it using Google Maps API. Managed development through weekly Agile/Kanban tasks.

Demo:
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/hphR-picF58/0.jpg)](https://www.youtube.com/watch?v=hphR-picF58)

Developed by:
- Rajvir Vyas (Team Lead)
- Alex Warda
- Sreshta Talluri
- Soma Tummala
- Karen Huang


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, get a database running. You will need Docker installed on your machine. 

```bash
docker-compose up
```

Then, make sure all your node modules are installs

```bash
npm install
```

Next, make sure you modify the .env file to have the correct information for database connection. 

Make sure the database is migrated and the seed is ran.

```bash
npx prisma migrate dev
```

If the seed is not run properly (doesn't say 'The seed command has been executed'), then run the following line:

```bash
npx prisma db seed
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

- [Prisma Documentation](https://www.prisma.io/docs/getting-started) - the docs for the ORM we are using. 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Look at your database

```bash
npx prisma studio
```


