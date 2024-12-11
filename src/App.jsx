import Auth from "./components/Auth"

function App() {
  return (
    <div className="w-full h-screen bg-slate-400 flex flex-col gap-5 justify-center items-center">
     <h1 className="font-semibold text-white text-3xl">Google Authentication</h1>
     <Auth/>
    </div>
  )
}

export default App
