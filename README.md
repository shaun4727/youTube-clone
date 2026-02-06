# How to setup the project locally

- clone the project from github
- move to the project directory
- install dependencies with `pnpm install`
- make `.env.example` to `.env`
- `pnpm run dev:webhook` to start the project
- setup prisma for postgresql
- pnpm install @prisma/client
- DATABASE_URL="postgresql://DB_USER:DB_PASS@localhost:5432/DB_NAME?schema=public"

# Technologies

- TypeScript
- NextJS
- Postgresql
- Prisma
- Shadcn

# create postgresql database locally

```bash
# switch to postgres user
sudo -i -u postgres
# open postgresql shell
psql

# create database
CREATE DATABASE mydatabase;

# create a new user (optional)
CREATE USER myuser WITH PASSWORD 'mypassword';

# grant privileges (optional)
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;


# list all database
\t

# exit the shell
\q #or
exit
```
