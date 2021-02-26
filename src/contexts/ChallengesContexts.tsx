import { type } from "os";
import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from '../../challenges.json';
import {LevelUpModal } from '../components/LevelUpModal'



interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData { 
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenges: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;

}

interface ChallengesProviderProps {
    children: ReactNode
    level: number,
    currentExperience: number,
    challengesCompleted: number
}



export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
    children,
    ...rest
}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1)
        setisLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setisLevelUpModalOpen(false)
    }

    function startNewChallenges() {
        const randomChallengeIntex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIntex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission == 'granted') {
            new Notification("Novo desafio 🎉", {
                body: `Valendo ${challenge.amount}xp!`
                
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        
      
        <challengesContext.Provider
         value={
             { level ,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenges,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completedChallenge,
                closeLevelUpModal

            }}
        >
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </challengesContext.Provider>
    );
    
}
