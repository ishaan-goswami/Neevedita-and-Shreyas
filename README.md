# 🪔 Shreyas & Neevedita — Wedding Guest Invitation & Event Portal

A minimalist, elegant Hindu Indian wedding guest invitation portal for **Shreyas & Neevedita**, built with **React, TypeScript, Tailwind CSS, and Vite**. Designed with a minimalist temple silhouette backdrop, warm gold and ivory tones, and pure English typography.

---

## 🎯 How It Works

Instead of a generic public wedding website, this is an **invitation & event access portal**:

1. **Guest Name Lookup**:
   Guests enter their full name into the search box on the landing page.
2. **Personalized Event Schedule**:
   The portal looks up the guest in [`src/guestData.ts`](./src/guestData.ts) and displays **only the specific ceremonies they are invited to** (e.g. some guests are invited to all 4 ceremonies, while others to Sangeet & Reception or Wedding & Reception).
3. **Personalized RSVP**:
   Guests confirm their attendance directly for their invited ceremonies, select party size & dietary preference (Vegetarian, Jain Vegetarian, Vegan, etc.), and can 1-click send their RSVP confirmation directly to the couple via WhatsApp!

---

## 🧪 Demo Test Names (Mock Database)

A sample dataset is pre-configured in [`src/guestData.ts`](./src/guestData.ts) so you and Neevedita can test immediately:

| Sample Guest Name | Invited Events |
| :--- | :--- |
| **Amit Kumar** | All 4 Events (Haldi, Sangeet, Wedding, Reception) |
| **Priya Sharma** | 3 Events (Sangeet, Wedding, Reception) |
| **Rohan Verma** | 2 Events (Wedding & Reception) |
| **Uncle Rajesh & Family** | All 4 Events (Haldi, Sangeet, Wedding, Reception) |
| **Ananya Patel** | 2 Events (Wedding & Reception) |

*(Entering any other name will display a welcoming schedule preview with instructions on connecting a database).*

---

## 🚀 Quick Start (Run Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open your browser at **`http://localhost:5173`**.

### 3. Production Build
```bash
npm run build
```

---

## 🔌 Connecting Your Real Database Later

When you are ready with your real database (e.g. Google Sheets, Supabase, Airtable, Firebase, or PostgreSQL), you only need to connect it in:
👉 **[`src/guestData.ts`](./src/guestData.ts)**

The lookup function `lookupGuest(query)` can be updated to fetch from your backend or API endpoint:

```typescript
// Example async API fetch:
export async function lookupGuestFromDb(query: string): Promise<GuestProfile | null> {
  const response = await fetch(`/api/guests?name=${encodeURIComponent(query)}`);
  return await response.json();
}
```

---

## 🌐 Deploy to GitHub Pages (Free)

The project includes pre-configured relative paths in `vite.config.ts` and an automated GitHub Actions deployment workflow in `.github/workflows/deploy.yml`.

To deploy:
```bash
git add .
git commit -m "Update portal for Shreyas & Neevedita"
git push origin main
```
In your GitHub repo:
1. Navigate to **Settings** → **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Your site will automatically build and publish!
