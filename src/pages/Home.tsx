import React from 'react';
import { Hero } from '../sections/Hero';
import { Marquee } from '../sections/Shared';
import { About } from '../sections/About';
import { MissionVision } from '../sections/MissionVision';
import { Stats } from '../sections/Stats';
import { Services } from '../sections/Services';
import { Process } from '../sections/Process';
import { Logos } from '../sections/Logos';
import { Articles } from '../sections/Articles';
import { WhyCta } from '../sections/WhyCta';
import { Faq } from '../sections/Faq';

interface HomeProps {
  navigate: (to: string) => void;
}

export const Home: React.FC<HomeProps> = ({ navigate }) => {
  return (
    <main>
      <Hero navigate={navigate} />
      <Marquee />
      <About />
      <MissionVision />
      <Stats />
      <Services navigate={navigate} />
      <Process />
      <Logos />
      <Articles navigate={navigate} />
      <WhyCta navigate={navigate} />
      <Faq />
    </main>
  );
};

export default Home;
