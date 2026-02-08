import { type ReactNode } from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { Text, Caption } from '../atoms/Typography';
import { cn } from '@/utils/cn';
import styles from './StatCard.module.css';

interface StatCardProps {
    label: string;
    value: string | number;
    icon?: ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
    return (
        <GlassCard className={cn(styles.card, className)} contentClassName={styles.content}>
            <div className={styles.header}>
                <Caption className={styles.label}>{label}</Caption>
                {icon && <div className={styles.icon}>{icon}</div>}
            </div>

            <div className={styles.body}>
                <Text className={styles.value}>{value}</Text>
                {trend && (
                    <div className={cn(styles.trend, trend.isPositive ? styles.positive : styles.negative)}>
                        {trend.isPositive ? '+' : ''}{trend.value}%
                    </div>
                )}
            </div>
        </GlassCard>
    );
}
