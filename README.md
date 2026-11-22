# Esha Singh — Enterprise Product Designer Portfolio

Minimal, static portfolio website built with pure HTML, CSS, and vanilla JavaScript (zero build step required) using an Obsidian Black & Wine design system.

## Folder Structure

```text
esha-singh-portfolio/
├── index.html          # Main markup (About, Work / Case Study 01, Process)
├── styles.css          # Obsidian Black & Wine styling & responsive grid
├── script.js           # View switching, layout demo, copy-email & scroll-spy
├── .gitignore          # Ignores OS/editor temporary files
├── README.md           # Setup & GitHub Pages instructions
└── assets/
    ├── Esha_Singh_Resume.pdf   # (Add your resume PDF here)
    └── images/                 # (Add exported Figma screens here)
```

## Quick Setup Before Publishing

1. **Add your GitHub URL:** Open `index.html`, search for `https://github.com/`, and replace both links (Hero + Footer) with your GitHub profile URL.
2. **Add your Resume PDF:** Drop your resume file into `assets/` and name it `Esha_Singh_Resume.pdf`. The **Download my resume** button will automatically download it once hosted.
3. **Add Figma Case Study Screens (optional for v2):** Export your high-fidelity frames from `Case Study.fig` into `assets/images/` and embed them inside the `#cs-demo` section in `index.html`.

## How to Publish Free on GitHub Pages

1. Create a new public repository on GitHub (for example, `portfolio` or `<your-username>.github.io`).
2. Upload all files inside `esha-singh-portfolio/` to the root of your repository (so `index.html` is at the top level).
3. In your repository, go to **Settings → Pages**.
4. Under **Build and deployment → Branch**, select `main` and `/ (root)`, then click **Save**.
5. Wait ~1 minute—your live portfolio link will appear at `https://<your-username>.github.io/<repo-name>/`.
