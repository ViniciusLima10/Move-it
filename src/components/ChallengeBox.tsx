import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContexts';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completedChallenge } =  useContext(challengesContext);
    const { resetCountdown } =  useContext(CountdownContext);

    function handleChallengeSecceeded() {
        completedChallenge();
        resetCountdown();
    }
    function handleChallengeFailed() { 
        resetChallenge();
        resetCountdown();
    }
    
    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>

                        <button 
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSecceeded}
                        >
                            Completei
                        </button>
                    </footer>

                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafios</strong>
                <p>
                <img src="icons/level-up.svg" alt="Level Up"/>
                Avance de level completando desafios.
                </p>
                </div>
            )}
        </div>
    )
}