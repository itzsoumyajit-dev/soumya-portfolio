import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero   from './components/Hero'
import About  from './components/About'
import Work   from './components/Work'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
