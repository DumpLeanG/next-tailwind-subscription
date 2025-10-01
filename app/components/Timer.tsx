"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "./Header"
import { Main } from "./Main";
import { createContext } from "react";

export const TimeContext = createContext(0);

export const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(120);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [])

    return (
        <TimeContext value={timeLeft}>
            <Header />
            <Main />
        </TimeContext>
    );
}