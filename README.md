# Personal Page - Wang Tianqi

A clean, modular personal academic page with easy-to-update content.

## 📁 Project Structure

```
personal_page/
├── index.html              # Main HTML page
├── css/
│   └── style.css           # All styles (easy to customize)
├── js/
│   └── main.js             # JavaScript for dynamic content loading
├── data/                   # ⭐ Edit these files to update content
│   ├── profile.json        # Name, title, social links
│   ├── about.json          # About me, research interests, contact info
│   └── publications.json   # Publications list
├── assets/
│   ├── avatar.jpg          # Your profile photo (add your own)
│   └── papers/             # PDF files for publications
└── README.md               # This file
```

## 🚀 Quick Start

1. **Add your avatar**: Place your profile photo at `assets/avatar.jpg`
2. **Update your profile**: Edit `data/profile.json` with your information
3. **Update about content**: Edit `data/about.json` with your bio
4. **Add publications**: Edit `data/publications.json` with your papers
5. **Open in browser**: Due to CORS restrictions, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using VS Code Live Server extension
   Right-click index.html → "Open with Live Server"
   ```

## 📝 How to Update Content

### Profile (`data/profile.json`)

Update your basic information and social links:

```json
{
    "name": "Your Name",
    "title": "Your Title",
    "affiliation": "Your Institution",
    "avatar": "assets/avatar.jpg",
    "socialLinks": [
        {
            "name": "GitHub",
            "url": "https://github.com/YOUR_USERNAME",
            "icon": "fab fa-github"
        },
        {
            "name": "Google Scholar",
            "url": "https://scholar.google.com/citations?user=YOUR_ID",
            "icon": "fas fa-graduation-cap"
        }
    ]
}
```

### Publications (`data/publications.json`)

Add your publications with this format:

```json
{
    "publications": [
        {
            "id": 1,
            "year": "2024",
            "title": "Your Paper Title",
            "authors": "Author1, Author2, & Author3",
            "venue": "Journal or Conference Name",
            "abstract": "Brief description of your paper...",
            "links": {
                "paper": "https://doi.org/your-doi",
                "code": "https://github.com/your-repo",
                "pdf": "assets/papers/your-paper.pdf"
            }
        }
    ]
}
```

### About Content (`data/about.json`)

Update your bio, research interests, and contact information.

## 🎨 Customization

### Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main accent color */
    --primary-dark: #1d4ed8;       /* Darker accent */
    --text-color: #1e293b;         /* Main text color */
    --bg-color: #ffffff;           /* Background color */
    /* ... more variables */
}
```

### Icons

This template uses [Font Awesome](https://fontawesome.com/icons) icons. You can change any icon by updating the `icon` field in the JSON files.

Common icons:
- `fab fa-github` - GitHub
- `fas fa-graduation-cap` - Google Scholar
- `fas fa-envelope` - Email
- `fab fa-twitter` - Twitter/X
- `fab fa-linkedin` - LinkedIn
- `fas fa-globe` - Website

## 📱 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean, professional academic style
- ✅ Easy content updates via JSON files
- ✅ Modular structure (content separated from layout)
- ✅ Smooth scrolling navigation
- ✅ Publication cards with paper/code links
- ✅ Social media links with icons

## 🔧 Requirements

- Modern web browser
- Local web server for development (due to CORS with JSON files)

## 📄 License

Feel free to use and modify this template for your personal page.
