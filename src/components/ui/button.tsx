import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Updated button variants to match the reference style
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60', // Increased rounding, added font-semibold, adjusted focus/disabled
  {
    variants: {
      variant: {
        default: // Main purple button style from reference
          'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 active:bg-primary/80 active:scale-[0.98]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80 active:scale-[0.98]',
        outline: // Adjusted outline style
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
        secondary: // Adjusted secondary style
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98]',
        ghost: // Adjusted ghost style
          'hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
        link: 'text-primary underline-offset-4 hover:underline active:opacity-80',
      },
      size: {
        default: 'h-11 px-6 py-2', // Increased height and padding for a bolder look
        sm: 'h-9 rounded-lg px-4 text-xs', // Adjusted small size
        lg: 'h-12 rounded-xl px-8', // Adjusted large size
        icon: 'h-10 w-10 rounded-lg', // Adjusted icon size
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };