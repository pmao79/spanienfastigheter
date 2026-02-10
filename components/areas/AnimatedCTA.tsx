'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AnimatedCTAProps {
    href: string;
    text: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'outline-white';
    size?: 'sm' | 'md' | 'lg';
    icon?: boolean;
    className?: string;
}

/**
 * Animated CTA Button with premium hover effects
 * Uses site colors: navy, sand, sage, alabaster
 */
export default function AnimatedCTA({
    href,
    text,
    variant = 'primary',
    size = 'md',
    icon = true,
    className = ''
}: AnimatedCTAProps) {
    const baseStyles = `
        relative overflow-hidden inline-flex items-center justify-center gap-2
        font-sans font-semibold uppercase tracking-widest
        transition-all duration-300 ease-out
        group cursor-pointer
        rounded-md
    `;

    const sizeStyles = {
        sm: 'px-5 py-2.5 text-[10px]',
        md: 'px-8 py-4 text-xs',
        lg: 'px-10 py-5 text-sm'
    };

    const variantStyles = {
        primary: `
            bg-sand text-navy
            hover:bg-navy hover:text-white
            before:absolute before:inset-0 before:bg-navy
            before:translate-x-[-101%] before:transition-transform before:duration-300
            hover:before:translate-x-0
        `,
        secondary: `
            bg-navy text-white
            hover:bg-sand hover:text-navy
            before:absolute before:inset-0 before:bg-sand
            before:translate-y-[101%] before:transition-transform before:duration-300
            hover:before:translate-y-0
        `,
        outline: `
            bg-transparent text-navy border-2 border-navy
            hover:bg-navy hover:text-white hover:border-navy
            before:absolute before:inset-0 before:bg-navy
            before:scale-x-0 before:transition-transform before:duration-300 before:origin-left
            hover:before:scale-x-100
        `,
        'outline-white': `
            bg-transparent text-white border-2 border-white
            hover:bg-white hover:text-navy hover:border-white
            before:absolute before:inset-0 before:bg-white
            before:scale-x-0 before:transition-transform before:duration-300 before:origin-left
            hover:before:scale-x-100
        `
    };

    return (
        <Link
            href={href}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        >
            {/* Text stays on top of the animation */}
            <span className="relative z-10 transition-colors duration-300">
                {text}
            </span>

            {icon && (
                <ArrowRight
                    size={size === 'lg' ? 18 : size === 'md' ? 16 : 14}
                    className="relative z-10 transition-all duration-300 group-hover:translate-x-1"
                />
            )}

            {/* Shine effect on hover */}
            <span className="
                absolute inset-0 z-20
                bg-gradient-to-r from-transparent via-white/20 to-transparent
                translate-x-[-200%] 
                group-hover:translate-x-[200%]
                transition-transform duration-700 ease-out
                pointer-events-none
            " />
        </Link>
    );
}

/**
 * Pulse CTA - Animated button with pulse effect
 */
export function PulseCTA({
    href,
    text,
    className = ''
}: {
    href: string;
    text: string;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={`
                relative inline-flex items-center justify-center gap-3
                px-8 py-4 bg-sand text-navy
                font-sans font-bold uppercase tracking-widest text-xs
                transition-all duration-300
                hover:bg-navy hover:text-white
                group cursor-pointer
                rounded-md
                ${className}
            `}
        >
            {/* Pulse rings */}
            <span className="absolute inset-0 animate-ping bg-sand/30 rounded-md opacity-0 group-hover:opacity-100" />
            <span className="absolute inset-0 animate-pulse bg-sand/20 rounded-md" style={{ animationDelay: '150ms' }} />

            <span className="relative z-10">{text}</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </Link>
    );
}

/**
 * Gradient Border CTA - Button with animated gradient border
 */
export function GradientBorderCTA({
    href,
    text,
    className = ''
}: {
    href: string;
    text: string;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={`
                relative inline-flex items-center justify-center gap-3
                px-8 py-4 
                font-sans font-bold uppercase tracking-widest text-xs
                text-navy bg-alabaster
                transition-all duration-300
                hover:text-white
                group cursor-pointer
                rounded-md
                ${className}
            `}
        >
            {/* Animated gradient border */}
            <span className="
                absolute inset-0 rounded-md
                bg-gradient-to-r from-navy via-sand to-sage
                p-[2px]
                animate-gradient-x
            ">
                <span className="
                    absolute inset-[2px] bg-alabaster
                    transition-all duration-300
                    group-hover:bg-navy
                " />
            </span>

            <span className="relative z-10">{text}</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </Link>
    );
}
