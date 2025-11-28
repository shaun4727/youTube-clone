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
