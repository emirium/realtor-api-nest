Realtor api is written in Nest JS framework and should serve as decent starter boilerplate for your Nest apps. Some of the features that are implemented:

- [x] Database integration with Prisma and Postgres
- [x] Authentication - Login, Register
- [ ] Authorization
- [ ] Testing

### Getting started

In order to run this app you should have Node and Nest JS installed. Once you clone this repo, run:

```bash
  npm install
```

After installing your dependencies create your `.env` file in the root folder

```bash
  touch .env
```

This app uses Prisma as ORM and Postgres. I chose [Neon](https://neon.tech) as cloud db provider, it's pretty simple to set up and get connection uri which you can add to your `.env` file.

```
  DATABASE_URL="your postgres uri goes here"
```

After that, we can use prisma to push data to the db

```bash
  npx prisma db push
```

Use Prisma Studio to interact with our database in browser

```bash
  npx prisma studio
```