import { motion } from 'framer-motion'
import { pageVariants } from '../lib/animations'
import Hero from '../components/home/Hero'
import StatsBar from '../components/home/StatsBar'
import Businesses from '../components/home/Businesses'
import Chairman from '../components/home/Chairman'
import Timeline from '../components/home/Timeline'
import GlobalPresence from '../components/home/GlobalPresence'
import News from '../components/home/News'
import FutureWorks from '../components/home/FutureWorks'


export default function Home() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <StatsBar />
      <Businesses />
      <GlobalPresence />
      <Chairman />
      <Timeline />
      <FutureWorks />
      <News />
    </motion.main>
  )
}
