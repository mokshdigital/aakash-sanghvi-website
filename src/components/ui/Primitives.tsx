
import React from 'react';

// Typography Primitives
export const Heading = ({
    level = 1,
    children,
    className = ''
}: {
    level?: 1 | 2 | 3 | 4,
    children: React.ReactNode,
    className?: string
}) => {
    const Tag = `h${level}` as React.ElementType;
    // UPDATED: Default to 'Merriweather' (serif) for that Senior Editorial look
    // Added 'tracking-tight' for sharpness
    const baseStyles = "font-serif-merriweather font-bold tracking-tight text-foreground";

    const sizes = {
        1: "text-4xl md:text-5xl lg:text-7xl mb-6 leading-[1.1]",
        2: "text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight",
        3: "text-2xl md:text-3xl mb-3",
        4: "text-xl font-semibold mb-2"
    };

    return <Tag className={`${baseStyles} ${sizes[level]} ${className}`}>{children}</Tag>;
};

export const Text = ({
    children,
    className = '',
    variant = 'body'
}: {
    children: React.ReactNode,
    className?: string,
    variant?: 'body' | 'caption' | 'lead'
}) => {
    const styles = {
        // UPDATED: Increased line-height for better readability (leading-relaxed)
        body: "text-base md:text-lg text-foreground-secondary leading-relaxed max-w-prose",
        caption: "text-sm text-foreground-secondary tracking-wide uppercase",
        lead: "text-xl md:text-2xl text-foreground leading-normal font-light max-w-2xl"
    };

    return <p className={`${styles[variant]} ${className}`}>{children}</p>;
};

export const Button = ({
    children,
    variant = 'primary',
    className = ''
}: {
    children: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'outline',
    className?: string
}) => {
    // UPDATED: Added subtle scale hover effect for "fancy" feel without libraries
    const base = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";

    const variants = {
        primary: "bg-foreground text-background hover:shadow-lg hover:shadow-accent/20",
        secondary: "bg-background-secondary text-foreground hover:bg-border-primary",
        outline: "border border-border-primary text-foreground hover:bg-background-secondary hover:border-foreground"
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};
