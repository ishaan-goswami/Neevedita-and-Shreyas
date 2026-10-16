# 🪔 Hindu Indian Wedding Invite Website

A minimalist, elegant Hindu Indian wedding invitation website built with **React, TypeScript, Tailwind CSS, and Vite**. Designed with authentic Vedic cultural elements, sacred temple silhouettes, delicate gold & ivory aesthetics, and mobile-first responsiveness.

---

## ✨ Features

- **Minimalist Hindu Temple Silhouette**: Layered Nagara/Dravidian Shikhara spires and mandapas in warm gold.
- **Auspicious Invocations**: Traditional `|| श्री गणेशाय नमः ||` (Om Shri Ganeshaya Namaha) invocation, Lord Ganesha emblem, and Shanti mantra.
- **Live Muhurat Countdown**: Real-time days, hours, minutes, and seconds countdown to the wedding ceremony.
- **Ceremonies & Itinerary**:
  - Detailed schedule for Haldi, Mehendi & Sangeet, Baraat & Sacred Pheras, and Reception.
  - Auspicious Muhurat notes, venue details, and dress code suggestions with color palettes.
  - **"Add to Google Calendar"** one-click links.
  - **"Get Directions"** Google Maps buttons.
- **The Seven Sacred Steps (Saptapadi)**: Vedic vows around the holy Agni with Sanskrit verses and English meanings.
- **Interactive RSVP System**:
  - RSVP form with ceremony checkboxes, guest counts, and dietary options (Vegetarian, Jain, Vegan, etc.).
  - Celebratory confetti burst upon submission.
  - Direct **"Send via WhatsApp"** button for immediate confirmation to the couple.
  - Local submission storage with CSV export capability.
- **Ambient Sitar & Shehnai Music**: Soft traditional instrumental player in the floating corner (synthesized via Web Audio API, works offline with zero external audio assets).
- **Floating Marigold & Rose Petals**: Subtle, lightweight petal drift animation (with on/off toggle).
- **GitHub Pages Ready**: Pre-configured with relative base paths and GitHub Actions workflow for one-click deployment.

---

## 🚀 Quick Start (Run Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
The compiled, optimized static files will be generated in the `dist/` directory.

---

## 🎨 How to Customize Your Wedding Details

All wedding details are cleanly organized in a single configuration file:
👉 **[`src/weddingConfig.ts`](./src/weddingConfig.ts)**

You can easily update:
1. **Couple & Families**: Names of bride & groom, parents (`Smt. & Shri...`), grandparents, hometowns, and hashtags.
2. **Date & Countdown**: Update `weddingDate` (e.g. `'2027-02-18T10:30:00'`).
3. **Events & Schedule**: Dates, times, Muhurats, dress codes, and ceremony descriptions.
4. **Venue & Accommodations**: Venue name, address, Google Maps links, and airport transit notes.
5. **RSVP WhatsApp Number**: Set `rsvp.contactPhone` to your phone number with country code (e.g. `"919876543210"`).

---

## 🌐 How to Host on GitHub Pages (Free)

This project is pre-configured for GitHub Pages:

### Method A: Automated GitHub Actions (Recommended)
1. Initialize git and push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial wedding website commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow at `.github/workflows/deploy.yml` will automatically build and publish your website! Your site will be live at `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`.

---

## 📱 WhatsApp & Social Sharing
Custom Open Graph tags are pre-configured in `index.html` so when you paste the website link on WhatsApp or iMessage, an auspicious preview card appears with the title and invitation note.
