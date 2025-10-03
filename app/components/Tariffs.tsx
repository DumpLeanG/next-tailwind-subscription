"use client";

import { useContext, useEffect, useState } from "react";
import type { Tariff } from "@/lib/types/tariff";
import { TimeContext } from "./Timer";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

interface ApiResponse {
  success: boolean;
  data?: Tariff[];
  error?: string;
  details?: string;
}

const TariffSkeleton = () => {
  return (
    <ul className="w-full grid grid-cols-1 xl:grid-cols-3 gap-1.5 sm:gap-2 xl:gap-3.5">
      {[0, 1, 2, 3].map((_, index) => (
        <li className={`p-4.5 pr-2 sm:px-7 rounded-[1.25rem] border-2 border-cards-border bg-cards ${index === 0 ? "xl:col-span-3 xl:pt-8.5 xl:pb-7.5 xl:pl-30.5 xl:pr-20 xl:rounded-[2.125rem]" : "xl:pt-17 xl:px-4 xl:pb-5.5 xl:rounded-[2.5rem]"}`} key={index}>
            <div className={`h-19.5 sm:h-22.5 ${index === 0 ? "xl:h-31.5" : "xl:h-53.5"}`}></div>
        </li>
      ))}
    </ul>
  );
};

export const Tariffs = () => {
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const { isXs, isSm } = useBreakpoint();
    
    const timeLeft = useContext(TimeContext);

    async function fetchTariffs() {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch('/api/get-tariffs');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ApiResponse = await response.json();

            if (result.success && result.data) {
                setTariffs(result.data);
            } else {
                throw new Error(result.error || 'Unknown error occurred');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить тарифы';
            setError(errorMessage);
            console.error('Error fetching tariffs:', err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTariffs();
    }, [])

    useEffect(() => {
        if(tariffs.length > 0) {
            const bestTariff = tariffs.find(tariff => tariff.is_best);
            if (bestTariff) {
                setSelectedTariff(bestTariff.period); //Сделал выбор по периоду, так как у вас одинаковые id у "Навсегда" и "3 месяца"
            }
        }
    }, [tariffs])

    useEffect(() => {
        if(timeLeft === 0 ) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 1000)
            return () => clearTimeout(timer);
        }
    }, [timeLeft])

    function shortText(text: string) {
        let cleanedText = text;
        if(text.split(' ').length >= 4) {
            cleanedText = text.replace(/^Для тех, кто хочет |^Чтобы /, "").split(" ").slice(0, 4).join(" ");
            cleanedText = cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);
        }
        return cleanedText;
    }

    if (isLoading) {
        return (
            <TariffSkeleton />
        );
    }

    if (error) {
        return (
        <div className="text-center py-8">
            <span className="text-discount mb-4">Ошибка: {error}</span>
        </div>
        );
    }
    
    return (
        <ul className="w-full grid grid-cols-1 xl:grid-cols-3 gap-1.5 sm:gap-2 xl:gap-3.5">
            {[...tariffs].reverse().map((tariff, index) => {
                const discount = Math.round(100 - (tariff.price * 100 / tariff.full_price)) || 0;
                return (
                    <li className={`relative flex gap-7.5 xl:gap-10 justify-between items-center p-4.5 pr-2 sm:px-7 rounded-[1.25rem] border-2 ${selectedTariff === tariff.period ? "border-accent" : "border-cards-border"} bg-cards ${tariff.is_best ? "xl:col-span-3 xl:pt-8.5 xl:pb-7.5 xl:pl-30.5 xl:pr-20 xl:flex-row xl:rounded-[2.125rem]" : "xl:flex-col xl:pt-17 xl:px-4 xl:pb-5.5 xl:justify-start xl:rounded-[2.5rem]"}`} key={index}>
                        <input required type="radio" name="tariff" value={tariff.period} checked={selectedTariff === tariff.period} onChange={() => setSelectedTariff(tariff.period)} className="absolute top-0 left-0 w-full h-full z-1 cursor-pointer opacity-0"/>
                        <div className="flex flex-col gap-3 sm:gap-4 xl:items-center">
                            <span className="text-base sm:text-lg xl:text-[1.625rem] leading-[1.2] font-medium">{tariff.period}</span>
                            <div className="flex flex-col">
                                <span className={`text-3xl sm:text-[2.125rem] xl:text-[3.125rem] leading-[1] ${tariff.is_best ? "text-accent" : "text-text"} font-semibold whitespace-nowrap ${isAnimating && "animate-price-change"}`}>{timeLeft > 0 ? tariff.price : tariff.full_price} ₽</span>
                                {timeLeft > 0 && <span className="leading-[1.2] sm:text-base xl:text-2xl text-right line-through text-prev-price">{tariff.full_price} ₽</span>}
                            </div>
                        </div>
                        <p className="w-30 md:w-full xl:text-base leading-[1.3]">{(isXs || isSm) ? shortText(tariff.text) : tariff.text}</p>
                        {discount > 0 &&
                            tariff.is_best ?
                            <div className="absolute right-2 -top-[0.125rem] xl:top-0 xl:right-0 xl:left-0 flex items-start sm:gap-2">
                                {timeLeft > 0 && <span className="py-0.75 px-1.5 bg-discount rounded-lg rounded-t-none font-medium text-[13px] sm:text-base xl:text-[1.375rem] leading-[1.3] xl:absolute xl:py-1.25 xl:px-2 xl:-top-[0.125rem] xl:left-12.5">-{discount}%</span>}
                                <span className="p-1.5 font-medium text-[13px] sm:text-base xl:text-[1.375rem] leading-[1.3] text-accent xl:absolute xl:p-0 xl:top-2.5 xl:right-5">хит!</span>
                            </div>
                            :
                            timeLeft > 0 && <span className="absolute py-0.75 px-1.5 right-7.5 -top-[0.125rem] bg-discount rounded-lg rounded-t-none font-medium text-[13px] sm:text-base xl:text-[1.375rem] leading-[1.3] xl:py-1.25 xl:px-2 xl:right-auto xl:-top-[0.125rem] xl:left-12.5">-{discount}%</span>
                        }
                    </li>
                )
            })}
        </ul>
    );
}