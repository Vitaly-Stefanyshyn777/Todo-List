# 📝 To-Do App – Task Management Web Application

## 📌 Description

This is a test project — a **To-Do Web Application** that allows users to create and organize task lists, manage tasks, and collaborate with other users by assigning roles. The app provides a user-friendly interface for personal and team productivity.

---

## 🎯 Goal

Develop a fully functional task management application with the ability to:

- Create multiple task lists
- Add, edit, delete tasks
- Track task statuses
- Invite collaborators with specific roles (`Admin`, `Viewer`)

---

## 🚀 Technologies

### 🔧 Frontend:

- **React** + **TypeScript**
- **Tailwind CSS** – for styling and responsive design
- **Firebase** – for authentication and Firestore database

### 🌐 Backend:

- **Express** + **TypeScript**
- **MongoDB** – for storing lists and user data

---

## ⚙️ Features

### 1. 🔐 User Authentication

- Registration form with: `name`, `email`, and `password`
- Login form for user authentication
- Token-based session management to persist login state

### 2. 🗂 Task Lists

- Create new task lists with a custom title
- Edit list names
- Delete task lists

### 3. ✅ Task Management

- Add tasks to a list (title and description)
- Edit existing tasks
- Delete tasks from a list
- Mark tasks as **completed** or **incomplete**

### 4. 👥 User Roles

- Add collaborators by their email to specific task lists
- **Admin**:
  - Full control: can create, edit, delete tasks, and manage completion status
- **Viewer**:
  - Can only view tasks and toggle their completion status

---

## 📦 Installation

