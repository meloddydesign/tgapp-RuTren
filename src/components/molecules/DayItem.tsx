import { Text, Caption } from '../atoms/Typography';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import styles from './DayItem.module.css';

interface DayItemProps {
    day: string; // e.g., "Mon"
    date: number; // e.g., 12
    isActive?: boolean;
    hasDot?: boolean; // Indicator for event/workout
    onClick?: () => void;
    className?: string;
}

export function DayItem({ day, date, isActive, hasDot, onClick, className }: DayItemProps) {
    return (
        <button
            className={cn(styles.item, isActive && styles.active, className)}
            onClick={onClick}
        >
            <Caption className={cn(styles.day, isActive && styles.activeText)}>{day}</Caption>
            <div className={cn(styles.dateContainer, isActive && styles.activeDateContainer)}>
                <Text className={cn(styles.date, isActive && styles.activeText)}>{date}</Text>
                {isActive && (
                    <motion.div
                        layoutId="activeDayBackground"
                        className={styles.activeBackground}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </div>
            <div className={cn(styles.dot, (hasDot ? (isActive ? styles.activeDot : '') : styles.invisible))} />
        </button>
    );
}
