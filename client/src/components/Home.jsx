import MapComponent from './MapComponent'
import BottomNavigation from './BottomNavigation'

const Home = () => {
  // Optional: Custom site click handler
  const handleSiteClick = (site) => {
    console.log('Site clicked from Home:', site.name)
    // Add any custom logic here
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* You can customize the MapComponent with props */}
      <MapComponent 
        // center={[22.5726, 88.3639]} // Default Kolkata center
        // zoom={13} // Default zoom
        // height="100vh" // Default height
        // width="100%" // Default width
        // showClustering={true} // Default clustering
        // onSiteClick={handleSiteClick} // Optional custom click handler
        // customSites={[]} // Optional custom sites array
      />
      <BottomNavigation />
    </div>
  )
}

export default Home