
import React from 'react';

type Theme = 'light' | 'dark';

interface ThemeScopeProps {
    theme: Theme;
    children: React.ReactNode;
    className?: string; // Allow passing bg-red-500 etc
}

export const ThemeScope = ({ theme, children, className = '' }: ThemeScopeProps) => {
    return (
        <div
            data-theme={theme}
            // Important: We add 'bg-background' and 'text-foreground' here to FORCE a repaint
            // using the new locally scoped variables from data-theme.
            className={`relative w-full bg-background text-foreground transition-colors duration-300 ${className}`}
        >
            {/* Noise layer needs to be inside or handled via pseudo on the container. 
          The utility .bg-noise handles it with ::before, so we just add the class if desired.
          We'll add it by default to top level containers. */}
            {/* <div className="absolute inset-0 bg-noise pointer-events-none z-0" /> */}

            <div className="relative z-10 bg-noise h-full w-full">
                {children}
            </div>
        </div>
    );
};
