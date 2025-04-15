import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Link, LinkProps } from 'react-router-dom';
import { buttonVariants, type ButtonVariantProps } from './buttonVariants';
import { cn } from '@/lib/utils';

// Definir las props del componente
interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    ButtonVariantProps {
  asChild?: boolean;
  to?: string; // Prop para la ruta de react-router-dom
}

// Componente Button
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, to, ...props }, ref) => {
    // Si se proporciona 'to', usamos Link de react-router-dom
    if (to) {
      return (
        <Link
        {...(props as LinkProps)}
          to={to}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {props.children}
        </Link>
      );
    }

    // Si no hay 'to', usamos Slot o button según asChild
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;