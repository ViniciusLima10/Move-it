import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContexts';

import styles from '../styles/components/Profile.module.css'

export function Prfile() {
    const { level } = useContext(challengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/ViniciusLima10.png" alt="Foto de Perfil"/>
            <div>
                <strong>Vinicius Lima</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level { level }
                    </p>
            </div>
        </div>
    );
}