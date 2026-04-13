# Peak Roofing Solutions – Roofing Website

A professional, fully responsive roofing company website for an England-based business.

## Features

- **Hero section** – Bold headline, badges, and call-to-action buttons
- **Trust bar** – Key stats (years of experience, projects completed, rating)
- **Services** – 8 service cards covering all major roofing types
- **About Us** – Company background, accreditations, and credentials
- **Why Choose Us** – 6 USP cards (pricing, guarantees, insurance, etc.)
- **4-Step Process** – Visual guide to how the service works
- **Testimonials** – 4 customer reviews with review platform badges
- **Contact / Free Quote** – Form with UK-specific validation (phone, postcode)
- **Sticky header** with mobile hamburger menu
- **Scroll-to-top** button
- **Fully responsive** – Desktop, tablet, and mobile layouts

## Tech Stack

- Plain HTML5, CSS3, and vanilla JavaScript (no build tools required)
- Google Fonts (Montserrat + Open Sans)
- CSS custom properties, CSS Grid, Flexbox
- IntersectionObserver for scroll animations

## Project Structure

```
├── index.html          # Main page
├── css/
│   └── styles.css      # All styles (variables, components, responsive)
├── js/
│   └── main.js         # Interactivity (nav, form validation, animations)
└── images/             # Image assets directory
```

## Running Locally

Simply open `index.html` in a browser, or serve the directory with any static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
