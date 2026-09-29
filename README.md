# MACH25 Cohort Website

This is a static, dependency-free website for the public-facing MACH25 cohort profile. It uses aggregate, de-identified outputs from the 24 September 2026 adult cohort release.

## Preview locally

Open `index.html` directly in a browser, or serve the `website` folder with any static file server.

## Deploy

### GitHub Pages

1. Create a GitHub repository and copy the contents of this `website` folder into the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**, then select the default branch and `/ (root)`.

### Vercel

Import the repository, set the project root to the folder containing `index.html`, and leave the build command empty. Vercel will serve it as a static site.

The PDF and figure links are relative, so they work on GitHub Pages, Vercel, or a local static server.
