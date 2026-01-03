
import { Inter, Merriweather, Playfair_Display, JetBrains_Mono } from 'next/font/google';

// 1. Sans Serif (UI / Body) - Safe, legible, standard
export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

// 2. Serif (Headings) - Editorial standard
export const merriweather = Merriweather({
    weight: ['300', '400', '700', '900'],
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

// 3. Alternative Serif (If needed)
export const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif-playfair',
    display: 'swap',
});

// 4. Mono (Code blocks)
export const jetbrains = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});
