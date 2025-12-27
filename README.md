# Sonar Kolkata - Unified Client

A unified React application that combines the beautiful UI from the lovable-frontend with the interactive map functionality from sonar-kolkata. This application allows users to explore Kolkata's heritage sites through an interactive map with audio narration.

## Features

- **Interactive Map**: Full-screen Leaflet map with marker clustering
- **Heritage Sites**: 50+ heritage sites across Kolkata with detailed information
- **Audio Narration**: Click on sites to hear their stories (requires n8n backend)
- **Modern UI**: Beautiful glass-morphism design with gold/brown theme
- **Responsive Design**: Works on both desktop and mobile devices
- **Bottom Navigation**: Mobile-first navigation with Map, Scan, and Heritage tabs

## Technology Stack

- **React 18.3.1** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Leaflet** for interactive maps
- **React Router** for navigation
- **React Query** for state management

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:8080](http://localhost:8080) in your browser

## Map Integration

The MapComponent supports the following features:

- **Marker Clustering**: Groups nearby markers for better performance
- **Custom Icons**: Gold markers for discovered sites, red for undiscovered
- **Audio Narration**: Integrates with n8n webhook for story narration
- **Site Details**: Click markers to see site information and hear stories

### MapComponent Props

```typescript
interface MapComponentProps {
  center?: [number, number];        // Default: [22.5726, 88.3639] (Kolkata)
  zoom?: number;                    // Default: 13
  height?: string;                  // Default: '100vh'
  width?: string;                   // Default: '100%'
  showClustering?: boolean;         // Default: true
  onSiteClick?: (site: HeritageSite) => void;
  customSites?: HeritageSite[];
}
```

## Routes

- `/` - Landing page with hero section and features
- `/map` - Full-screen interactive map

## API Integration

The application fetches heritage sites from:
- Primary: `https://api.sonarkolkata.com/heritage-sites`
- Fallback: Mock data with 50 heritage sites

Audio narration requires n8n webhook at:
- `http://localhost:5678/webhook-test/narrate-heritage`

## Building for Production

```bash
npm run build
```

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── landing/         # Landing page sections
│   │   ├── modals/          # Modal components
│   │   ├── MapComponent.tsx # Interactive map component
│   │   ├── BottomNavigation.tsx
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Index.tsx        # Landing page
│   │   ├── MapPage.tsx      # Map page
│   │   └── NotFound.tsx
│   ├── lib/
│   └── hooks/
├── public/
└── package.json
```

## Contributing

This project combines the best of both the lovable-frontend and sonar-kolkata projects. When making changes:

1. Maintain the TypeScript types
2. Follow the existing component patterns
3. Test both desktop and mobile views
4. Ensure map functionality works with and without n8n backend