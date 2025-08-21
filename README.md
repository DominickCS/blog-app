This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

TABLE CREATE -> 
REATE EXTENSION IF NOT EXISTS "uuid-ossp";

## USER TABLE SCHEMA
username   varchar(20),
password   varchar(64),
email      varchar(120),
first_name  varchar(32),
last_name   varchar(32), user_id uuid DEFAULT uuid_generate_v4 (), permission_level varchar(64) DEFAULT 'member', PRIMARY KEY (user_id));

## ARTICLES TABLE SCHEMA
CREATE TABLE articles (article_id SERIAL, article_title varchar(120), article_body varchar(4096), article_tags text[] DEFAULT null, like_count int DEFAULT 0, article_illustrations text[][] DEFAULT null, article_comments text[][] DEFAULT null, publish_date date DEFAULT CURRENT_DATE, user_id uuid, PRIMARY KEY (article_id));


## CONSIDERATIONS
Main Components of an Article
Component	Recommended Data Type	Description
Title	VARCHAR(n)	A variable-length string for the article title, where n is the max length.
Content	TEXT	Ideal for storing large amounts of text, as it can handle variable-length content without a predefined limit.
Author	VARCHAR(n)	A variable-length string for the author's name, with a specified maximum length.
Published Date	TIMESTAMP	Stores the date and time when the article was published, allowing for precise time tracking.
Tags	ARRAY(VARCHAR(n))	An array of strings to store multiple tags associated with the article.
Status	ENUM	A user-defined type to represent the status of the article (e.g., 'draft', 'published', 'archived').
Additional Considerations

    UUID: For unique identification of articles, consider using a UUID type for the article ID.
    Full-Text Search: If you plan to implement search functionality, consider using the tsvector type for indexing the content.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
