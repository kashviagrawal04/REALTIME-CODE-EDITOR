# 🎬 CineSync

> *Stream free. Browse bold.*

CineSync is a React-based movie browsing web app where users can explore a curated library of 56 films, search by title, save favourites, and watch trailers — all with a sleek dark-themed UI.

---

## ✨ Features

- 🔍 **Live Search** — Instantly filter movies by title as you type
- ❤️ **Favourites** — Like movies and view them in a dedicated Favourites tab
- 🎥 **Trailers** — Each movie card links out to its YouTube trailer
- 🔐 **Login / Register** — UI for sign-in and account creation (UI-only, no backend)
- 📱 **Responsive Design** — Works across mobile, tablet, and desktop
- 🎨 **Dark Cinematic Theme** — Deep purple/black palette with smooth typography

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v4 + custom theme |
| UI Components | MDB React UI Kit |
| Fonts | DM Sans, Bebas Neue (Google Fonts) |
| Data | Local `movies.json` (56 movies, TMDB posters) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/cinesync.git
cd cinesync

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── MovieCard.jsx      # Individual movie card with like button
│   └── Search.jsx         # Search input component
├── App.jsx                # Root component & view router
├── Favourites.jsx         # Liked movies view
├── Login.jsx              # Login / Register form
├── movies.json            # Movie data (56 entries)
├── index.css              # Tailwind config & global styles
└── main.jsx               # React entry point
```

---

## 🗺️ Roadmap / Potential Improvements

- [ ] Connect login to a real backend (Firebase / Supabase)
- [ ] Persist favourites in `localStorage`
- [ ] Add genre filtering and sort by rating/year
- [ ] Embed trailer player inline instead of linking to YouTube
- [ ] Paginate or lazy-load the movie grid
- [ ] Add a trending / featured section

---

## 🙏 Credits

- Movie poster images via [TMDB](https://www.themoviedb.org/)
- Trailers via [YouTube](https://youtube.com)

---

## 📄 License

MIT — feel free to fork and build on it.
