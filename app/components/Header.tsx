import { useContext } from "react";
import { Star } from "./Star";
import { TimeContext } from "./Timer";

export const Header = () => {
    const timeLeft = useContext(TimeContext);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const timerColor = {
        stars: timeLeft === 0 ? "fill-text" : timeLeft <= 30 ? "fill-red-timer animate-pulse-1" : "fill-yellow-timer",
        text: timeLeft === 0 ? "text-text" : timeLeft <= 30 ? "text-red-timer animate-pulse-1" : "text-yellow-timer",
    }

    return (
        <header className="bg-header w-full text-center p-2 flex flex-col items-center gap-1">
            <p className="sm:text-lg xl:text-2xl leading-[1.3] font-semibold">Успейте открыть пробную неделю</p>
            <span className={`font-raleway text-[1.75rem] sm:text-[2rem] xl:text-[2.5rem] leading-[1.1] font-bold ${timerColor.text} flex items-center gap-2 h-9 sm:h-10.5 xl:h-13`}><Star className={timerColor.stars}/>{formatTime(timeLeft)}<Star className={timerColor.stars}/></span>
        </header>
    );
}