import { type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Button } from '../atoms/Button';
import { PageTitle } from '../atoms/Typography';
import { ChevronLeft } from 'lucide-react';
import styles from './Header.module.css';

type HeaderProps = {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    onBack?: () => void;
    action?: ReactNode;
} & ComponentProps<'header'>;

export function Header({ title, subtitle, showBack, onBack, action, className, ...props }: HeaderProps) {
    return (
        <header className={cn(styles.header, className)} {...props}>
            <div className={styles.left}>
                {showBack && (
                    <Button variant="ghost" className={styles.backButton} onClick={onBack}>
                        <ChevronLeft size={24} />
                    </Button>
                )}
                <div className={styles.titleContainer}>
                    <PageTitle className={styles.title}>{title}</PageTitle>
                    {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                </div>
            </div>

            {action && (
                <div className={styles.action}>
                    {action}
                </div>
            )}
        </header>
    );
}
