-   [youtube clone](https://www.youtube.com/watch?v=ArmPzvHTcfQ&t=26542s)

-   start from ----- 1:53:00

# Steps

-   **Installed Next JS, shadcn (no extra tailwind configuration needed)**

---------- login functionality

-   added google
-   skip static files and internals unless found in search params --- copy it from clearMiddleware
-   used catch all route for redirection. Why catch all route is needed?
-   1:40:00 clerk sign in form appears
-   /protected(.\*) ---- protects all the route under protected route
-   login functionality is till 1:50:00
-   login in routes were grouped using (auth) name.
    -   (auth)/sign-in/[[...sign-in]]/page.tsx
    -   (auth)/sign-up/[[...sign-up]]/page.tsx
    -   (auth)/layout.tsx
    -   so far sign in functionality was added using google provider
    -   after sign in/logout user will be redirected to home page
    -   subscription and other pages should be allowed for registered user only ----
    -   on sign out redirect back to home page

**Login Screen**

<img src="./public/login-page-design.png" />

## Webhook sync

### ngrok setup -- what is ngrok? what purpose does it serve?

ngrok is a **cross-platform application** that creates **secure, stable tunnels** from the public internet to a local machine or a server behind a NAT or firewall.

---

#### 🛠️ Purpose and Function

The primary purpose of ngrok is to **expose a local development server** to the internet. It serves several crucial functions for developers and testing:

-   **Sharing Local Projects:** It allows you to share a website or API running on your local machine with clients, colleagues, or external services **without having to deploy it** to a staging or production server.
-   **Receiving Webhooks:** ngrok is commonly used to test and debug services that rely on **webhooks** (e.g., from platforms like Stripe, Twilio, or GitHub). Since these external services need a public URL to send their HTTP requests, ngrok provides one that forwards the traffic directly to your local application.
-   **Mobile App Development:** It enables mobile applications running on a physical device or emulator to connect to an **API running locally** on your computer.
-   **API and Authentication Testing:** It's essential for testing services that require a publicly accessible callback URL, such as **OAuth 2.0** flows.

##### How it Works

1.  You run the ngrok application on your local machine, specifying the port your local server is running on (e.g., `ngrok http 8080`).
2.  ngrok connects to the ngrok cloud service and reserves a **unique, random public URL** (e.g., `https://abcdef12345.ngrok.io`).
3.  The ngrok cloud service then creates a **secure tunnel** (usually an encrypted TLS/SSL connection) between the public URL and your local ngrok client.
4.  Any request made to the public URL is securely forwarded through the tunnel to your local server, and the response is sent back the same way.

Would you like a step-by-step guide on how to get started using ngrok?

### my web project is running locally. by using ngrok, can I access my project using ngrok? Suppose I run my web project using command -- pnpm dev. then our project runs on a local address. can I run my project anywhere using public url that is provided by ngrok?

Yes, absolutely\! That is the **primary purpose** of ngrok.

Here is a breakdown of how you would use ngrok to access your locally running web project via a public URL:

#### 🔗 Accessing Your Local Project via ngrok

The process you described is exactly what ngrok is designed for.

##### 1\. Find Your Local Port

When you run your project using `pnpm dev`, the output usually tells you the local address and **port** it's running on.

> -   **Example:** If the output says your project is running at `http://localhost:3000` or `http://127.0.0.1:3000`, the port is **3000**.

##### 2\. Start the ngrok Tunnel

Once you know the port (let's assume it's **3000** for this example), you open your terminal and run the ngrok command, telling it to create a tunnel to that port:

```bash
ngrok http 3000
```

##### 3\. Use the Public URL

After a moment, ngrok will display information in your terminal, including the public URLs it has created.

-   **Public URL Example:** `https://abcdef12345.ngrok.io`

Anyone, **anywhere in the world** with an internet connection, can now type that public URL into their browser, and the request will be securely tunneled back to your local machine, where your web project is running on port 3000.

##### Key Points

-   **Live Connection:** Your local project (running with `pnpm dev`) **must remain running** for the ngrok public URL to work.
-   **Security:** ngrok automatically provides an **HTTPS** URL (encrypted connection), which is great for testing and required by most external services.
-   **Sharing:** You can share that `https://...ngrok.io` URL with clients, colleagues, or use it yourself from another device (like your phone or a different computer) to access your project without being on the same Wi-Fi network.

Would you like to know more about how to set up ngrok for a specific kind of web project (like a React app or a Node.js API)?

### Use of a npm package --- concurrently

#### what is the use of npm package concurrently?

The npm package **`concurrently`** is a command-line utility used to **run multiple shell commands or npm scripts simultaneously** (in parallel).

Its main purpose is to simplify the local development workflow by allowing a developer to start all necessary processes with a **single command** from one terminal window, instead of opening multiple tabs.

---

##### 💻 Primary Use Case: Frontend and Backend Development

The most common use case for `concurrently` is in full-stack JavaScript projects (like MERN stack) where you need to run the client (frontend) and the server (backend) at the same time:

1.  **Frontend Watcher/Dev Server:** A command like `npm run client` or `npm run dev` that starts a local development server (e.g., for React, Vue, or Angular) and watches for file changes.
2.  **Backend API Server:** A command like `npm run server` or `nodemon server.js` that starts your API server and potentially restarts it on file changes.

Instead of running these two commands in separate terminal windows, you can combine them into a single script using `concurrently` in your `package.json` file:

```json
{
	"scripts": {
		"client": "npm start --prefix client",
		"server": "nodemon server.js",
		"dev": "concurrently \"npm run client\" \"npm run server\""
	}
}
```

Now, running `npm run dev` executes both the client and server processes concurrently.

---

##### ✨ Key Features and Benefits

-   **Single Terminal Control:** You can start and stop your entire development environment by running a single command (`npm run dev`) and pressing $\text{Ctrl}+\text{C}$ to kill all running processes at once.
-   **Clear Output:** It provides features to color-code the output from different commands and allows you to add custom **prefixes** (e.g., `--names "CLIENT,SERVER"`) to the logs, making it easy to distinguish which process is logging what.
-   **Cross-Platform:** Unlike using shell operators like `&` (which often don't work reliably on Windows), `concurrently` is a cross-platform solution.
-   **Controlling Exit Behavior:** You can use flags like `--kill-others` to automatically terminate all other running processes if one of the monitored commands exits or crashes.

You can learn more about how to set up and run multiple NPM scripts in parallel by watching [Simplify Your Workflow: Running Multiple Scripts using Concurrently](https://www.youtube.com/watch?v=taeqOxI6HQE).

http://googleusercontent.com/youtube_content/0

### use of a npm package --- svix

The npm package for **Svix** is a client library that allows you to easily **send and verify webhooks** within your Node.js application.

The core use of Svix is to provide a **reliable, secure, and scalable Webhook Service** that you can integrate into your own product, saving you from building and maintaining a complex webhook infrastructure yourself.

---

#### 🚀 Key Use Cases for Svix

The Svix service and its corresponding npm package are used for two main roles:

##### 1\. Sending Webhooks (Your Application to Your Users)

If you are building a service that needs to notify your customers (e.g., about a payment event, a database update, or a new shipment), Svix handles the entire outgoing webhook workflow:

-   **Webhook Generation:** You use the Svix npm package to trigger a webhook send from your application's code.
    -   **Example Code Snippet:**
        ```javascript
        await svix.message.create('app-id', {
        	eventType: 'user.created',
        	payload: { user_id: 123, email: 'test@example.com' },
        });
        ```
-   **Reliable Delivery:** Svix takes responsibility for queueing, retrying failed deliveries, and implementing exponential backoff to ensure the webhook eventually reaches your customer's endpoint.
-   **Security (Signing):** It automatically signs the outgoing webhooks using a secret key, ensuring that your customers can verify the payload truly originated from your service.
-   **Monitoring & Dashboards:** It provides a management interface for you and your customers to view the delivery logs, see which webhooks succeeded or failed, and troubleshoot issues.

##### 2\. Receiving and Verifying Webhooks (From External Services)

If your application needs to receive webhooks from a third-party service (like Stripe, GitHub, or Twilio) that uses Svix, you use the package to securely verify the incoming data:

-   **Signature Verification:** The most critical function is the `webhook.verify` utility. It checks the signature attached to the incoming webhook against the known secret key. This step **prevents spoofing attacks** by confirming the webhook was sent by the legitimate third-party service and that the payload hasn't been tampered with.
-   **Payload Parsing:** It helps you safely parse and access the verified JSON payload.

In essence, Svix takes the complexity out of webhook delivery, security, and monitoring, allowing developers to focus on their core application logic.

### How do you create Api route in next js?

suppose the api route is `/test`.

#### Steps:

1. create a `test` folder inside `app` folder
2. inside `test` folder create `route.ts`
3. define a method as following

```js
export const GET = () => {
	return new Response('hello');
};
```

## Chapter 6 | tRPC setup

### What is tRPC? what is the use of this?

tRPC (short for **TypeScript Remote Procedure Call**) is an open-source framework that allows you to **build end-to-end type-safe APIs** without the need for traditional code generation, schema definition languages (like GraphQL's SDL), or runtime validation (like REST with Swagger).

It is not a database, nor is it a transfer protocol like HTTP or gRPC; it's a **developer tool** that simplifies and secures the process of calling functions across the network, specifically between a **TypeScript frontend** and a **TypeScript backend**.

---

#### 💡 How tRPC Works and Its Core Use

The primary purpose of tRPC is to give developers a **seamless, single-language development experience** where API endpoints feel like local function calls.

##### 1\. **Zero-Overhead Type Safety**

This is the most significant use of tRPC.

-   You define your API procedures (functions) and their input/output types **once** on the backend using TypeScript.
-   tRPC automatically infers these types and exposes them to your frontend.
-   When you call a backend procedure from your frontend, TypeScript immediately checks the arguments and the expected return data. If there is a mismatch, the **TypeScript compiler throws an error** during development (compile-time), not a runtime error when the code is running in production.

This eliminates an entire class of bugs and reduces the need for constant context-switching between frontend and backend contracts.

##### 2\. **Defining Procedures (The Backend)**

On the backend (usually Node.js, Express, or Next.js), you define your API endpoints as plain TypeScript functions, using tRPC helpers to enforce input validation (often using Zod).

-   **Example Backend Definition:**
    ```typescript
    // server.ts
    const router = trpc.router().query('getUser', {
    	input: z.object({ id: z.string() }), // Input validation
    	resolve({ input }) {
    		return db.users.findUnique({ where: { id: input.id } });
    	},
    });
    ```

##### 3\. **Consuming Procedures (The Frontend)**

On the frontend (often a React application using the tRPC-React adapter), you call the procedure using a simple, typed hook.

-   **Example Frontend Consumption:**
    ```typescript
    // client.tsx
    // The type of 'data' is automatically inferred as the return type of 'getUser'
    const { data } = trpc.getUser.useQuery({ id: '123' });
    ```

If you tried to call `trpc.getUser.useQuery({ user_id: 123 })` (using `user_id` instead of `id`, and a number instead of a string), **TypeScript would immediately alert you to the error**.

#### 🎯 Benefits of Using tRPC

| Feature                        | Benefit                                                                                                                                                |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Developer Experience**       | Writing an API feels like writing local functions, which speeds up development.                                                                        |
| **No Build Step/CodeGen**      | Unlike GraphQL, tRPC doesn't require a separate code generation step to synchronize types. It uses TypeScript's native inference.                      |
| **Automatic Input Validation** | Built-in support for Zod (or similar libraries) ensures input is validated _before_ the function logic runs.                                           |
| **Smaller Bundle Size**        | Since you only fetch the procedures you use, client-side bundle size can be smaller compared to using an entire client library for a schema-first API. |

Would you like to know which modern web frameworks (like Next.js or Nuxt) integrate well with tRPC?

### what if don't use trpc? explain with example that will help me understand the difference in code using tRPC and not using tRPC?

If you don't use tRPC, you would typically build your API using a traditional method like **REST** or **GraphQL**. The main consequence of not using tRPC is the **loss of automatic, end-to-end type safety** between your frontend and backend, which introduces friction and potential bugs.

---

#### 🆚 Code Comparison: REST vs. tRPC

Let's look at a simple example: **fetching a user by ID** from a backend API.

##### Scenario: Fetching a User

| Feature                | REST API (No tRPC)                                     | tRPC API                                      |
| :--------------------- | :----------------------------------------------------- | :-------------------------------------------- |
| **Backend Technology** | Express, Koa, or Next.js API Routes                    | Node.js/Next.js with tRPC                     |
| **Frontend Fetching**  | `fetch` or Axios                                       | tRPC Client/React Query Hook                  |
| **Type Safety**        | **Manual** (Requires repeating types on both sides)    | **Automatic** (Types are inferred end-to-end) |
| **Validation**         | Manual input validation (e.g., Joi, Express Validator) | Built-in using Zod or similar library         |

---

#### 1️⃣ Example without tRPC (Traditional REST)

To maintain type safety, you have to manually define the types for the request body/parameters and the response data in **at least three places**.

##### Backend Code (`server.ts`)

The backend defines the endpoint and its logic. The types for `input` and `output` are often implicit or manually enforced.

```typescript
// Define the user data structure
type User = { id: string; name: string; email: string };

// 1. Backend defines the output type (User)
app.get('/api/user/:id', (req, res) => {
	const id = req.params.id; // Type is always 'string'

	// ⛔️ MANUAL CHECK: What if 'id' isn't a valid format?
	if (!id) return res.status(400).send('ID is required');

	const user: User = db.findUser(id); // Assume this returns a User
	return res.json(user);
});
```

##### Frontend Code (`client.tsx`)

The frontend must know the exact endpoint path and manually define the expected response type.

```typescript
// 2. Frontend must manually define the expected type (User)
type User = { id: string; name: string; email: string };

async function fetchUser(userId: string): Promise<User> {
	// 3. The path '/api/user/' must be exactly correct.
	const response = await fetch(`/api/user/${userId}`);

	if (!response.ok) throw new Error('Failed to fetch user');

	// 4. MANUAL ASSERTION: We assume the response structure matches 'User'
	const data = await response.json();
	return data as User;
}
```

**The Danger:** If the backend changes `name` to `fullName`, the frontend code above will still compile but will **fail at runtime** when it receives a different data structure, leading to broken UI.

---

#### 2️⃣ Example with tRPC

With tRPC, you define the procedure once, and the types are automatically shared across the entire stack.

##### Backend Code (`server.ts`)

The backend defines the procedure, and its input and output are strongly typed.

```typescript
// server.ts (The types are inferred and shared)
import { z } from 'zod'; // Used for input validation

const appRouter = trpc.router().query('getUser', {
	// ✅ AUTOMATIC CHECK: Input is strongly typed and validated
	input: z.object({ id: z.string().uuid() }), // Ensures ID is a valid UUID

	resolve({ input }) {
		// The type of 'input' is guaranteed to be { id: string }
		const user = db.findUser(input.id);
		// The return type (e.g., { id: string, name: string }) is inferred
		return user;
	},
});

export type AppRouter = typeof appRouter; // Exports the type definition
```

##### Frontend Code (`client.tsx`)

The frontend imports the router's type and uses the tRPC client. The compiler ensures correctness at every step.

```typescript
// client.tsx
// Assume 'trpc' is initialized with the AppRouter type

function UserComponent() {
	// 1. AUTOMATIC CHECK: If you pass a number, the TS compiler yells at you.
	// 2. AUTOMATIC CHECK: 'data' is immediately typed as the return type of 'getUser'.
	const { data } = trpc.getUser.useQuery({ id: 'valid-uuid-123' });

	return (
		<div>User: {data?.name}</div>
		// 3. AUTOMATIC CHECK: If the backend changes 'name' to 'fullName',
		//    'data?.name' immediately shows a **compile-time error**.
	);
}
```

##### Key Differences Summarized

| Feature             | Traditional REST                                            | tRPC                                                         |
| :------------------ | :---------------------------------------------------------- | :----------------------------------------------------------- |
| **Type Source**     | Duplicated in `.d.ts` files or manually copied.             | **Single Source of Truth** (The backend router definition).  |
| **Error Timing**    | **Runtime Errors** (The application breaks in the browser). | **Compile-Time Errors** (The code won't even build).         |
| **Endpoint Naming** | Must manually keep track of paths like `/api/user/:id`.     | Uses **IntelliSense/autocompletion** (e.g., `trpc.getU...`). |
| **Validation**      | Requires separate middleware.                               | Integrated into the procedure definition.                    |

# React/Next JS things that has been used

1. use suspense
2. react-error-boundary ( a npm package)
