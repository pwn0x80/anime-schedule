# Anime Schedule

Anime Schedule Link - https://animeschedule.vercel.app/

**Anime Schedule** is a lightweight React application that presents an infinite-scrolling grid of anime thumbnails and titles. It provides a simple, browsable interface for discovering shows and episodes, focusing on **performance**, **modularity**, and **extensibility**.


💾 **Offline-ready & Installable:** The app includes offline support for bookmarking and caching, making it installable as a Progressive Web App (PWA) so users can browse anime even without an active internet connection.  


---

## Features

- 🌟 Infinite scrolling grid of anime tiles
- 🗂 Client-side state management with Redux Toolkit
- 🔗 Lightweight routing with React Router for future pages (Details, Favorites)
- 🎨 Styled-components for flexible theming
- 💾 Offline bookmarking and caching for PWA support
- ✅ Type-safe and test-friendly setup with React Testing Library
- ⚡ Optimized for performance and modular component design

---

## Tech Stack

- **React 18**
- **Redux Toolkit** for state management
- **React Router 6** for routing
- **styled-components** for styling
- **react-icons** for icons
- **react-infinite-scroller** for infinite scrolling
- **lodash**, **Ramda** for utility helpers
- **react-scripts** for build/dev workflow
- **React Testing Library** for unit and integration tests

---

## Install as App / PWA

Anime Schedule is designed to work as a **Progressive Web App (PWA)**, allowing users to install it on their desktop or mobile device for offline access. This enables:

- Browsing anime without an active internet connection
- Offline bookmarking and caching of anime tiles
- Quick access from your home screen or desktop like a native app

### How to Install

**On Desktop (Chrome/Edge/Firefox):**

1. Open the app in your browser (e.g., `http://localhost:3000` during development or your deployed URL).
2. Look for the **“Install”** button in the address bar or the browser menu.
3. Click **Install** and the app will launch in its own window.

**On Mobile (iOS/Android):**

1. Open the app in Safari (iOS) or Chrome (Android).
2. Tap the **Share** icon (iOS) or browser menu (Android).
3. Select **“Add to Home Screen”**.
4. The app will appear as a standalone icon, just like a native app.

> Once installed, Anime Schedule can run offline and will cache previously viewed anime for faster access.


## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/anime-schedule.git
cd anime-schedule

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```
## Directory Structure

```text


.
├── package.json
├── package-lock.json
├── public
│   ├── appsw.js
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── offline.html
│   ├── robots.txt
│   ├── serviceWorker.js
│   └── test.jpg
├── README.md
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── assets
    │   ├── logo2.webp
    │   ├── logo.webp
    │   └── test.jpg
    ├── components
    │   ├── AnimeDetail
    │   │   └── AnimeDetail.jsx
    │   ├── bookmark
    │   │   └── Bookmark.jsx
    │   ├── Card
    │   │   └── Card.jsx
    │   ├── LeftBar
    │   │   └── LeftBar.jsx
    │   ├── offlinePopUp
    │   │   ├── offline.css
    │   │   └── OfflinePopUp.jsx
    │   ├── RightBar
    │   │   └── RightBar.jsx
    │   └── searchList
    │       └── SearchList.jsx
    ├── core-ui
    │   ├── components
    │   │   ├── Portal.jsx
    │   │   └── Tooltip.jsx
    │   ├── icons
    │   │   ├── Icon
    │   │   │   ├── AwardBadge.jsx
    │   │   │   └── Common.jsx
    │   │   ├── index.js
    │   │   └── Search
    │   │       ├── index.js
    │   │       └── Search.jsx
    │   └── styles
    │       ├── globalChat.css
    │       ├── googleButton.css
    │       ├── homePageTitle.module.css
    │       ├── login.css
    │       └── loginHeader.css
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── Page
    │   └── Home.jsx
    ├── redux
    │   ├── animeByIdSlice.js
    │   ├── isOnlineSlice.js
    │   ├── reducers.js
    │   ├── schedulesSlice.js
    │   ├── store.js
    │   └── thunk.js
    ├── reportWebVitals.js
    ├── services
    │   ├── animeapi.service.js
    │   ├── indexedDB.js
    │   ├── networkCheckObserver.js
    │   └── useCheckNetwork.jsx
    ├── setupTests.js
    ├── swDev.js
    ├── swDevs.jsx
    └── TopBar
        ├── TopBar.css
        └── TopBar.jsx
```


## Key Files

src/features/animeSlice.js: Manages anime list and loading state

src/components/AnimeCard.jsx: Renders a single anime tile

src/pages/Home.jsx: Home page with infinite scrolling grid

src/App.jsx: Router and global provider setup

src/styles/theme.js: Theme tokens for colors, spacing, typography

src/api/animeApi.js: API client or mock for fetching anime data

## Usage Notes

- Extendable with pages like AnimeDetail, Favorites, or Search.

- Offline bookmarking hints are included in the codebase; you can adapt persistence via localStorage or IndexedDB.

- Handles network failures gracefully, with loading and error UI feedback.

- ESLint is included for code quality. Ensure a modern Node.js environment.


## Contributing

### Fork the repository

1> Create a feature branch (git checkout -b feature/new-feature)

2> Commit your changes (git commit -am 'Add new feature')

3> Push to the branch (git push origin feature/new-feature)

4> Open a pull request

### Follow existing code style and add tests for new components or slices. Document any API changes or new dependencies.

#### Example Usage

- Run the app and navigate to the Home page to browse anime tiles.

- To implement bookmarking: add a Redux bookmarks slice and persist to localStorage.
