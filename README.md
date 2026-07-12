# Monthly Expense Tracker (CZK)

A mobile-first React PWA for tracking monthly expenses in Czech Crowns (Kč).
Add it to your iPhone home screen via Safari for a native app feel.

## Project structure

```
expense-tracker/
├── public/
│   ├── index.html       # HTML shell with PWA meta tags
│   └── manifest.json    # PWA manifest
├── src/
│   ├── components/
│   │   ├── Cylinder.jsx       # Animated SVG graduated cylinder
│   │   ├── SalaryCard.jsx     # Salary input / display card
│   │   ├── AddExpenseCard.jsx # Add-expense form
│   │   ├── ExpenseList.jsx    # List of expenses with delete
│   │   └── StatsRow.jsx       # Remaining / Spent / Usage stats
│   ├── hooks/
│   │   └── useLocalStorage.js # Persistent state hook
│   ├── utils/
│   │   └── format.js          # Czech number formatter
│   ├── App.jsx                # Root component + state
│   └── index.js               # React entry point
└── package.json
```

## Local development

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to GitHub Pages

1. In `package.json`, set `"homepage"` to your GitHub Pages URL:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
   ```

2. Install and run the deploy script:
   ```bash
   npm install
   npm run deploy
   ```

   This builds the app and pushes the `build/` folder to the `gh-pages` branch automatically.

3. In your GitHub repo → **Settings → Pages**, set the source branch to `gh-pages`.

## Add to iPhone home screen

1. Open your GitHub Pages URL in **Safari**
2. Tap the **Share** button (box with arrow)
3. Tap **"Add to Home Screen"**
4. Name it "Expenses" and tap **Add**

The app launches fullscreen with no browser chrome, just like a native app.
All data is saved to localStorage — it persists across app restarts.
