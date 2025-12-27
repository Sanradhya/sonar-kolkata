# MapComponent Usage Guide

The `MapComponent` is a reusable React component that displays an interactive map with heritage sites. It's built using React Leaflet and supports various customization options.

## Basic Usage

```jsx
import MapComponent from './components/MapComponent'

function MyPage() {
  return <MapComponent />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `center` | `[number, number]` | `[22.5726, 88.3639]` | Map center coordinates [lat, lng] |
| `zoom` | `number` | `13` | Initial zoom level |
| `height` | `string` | `'100vh'` | Map container height |
| `width` | `string` | `'100%'` | Map container width |
| `showClustering` | `boolean` | `true` | Enable/disable marker clustering |
| `onSiteClick` | `function` | `null` | Custom click handler for sites |
| `customSites` | `array` | `null` | Custom array of sites to display |

## Examples

### 1. Full Screen Map (Default)
```jsx
<MapComponent />
```

### 2. Custom Size and Location
```jsx
<MapComponent 
  center={[22.5448, 88.3426]} // Victoria Memorial
  zoom={15}
  height="400px"
  width="800px"
/>
```

### 3. Embedded Small Map
```jsx
<MapComponent 
  height="200px"
  zoom={11}
  showClustering={false}
/>
```

### 4. Custom Sites with Click Handler
```jsx
const customSites = [
  { id: 1, name: "Location 1", lat: 22.5726, lng: 88.3639 },
  { id: 2, name: "Location 2", lat: 22.5800, lng: 88.3700 },
]

const handleSiteClick = (site) => {
  console.log('Site clicked:', site.name)
}

<MapComponent 
  customSites={customSites}
  onSiteClick={handleSiteClick}
  showClustering={false}
/>
```

### 5. Map Without Clustering
```jsx
<MapComponent showClustering={false} />
```

## Site Object Structure

When using `customSites`, each site object should have:

```javascript
{
  id: number,        // Unique identifier
  name: string,      // Display name
  lat: number,       // Latitude
  lng: number,       // Longitude
  history_details?: string  // Optional: detailed history for narration
}
```

## Features

- **Interactive Markers**: Click markers to see site information
- **Audio Narration**: "Hear the Story" button plays audio narration
- **Marker Clustering**: Groups nearby markers for better performance
- **Responsive Design**: Adapts to different screen sizes
- **Custom Styling**: Heritage-themed colors and icons
- **Progress Tracking**: Tracks visited/unlocked sites

## Dependencies

- `react-leaflet`
- `leaflet`
- `react-leaflet-markercluster`

Make sure these are installed in your project.