# THREATLENS — Project Overview

## Product
**Name:** THREATLENS
**Tagline:** "Different aliases. Same actor. A clearer picture."
**Type:** AI-assisted cyber threat intelligence platform — frontend-only investigator dashboard demo.

## Problem Statement
THREATLENS is an investigator-facing cyber threat intelligence platform that correlates the digital footprints (handles, PGP keys, wallets, infrastructure artifacts, behavioral patterns) threat actors leave across dark-web platforms. The current implementation is fully functional but uses a generic purple/indigo SaaS visual identity that does not match the seriousness and premium nature of a cyber-intelligence investigation tool.

## Goal of This Redesign
Completely redesign the PRESENTATION/UI/UX layer of the existing THREATLENS frontend while preserving ALL existing:
- Functionality, routes, API integration, state management
- Forms, graph behavior, search behavior, authentication behavior
- Tables, filters, exports, and user workflows

The redesign targets the visual language of an "elite cyber-intelligence investigation interface designed by an experimental digital studio" — inspired by the Davide Cattaneo reference site (davidecattaneo.it/en).

## Tech Stack (Must Preserve)
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Lucide React
- React Router v7
- GSAP + @gsap/react (already installed)
- Lenis (already installed)

## New Design Identity
- **Primary Background:** Near-black (#050605, #070907)
- **Primary Accent:** Electric green (#39FF68)
- **Typography:** Editorial, large, thin/bold contrast — Inter / Manrope / Plus Jakarta Sans
- **Visual Language:** Dark canvas + green signal paths + editorial typography + thin technical lines + relationship visualization
- **Motion:** GSAP ScrollTrigger for cinematic scroll choreography, Lenis for smooth scrolling

## Existing Routes (All Must Remain Functional)
- `/` → LandingPage (marketing/hero)
- `/login` → Login
- `/dashboard` → Dashboard (inside MainLayout)
- `/actors` → ActorProfile (inside MainLayout)
- `/relationships` → RelationshipGraph (inside MainLayout)
- `/infrastructure` → Infrastructure (inside MainLayout)
- `/sources` → Sources (inside MainLayout)
- `/analysis` → Analysis (inside MainLayout)
- `/evidence` → Evidence (inside MainLayout)
- `/reports` → Reports (inside MainLayout)
- `/settings` → Settings (inside MainLayout)
- `/profile` → UserProfile (inside MainLayout)

## Repository
GitHub: https://github.com/Abhiraj-creator/THREATLENS
Local: `d:\coding_workspace\vibe coded\THREATLENS\client\`
