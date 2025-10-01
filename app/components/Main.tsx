"use client";

import Image from "next/image";
import { Tariffs } from "./Tariffs";
import Link from "next/link";
import { Checkbox } from "./Checkbox";
import { useState } from "react";

export const Main = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [warning, setWarning] = useState(false);

    const handleSubmit = () => {
        if(!isChecked) {
            setWarning(true);
        }
    }

    return (
        <main className="py-5 px-4 sm:pb-7.5 xl:py-12.5 xl:px-8 xl:pb-37.5 flex flex-col xl:w-7xl mx-auto">
            <h1 className="text-[1.375rem] sm:text-2xl xl:text-[2.5rem] leading-[1.1] font-bold">Выбери подходящий для себя <span className="text-accent">тариф</span></h1>
            <form className="grid grid-cols-1 xl:grid-cols-[auto_auto] xl:gap-x-22 mt-6 sm:mt-5 xl:mt-27.5">
                <div className="justify-self-center relative h-50 w-25 sm:h-62.5 sm:w-31.25 xl:w-95 xl:h-192 xl:row-span-5">
                    <Image src="/man.png" alt="" fill className="object-contain"/>
                </div>
                <Tariffs />
                <div className="flex items-start px-3 py-3.5 xl:px-5 xl:py-4.5 gap-2 mt-2.5 sm:mt-3 xl:mt-5 bg-exclamation-bg rounded-[1.25rem] w-full xl:w-fit">
                    <Image src="/exclamation.svg" alt="exclamation" width={24} height={26} className="w-5.5 h-6 xl:w-6 xl:h-6.5"/>
                    <p className="text-xs xl:text-base leading-[1.3] sm:w-64 md:w-full xl:w-107">Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
                </div>
                <div className="flex gap-2.5 mt-4 sm:mt-6 xl:mt-7.5 w-full xl:w-162">
                    <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} warning={warning}/>
                    <span className="text-xs xl:text-base leading-[1.2] xl:leading-[1.1] text-acception">Я согласен с <Link className="underline" href="#">офертой рекуррентных платежей</Link> и <Link className="underline" href="#">Политикой конфиденциальности</Link></span>
                </div>
                <button type="submit" onClick={handleSubmit} className="p-4 sm:p-5 rounded-[1.25rem] bg-accent w-full mt-4 sm:mt-5 xl:mt-4 text-lg xl:text-[1.25rem] leading-[1.3] font-bold text-btn-text animate-pulse-2 xl:w-88">Купить</button>
                <span className="mt-2.5 sm:mt-5 xl:mt-3.5 text-[10px] xl:text-sm leading-[1.2] text-disclaimer">Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.</span>
            </form>
            <div className="border-1 border-cards-border p-2.5 xl:p-5 rounded-[1.25rem] xl:rounded-[1.875rem] mt-5.5 sm:mt-6 xl:mt-16.5 flex flex-col items-start gap-2.5 xl:gap-7.5">
                <span className="text-center font-medium text-base sm:text-lg xl:text-[1.75rem] leading-[1.2] text-garanty border-1 border-garanty bg-exclamation-bg rounded-[1.875rem] py-2.5 px-4 xl:py-4 xl:px-7">гарантия возврата 30 дней</span>
                <p className="text-[13px] sm:text-sm xl:text-2xl leading-[1.3] text-garanty-disclaimer">Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.</p>
            </div>
        </main>
    );
}