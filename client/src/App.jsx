import './App.css'
import MapComponent from './components/MapComponent'
import BottomNavigation from './components/BottomNavigation'

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MapComponent />
      <BottomNavigation />
    </div>
  )
}

export default App
