# Twitter Clone Frontend

A fully responsive Twitter clone built from the ground up using React and SCSS, with support for desktop and mobile browsing.
- **Live demo:** https://social.gabe.nz
- **Backend:** https://github.com/gabeburnett/twitter-backend

## UI Design
A minimalist approach with the aim of serving the most common screen sizes.

### Mobile

![Image of Mobile UI](https://i.imgur.com/AR1m15h.png)

### Desktop

![Image of Desktop UI](https://i.imgur.com/mxIJA9J.png)

## Setup

Once you have cloned the repo, create a `.env` file in the twitter-frontend directory and configure the line written below.

Don't forget to change this to your local backend server when doing development.
```
REACT_APP_API_HOST=http://social.gabe.nz
```

<br/>

Useful commands
- `npm start` starts local development server, viewable at http://localhost:3000.
- `npm run build` creates a optimized production build.