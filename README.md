# Memory Match Game (React + Tailwind + Framer Motion)

## Demo

\[Live Demo on Vercel/Netlify] (replace with your live link)

## Overview

Memory Match is a browser-based mini-game where players flip cards to find matching pairs. The game tracks moves, time, and stores the best score in localStorage. Difficulty increases after each win.

### Features

* **Flip-to-match gameplay** with cards.
* **Moves counter** and **timer**.
* **Difficulty scaling**: number of pairs increases after each win.
* **Pause/Resume** and **Restart** options.
* **Best score** saved in localStorage.
* **Leaderboard stub**: mock JSON with top 10 scores.
* **Responsive design**: mobile-friendly UI.
* **Animations**: card flip animation using Framer Motion.
* **Sound feedback**: subtle beeps on flip/match/miss.

## Tech Stack

* React (Vite or Next.js)
* Tailwind CSS
* Framer Motion
* WebAudio API (for sound)
* LocalStorage (for best score and leaderboard stub)

## Installation / Setup

1. Clone the repository:

   ```bash
   git clone <repo-link>
   cd memory-match
   ```
2. Install dependencies:

   ```bash
   npm install
   npm install framer-motion
   ```
3. Setup Tailwind CSS:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   * Update `tailwind.config.cjs` content to:

     ```js
     content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}']
     ```
   * Add Tailwind directives to `src/index.css`:

    
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
  
4. Replace `src/App.jsx` with the provided code.
5. Run the dev server:

   npm run dev
 

## Controls

* **Click/Tap a card**: flip it.
* **Match all pairs** to win.
* **Pause**: pause timer and gameplay.
* **Restart**: restart the current level.
* **Reset Level**: resets difficulty to starting pairs.
* **Leaderboard**: submit your name to save your score (client-only stub).

## Scoring

* Score is calculated based on number of moves and time taken.
* Higher score is better.
* Best score is automatically saved in localStorage.


## Known Issues / Limitations

* Leaderboard is client-side only; no server integration.
* Single-file demo (App.jsx); should be modularized for production.
* Minimal accessibility support; ARIA attributes not fully implemented.

## Future Improvements

* Split components: `Card`, `HUD`, `Leaderboard`.
* Add server-based leaderboard.
* Add sound toggle and volume control.
* Enhance accessibility (keyboard navigation, screen reader support).
* Deploy with CI/CD for automatic updates.
