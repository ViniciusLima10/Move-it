import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Prfile } from '../components/Profile';

import styles from "../styles/pages/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
        <Head>
          <title>Move.it</title>
          </Head>

          <ExperienceBar />

          <section>
            <div>
            <Prfile />
            <CompletedChallenges />
            <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
    </div>
  )
}
