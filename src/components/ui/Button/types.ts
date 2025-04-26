import { ButtonHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './buttonVariants';

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  to?: string;
}

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends ButtonBaseProps, ButtonVariantProps {} 