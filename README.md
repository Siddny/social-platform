# Social Platform

A web-based client application for a social platform, utilizing data from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API.

## Getting Started

1. Clone the repository: `git clone https://github.com/Siddny/social-platform/`
2. Install dependencies: `npm install`
3. Run the development server: `ng serve`
4. Open the app in your browser: `http://localhost:4200`


## Features

1. **Feed:**
   - Anonymous or free users can view up to 20 posts per day.
   - A paywall appears if the free limit is exceeded.

2. **Authentication:**
   - Users can log in using their username or email with the zip code as the password.
   - Example: User with id=1 can log in with username "Bret" and password "92988-3874".

3. **Profile and Posts:**
   - Authenticated users can view their profile, log out, and see their posts in a dedicated "My Posts" section.

4. **Premium Membership:**
   - Authenticated users can pay for premium membership (mock payment) to view all 100 posts.

5. **Following:**
   - Authenticated users can follow other users from a list of all users (10).
   - They can view all friends' posts in a "Following" section.

6. **Post Blocking:**
   - Premium users can block a single post or all posts from a particular user.

7. **Ad Space:**
   - Ad space is displayed after every 5 posts.

## Live Preview

Check out the live preview of the application: [Social Platform Live Preview](https://socialplatform-bf580.web.app/)

## Deployment

The app is configured to automatically deploy to Google Firebase when commits are pushed to the main branch.

## GitHub Repository

Explore the source code and contribute on GitHub: [Social Platform GitHub Repository](https://github.com/Siddny/social-platform/)
