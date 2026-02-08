import { type ComponentProps, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
    // Add specific props if needed
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={cn(styles.input, className)}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
