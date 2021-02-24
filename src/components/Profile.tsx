import styles from '../styles/components/Profile.module.css'

export function Prfile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/ViniciusLima10.png" alt="Foto de Perfil"/>
            <div>
                <strong>Vinicius Lima</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level 10
                    </p>
            </div>
        </div>
    );
}