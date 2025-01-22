import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isInSequence = (number: number) => {
    const firstTerm = 1;
    const diff = 4;

    const temp = number - firstTerm;

    return temp % diff === 0;
};
