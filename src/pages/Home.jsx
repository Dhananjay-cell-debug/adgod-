import Hero from '../sections/Hero'
import Studio from '../sections/Studio'
import Services from '../sections/Services'
import SelectedWork from '../sections/SelectedWork'
import Contact from '../sections/Contact'

export default function Home({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <Studio />
      <Services />
      <SelectedWork />
      <Contact />
    </>
  )
}
