# Affiliate Blog - SEO-Optimized Product Review Site

## Overview
A fast, SEO-friendly affiliate blog built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. The site features markdown-based content management, search and filtering capabilities, dark/light mode, and is optimized for static site generation to maximize performance and SEO.

## Current State
✅ **Production Ready** - All core features implemented and tested
- Homepage with blog post grid, search, and tag filtering
- Dynamic blog post pages with affiliate links and SEO meta tags
- About and Contact pages rendered from markdown
- Dark/light mode toggle with localStorage persistence
- Responsive design with Tailwind CSS
- Static site generation for all pages

## Recent Changes (November 1, 2025)
- Initial project setup with Next.js 16 and TypeScript
- Configured Tailwind CSS 4.x with @tailwindcss/postcss
- Implemented markdown content system with gray-matter and remark
- Created homepage with search and tag filtering (PostsGrid component)
- Built dynamic blog post pages with SEO optimization
- Added dark/light theme toggle with next-themes
- Created sample content (3 blog posts + About/Contact pages)
- Configured workflow to run on port 5000

## Project Architecture

### Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Content**: Markdown with gray-matter, remark, remark-html
- **Theming**: next-themes for dark/light mode
- **Date Formatting**: date-fns

### Directory Structure
```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with ThemeProvider
│   ├── page.tsx           # Homepage (server component)
│   ├── blog/[slug]/       # Dynamic blog post pages
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Header.tsx         # Site header with navigation
│   ├── Footer.tsx         # Site footer
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── PostCard.tsx       # Blog post card component
│   └── PostsGrid.tsx      # Client component for search/filter
├── content/               # Markdown content
│   ├── posts/            # Blog posts (.md files)
│   └── pages/            # Static pages (.md files)
├── lib/                   # Utility functions
│   └── markdown.ts       # Markdown parsing utilities
└── public/               # Static assets
    └── images/           # Blog post images
```

### Key Features

#### 1. Markdown Content System
- Posts stored in `content/posts/` with frontmatter:
  - title, date, coverImage, description
  - affiliateLinks (array of {name, url})
  - tags (for filtering)
- Pages stored in `content/pages/` (About, Contact)
- Parsed with gray-matter, rendered with remark-html

#### 2. SEO Optimization
- **Meta Tags**: Title, description, keywords for every page
- **Open Graph**: og:title, og:description, og:image for social sharing
- **Twitter Cards**: summary_large_image with metadata
- **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- **Clean URLs**: /blog/post-slug format
- **Static Generation**: All pages pre-rendered at build time

#### 3. Affiliate Links
- Displayed prominently at top and bottom of blog posts
- `rel="noopener noreferrer nofollow"` for SEO best practices
- Affiliate disclosure included in footer and post pages

#### 4. Search & Filtering
- Real-time search by title and description
- Tag-based filtering
- Client-side filtering for instant results
- Shows result count

#### 5. Dark/Light Mode
- Toggle button in header
- Persists preference in localStorage
- Smooth transitions between themes
- Respects system preference on first visit

### Content Management

#### Adding a New Blog Post
1. Create a new `.md` file in `content/posts/`
2. Add frontmatter with required fields:
```markdown
---
title: "Your Post Title"
date: "2025-MM-DD"
coverImage: "/images/your-image.jpg"
description: "Brief description for SEO"
affiliateLinks:
  - name: "Buy on Amazon"
    url: "https://amazon.com/product"
tags: ["tag1", "tag2"]
---

Your markdown content here...
```
3. Add cover image to `public/images/`
4. Rebuild the site (pages are statically generated)

#### Adding a New Page
1. Create a `.md` file in `content/pages/`
2. Add frontmatter with title
3. Create corresponding page component in `app/[slug]/page.tsx` if needed

### Deployment & Publishing

#### Build Command
```bash
npm run build
```

#### Start Production Server
```bash
npm start
```

#### Development Server
```bash
npm run dev
```
Runs on port 5000 (configured for Replit webview)

### Configuration Files

#### next.config.ts
- SVG support enabled (dangerouslyAllowSVG)
- Remote image patterns configured
- Content security policy for SVG safety

#### tailwind.config.ts
- Dark mode: class-based
- Custom typography styles
- Responsive breakpoints

#### postcss.config.js
- Uses @tailwindcss/postcss (required for Tailwind 4.x)
- Autoprefixer for browser compatibility

### User Preferences
- None specified yet

### Known Issues & Improvements
1. **Turbopack Panic** (non-critical): Occasional Rust panic in dev logs but doesn't affect functionality
2. **SEO Enhancement**: Consider adding canonical URLs and JSON-LD structured data
3. **Image Placeholders**: Current images are SVGs; replace with actual product photos in production
4. **Markdown Sanitization**: Add sanitization if accepting untrusted content

### Future Enhancements
- RSS feed generation for blog subscribers
- Related posts section based on shared tags
- JSON-LD structured data for rich snippets
- Table of contents for long-form posts
- Reading time estimate
- Social share buttons
- Comment system integration
- Newsletter signup form
- Analytics integration (Google Analytics, Plausible, etc.)
- Sitemap.xml generation
- robots.txt optimization

## Environment Variables
- No environment variables required for basic functionality
- Optional: Analytics tracking IDs, form submission endpoints

## Notes
- All blog content is static (no database)
- Images optimized with next/image
- Affiliate links use proper rel attributes
- Site is fully responsive (mobile, tablet, desktop)
- Fast loading with static site generation
- Ready to publish/deploy to production
