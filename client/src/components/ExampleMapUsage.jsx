import MapComponent from './MapComponent'

// Example 1: Basic usage with default settings
export const BasicMap = () => {
  return <MapComponent />
}

// Example 2: Custom center and zoom
export const CustomLocationMap = () => {
  return (
    <MapComponent 
      center={[22.5448, 88.3426]} // Victoria Memorial
      zoom={15}
      height="400px"
      width="100%"
    />
  )
}

// Example 3: Map without clustering
export const SimpleMap = () => {
  return (
    <MapComponent 
      showClustering={false}
      height="300px"
    />
  )
}

// Example 4: Map with custom sites
export const CustomSitesMap = () => {
  const customSites = [
    { id: 1, name: "Custom Location 1", lat: 22.5726, lng: 88.3639 },
    { id: 2, name: "Custom Location 2", lat: 22.5800, lng: 88.3700 },
  ]

  const handleSiteClick = (site) => {
    console.log('Custom site clicked:', site.name)
    alert(`You clicked on ${site.name}`)
  }

  return (
    <MapComponent 
      customSites={customSites}
      onSiteClick={handleSiteClick}
      height="500px"
      showClustering={false}
    />
  )
}

// Example 5: Small embedded map
export const EmbeddedMap = () => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <MapComponent 
        height="200px"
        zoom={11}
        showClustering={false}
      />
    </div>
  )
}