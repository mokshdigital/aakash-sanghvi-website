# Aakash Sanghvi - Portfolio Website

A modern, dynamic portfolio website showcasing AI-powered web development skills and projects, powered by **Supabase** backend and deployed on **Vercel**.

## ✨ Features

- **Home Page**: Interactive resume with smooth-scrolling navigation chips
- **Projects Page**: Password-protected projects showcase (password: `portfolio2024`)
- **Work With Me Page**: 
  - Contact form with Supabase database integration
  - Embedded Google Calendar booking system
- **Backend Integration**: Supabase for contact form submissions and project management
- **Auto-Deployment**: GitHub → Vercel continuous deployment

## 🚀 Quick Start

### Prerequisites
- GitHub account
- Vercel account (free)
- Supabase account (free)

### Deployment Instructions

**📋 See [CHECKLIST.md](./CHECKLIST.md) for complete step-by-step deployment guide!**

Quick overview:
1. Push code to GitHub
2. Create Supabase project and run `supabase-setup.sql`
3. Deploy to Vercel with environment variables
4. Update `config.js` with your Supabase credentials

## 📁 Files Structure

```
├── index.html              # Home/Resume page
├── projects.html           # Projects page with password protection
├── work-with-me.html       # Contact form + Calendar booking
├── styles.css              # Shared styles with modern design system
├── script.js               # Navigation and interactions
├── config.js               # Supabase client configuration
├── package.json            # Dependencies
├── supabase-setup.sql      # Database schema for Supabase
├── .gitignore              # Git ignore rules
├── .env.example            # Environment variables template
├── DEPLOYMENT.md           # Detailed deployment guide
├── CHECKLIST.md            # Step-by-step deployment checklist
└── README.md               # This file
```

## 🛠️ Technologies Used

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Backend**: Supabase (PostgreSQL database, Auth, Storage)
- **Deployment**: Vercel (auto-deploy from GitHub)
- **Integrations**: Google Calendar API
- **Version Control**: Git + GitHub

## 🗄️ Database Schema

The Supabase database includes:
- **projects**: Portfolio projects with tech stack, images, links
- **contacts**: Contact form submissions
- **page_views**: Analytics tracking (optional)

See `supabase-setup.sql` for complete schema.

## 🔐 Environment Variables

Required for Vercel deployment:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

See `.env.example` for template.

## Contact

- Email: aakashsanghvi2791@gmail.com
- LinkedIn: linkedin.com/in/aakashsanghvi

---

Built with AI-assisted coding • 2024




