# Quatréa — The Elements of Time

An immersive, cinematic scrollytelling e-commerce website for **Quatréa**, a fictional luxury perfume house. Four seasonal extractions — Spring, Summer, Autumn and Winter — are presented through dark, premium visuals, smooth animations and a working shopping bag.

<img width="959" height="539" alt="image" src="https://github.com/user-attachments/assets/5428346b-ded0-4bc9-a202-a7b744b062e1" />

**Live demo:** https://perfume-website-ckqd.vercel.app/

> Quatréa is a fictional brand created for a design and front-end concept project. No real payments are processed.

---

## Features

- **Cinematic home experience** — a scroll-driven timeline that moves through the four seasons
- **Collection page** — all four fragrances with season filters (All, Spring, Summer, Autumn, Winter)
- **Product details** — fragrance notes, descriptions and pricing for each perfume
- **Shopping bag** — add and manage items with live item count in the navigation
- **Fragrance Finder** — guided discovery of the right scent
- **The House** — brand story and craftsmanship
- **Premium dark UI** — glassmorphic floating navigation, elegant serif and sans-serif typography
- **Responsive layout** for desktop and mobile

## The Collection

| Season | Fragrance | Character | Price |
|--------|-----------|-----------|-------|
| Spring | **Vernal Bloom** | Fresh · Floral · Aquatic | $290 |
| Summer | **Solar Solstice** | Solar · Citrus · Marine | $310 |
| Autumn | **Equinox Smoke** | Smoky · Woody · Oriental | $320 |
| Winter | **Crystalline Frost** | Glacial · Resinous · Wood | $340 |

## Tech Stack

- [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — dev server and build tool
- [Tailwind CSS](https://tailwindcss.com/) — styling
- Deployed on [Vercel](https://vercel.com/)

## Project Structure

```
├── public/
│   └── images/          # Product and hero images, served at /images/...
├── src/
│   ├── assets/          # Static assets used inside the code
│   ├── components/      # Reusable UI components
│   ├── context/         # Global state (e.g. shopping bag)
│   ├── data/            # Fragrance data (fragrances.ts)
│   ├── pages/           # Page-level views
│   ├── types/           # TypeScript types
│   ├── App.tsx          # App shell and routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── vite.config.ts
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/FaizanKhalid-Coder/Perfume-Website.git
cd Perfume-Website

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
```

The site will be available at **http://localhost:3000**.

### Environment variables

If the project needs any keys, copy the example file and fill in your own values:

```bash
cp .env.example .env
```

Never commit your real `.env` file.

### Production build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it on [vercel.com/new](https://vercel.com/new).
3. Use these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add any environment variables from `.env.example`, then deploy.

### Note about images

Images are stored in `public/images/` and referenced in code as `/images/filename.jpg`. Files inside `src/` are not available as plain URLs after a production build, so string paths like `/src/assets/...` will break on Vercel.

A `.npmrc` file with `legacy-peer-deps=true` is included to avoid peer dependency conflicts during install.

## Author

**Faizan Khalid** — [@FaizanKhalid-Coder](https://github.com/FaizanKhalid-Coder)

## License

This project is for educational and portfolio purposes.