<!--toc:start-->

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Usage](#usage)
  - [Install Dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables)
    - [PostgreSQL Database URL](#postgresql-database-url)
    - [Next Auth Secret](#next-auth-secret)
    - [PayPal Client ID and Secret](#paypal-client-id-and-secret)
    - [Stripe Publishable and Secret Key](#stripe-publishable-and-secret-key)
    - [Uploadthing Settings](#uploadthing-settings)
    - [Resend API Key](#resend-api-key)
  - [Run](#run)
- [Prisma Studio](#prisma-studio)
- [Seed Database](#seed-database)
- [Demo](#demo)
- [Bug Fixes And Course FAQ](#bug-fixes-and-course-faq)
  - [Fix: Edge Function Middleware Limitations on Vercel](#fix-edge-function-middleware-limitations-on-vercel)
  - [Bug: A newly logged in user can inherit the previous users cart](#bug-a-newly-logged-in-user-can-inherit-the-previous-users-cart)
  - [Bug: Any user can see another users order](#bug-any-user-can-see-another-users-order)
  - [Bug: Cart add and remove buttons share loading animation](#bug-cart-add-and-remove-buttons-share-loading-animation)
  - [FAQ: Why are we using a JS click event in not-found](#faq-why-are-we-using-a-js-click-event-in-not-found)
- [:warning: TailwindCSS Update – Breaking Changes :warning:](#warning-tailwindcss-update-breaking-changes-warning)
  - [:white_check_mark: Option 1: Stick with Tailwind v3 (Matches the Course)](#whitecheckmark-option-1-stick-with-tailwind-v3-matches-the-course)
  - [:rocket: Option 2: Use Tailwind v4 (Updated Code Available, this seems to be the smoothest option)](#rocket-option-2-use-tailwind-v4-updated-code-available-this-seems-to-be-the-smoothest-option)
  - [Changes Needed for Tailwind v4:](#changes-needed-for-tailwind-v4)
  - [:arrows_counterclockwise: Migrating from Tailwind v3 to v4 Mid-Course?](#arrowscounterclockwise-migrating-from-tailwind-v3-to-v4-mid-course)
  - [:link: Upgrade Guide](#link-upgrade-guide)
- [License](#license)
<!--toc:end-->

## Features

- Next Auth authentication
- Admin area with stats & chart using Recharts
- Order, product and user management
- User area with profile and orders
- Stripe API integration
- PayPal integration
- Cash on delivery option
- Interactive checkout process
- Featured products with banners
- Multiple images using Uploadthing
- Ratings & reviews system
- Search form (customer & admin)
- Sorting, filtering & pagination
- Dark/Light mode
- Much more

## Usage

### Install Dependencies

```bash
npm install
```

Note: Some dependencies may have not yet been upadated to support React 19. If you get any errors about depencency compatability, run the following:

```bash
npm install --legacy-peer-deps
```

### Environment Variables

Rename the `.example-env` file to `.env` and add the following

#### PostgreSQL Database URL

Sign up for a free PostgreSQL database through Vercel. Log into Vercel and click on "Storage" and create a new Postgres database. Then add the URL.

**Example:**

```
DATABASE_URL="postgresql://username:password@host:port/dbname"
```

#### Next Auth Secret

Generate a secret with the following command and add it to your `.env`:

```bash
openssl rand -base64 32
```

**Example:**

```
NEXTAUTH_SECRET="xmVpackzg9sdkEPzJsdGse3dskUY+4ni2quxvoK6Go="
```

#### PayPal Client ID and Secret

Create a PayPal developer account and create a new app to get the client ID and secret.

**Example:**

```
PAYPAL_CLIENT_ID="AeFIdonfA_dW_ncys8G4LiECWBI9442IT_kRV15crlmMApC6zpb5Nsd7zlxj7UWJ5FRZtx"
PAYPAL_APP_SECRET="REdG53DEeX_ShoPawzM4vQHCYy0a554G3xXmzSxFCDcSofBBTq9VRqjs6xsNVBcbjqz--HiiGoiV"
```

#### Stripe Publishable and Secret Key

Create a Stripe account and get the publishable and secret key.

#### Resend API Key

Sign up for an account at https://resend.io/ and get the API key.

### Run

```bash

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm start

# Export static site
npm run export
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma Studio

To open Prisma Studio, run the following command:

```bash
npx prisma studio
```

## Seed Database

To seed the database with sample data, run the following command:

```bash
npx tsx ./db/seed
```

## Bug Fixes And Course FAQ

### Fix: Edge Function Middleware Limitations on Vercel

After deploying your app you may be getting a build error along the lines of:

> The Edge Function "middleware size is 1.03 MB and your plan size limit is 1MB

For the solution to resolve this please see Brads [Gist here](https://gist.github.com/bradtraversy/16e3c89b9b25bc79cf86f5f36e14e83d)

There is also a new lesson added for this fix at the end of the course -
**Vercel Hobby Tier Fix**

### Bug: A newly logged in user can inherit the previous users cart

If a logged in user adds items to their cart and logs out then a different user
logs in on the same machine, they will inherit the first users cart.

To fix this we can delete the current users **Cart** from the database in our **lib/actions/user.actions.ts** `signOutUser` action.

> Changes can be seen in [lib/actions/user.actions.ts](https://github.com/bradtraversy/prostore/blob/a498d4362d1485b2bd3152124cb5c3a75f8fdd70/lib/actions/user.actions.ts#L45)

### Bug: Any user can see another users order

If a user knows the `Order.id` of another users order it is possible for them to
visit **/order/<Order.id>** and see that other users order. This isn't likely to
happen in reality but should be something we protect against by redirecting the
user to our **/unauthorized** page if they are not the owner of the order.

In **app/(root)/order/[id]/page.tsx** we can import the `redirect` function from Next:

```ts
import { notFound, redirect } from "next/navigation";
```

Then check if the user is the owner of the order and redirect them if not:

```ts
// Redirect the user if they don't own the order
if (order.userId !== session?.user.id && session?.user.role !== "admin") {
  return redirect("/unauthorized");
}
```

> Changes can be seen in [app/(root)/order/[id]/page.tsx](<https://github.com/bradtraversy/prostore/blob/main/app/(root)/order/%5Bid%5D/page.tsx>)

### Bug: Cart add and remove buttons share loading animation

On our **/cart** page you may notice that when you increment or decrement the
quantity of an item in the cart, then the loader shows for all buttons after we
click. This is because all the buttons use the same **pending** state from our
use of `useTransition` in our [app/(root)/cart/cart-table.tsx](<https://github.com/bradtraversy/prostore/blob/main/app/(root)/cart/cart-table.tsx>)

We can solve this by breaking out the Buttons into their own `AddButton` and
`RemoveButton` components, each using their own `useTransition` and so having
their own **pending** state.

You can if you wish move these components to their own files/modules but for
ease of following along they can be seen in the same file.

> Changes can be seen in [app/(root)/cart/cart-table.tsx](<https://github.com/bradtraversy/prostore/blob/main/app/(root)/cart/cart-table.tsx>)

### FAQ: Why are we using a JS click event in not-found

In our [app/not-found.tsx](https://github.com/bradtraversy/prostore/blob/main/app/not-found.tsx) we currently have:

```tsx
<Button
  variant="outline"
  className="mt-4 ml-2"
  onClick={() => (window.location.href = "/")}
>
  Back To Home
</Button>
```

So we navigate the user back to the home page with a JavaScript click event,
but this should really be a `<a />` (link) instead.

So we can change the code to:

```tsx
<Button variant="outline" className="mt-4 ml-2" asChild>
  <Link href="/">Back To Home</Link>
</Button>
```

> Changes can be seen in [app/not-found.tsx](https://github.com/bradtraversy/prostore/blob/main/app/not-found.tsx)

## :warning: TailwindCSS Update – Breaking Changes :warning:

Many of you are running into issues following the course because **TailwindCSS recently had a major update**.  
By default, you'll install the latest version (**Tailwind v4**), but the course was recorded with **Tailwind v3**.

### :white_check_mark: Option 1: Stick with Tailwind v3 (Matches the Course)

If you want to follow the course exactly, you should install **Tailwind v3** and refer to the v3 docs:  
:link: **[Tailwind v3 Setup for Next.js](https://v3.tailwindcss.com/docs/guides/nextjs)**  
Make sure your **tailwind.config.ts** matches [this file](https://github.com/bradtraversy/prostore/blob/main/tailwind.config.ts)

### :rocket: Option 2: Use Tailwind v4 (Updated Code Available, this seems to be the smoothest option)

If you'd rather use **Tailwind v4**, there is a **`tailwind4`** branch of this repository where you can grab the updated code:  
:link: **[Updated Repo](https://github.com/bradtraversy/prostore/tree/tailwind4)**

### Changes Needed for Tailwind v4:

- **Delete** `tailwind.config.ts` (if it exists).
- **Update** `globals.css` to match [this file](https://github.com/bradtraversy/prostore/blob/tailwind4/assets/styles/globals.css).
- **Update** `postcss.config.mjs` to match [this file](https://github.com/bradtraversy/prostore/blob/tailwind4/postcss.config.mjs)
- If you're using the latest Next.js, these should be the only changes required.

### :arrows_counterclockwise: Migrating from Tailwind v3 to v4 Mid-Course?

If you've already started the course with **Tailwind v3**, some **Radix UI components may break** due to class name changes.  
The easiest fix is to use Tailwind's migration tool:

```sh
npx @tailwindcss/upgrade
```

### :link: Upgrade Guide

If you use the migration tool, you don't need to manually:

- :white_check_mark: Update globals.css (the tool handles it).
- :white_check_mark: Delete tailwind.config.ts.

If you run into issues, please post over on **Discord** or in the **Udemy Q&A**
for the course.

## License

MIT License

Copyright (c) [2025] [Traversy Media]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall
