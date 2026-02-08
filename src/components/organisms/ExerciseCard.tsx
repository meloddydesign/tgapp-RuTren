import { useState } from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { Text, SectionTitle, Caption } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { ChevronDown, ChevronUp, MoreHorizontal, Play, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { SetRow } from '../molecules/SetRow';
import styles from './ExerciseCard.module.css';

type ExerciseCardProps = {
    title: string;
    subtitle?: string;
    sets?: number;
    reps?: string;
}

type SetData = {
    id: number;
    weight: string;
    reps: string;
    isCompleted: boolean;
};

export function ExerciseCard({ title, subtitle, sets: initialSetsCount = 3, reps = "12" }: ExerciseCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Initialize sets with unique IDs
    const [sets, setSets] = useState<SetData[]>(
        Array.from({ length: initialSetsCount }).map((_, i) => ({
            id: Date.now() + i,
            weight: '50',
            reps: reps.replace(/\D/g, '') || '12',
            isCompleted: false
        }))
    );

    const handleUpdateSet = (id: number, field: keyof SetData, value: string | boolean) => {
        setSets(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleAddSet = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card toggle
        const lastSet = sets[sets.length - 1];
        const newSet: SetData = {
            id: Date.now(),
            weight: lastSet ? lastSet.weight : '0',
            reps: lastSet ? lastSet.reps : '0',
            isCompleted: false
        };
        setSets([...sets, newSet]);
    };

    const handleDeleteSet = (id: number) => {
        setSets(prev => prev.filter(s => s.id !== id));
    };

    return (
        <GlassCard className={styles.card} noPadding>
            <div className={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
                <div className={styles.info}>
                    <SectionTitle className={styles.title}>{title}</SectionTitle>
                    {subtitle && <Caption>{subtitle}</Caption>}
                </div>
                <div className={styles.actions}>
                    <div className={styles.meta}>
                        <Text className={styles.metaText}>{sets.length} x {reps}</Text>
                    </div>
                    <Button variant="ghost" className={styles.iconBtn}>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.content}
                    >
                        <div className={styles.setList}>
                            <AnimatePresence initial={false}>
                                {sets.map((set, index) => (
                                    <motion.div
                                        key={set.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <SetRow
                                            setNumber={index + 1}
                                            weight={set.weight}
                                            reps={set.reps}
                                            isCompleted={set.isCompleted}
                                            onDelete={() => handleDeleteSet(set.id)}
                                            onUpdate={(field, value) => handleUpdateSet(set.id, field as any, value)}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.footerLeft}>
                                <Button variant="ghost" size="sm" onClick={handleAddSet}>
                                    <Plus size={20} />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal size={20} />
                                </Button>
                            </div>

                            <Button variant="primary" size="sm" className={styles.startBtn}>
                                <Play size={16} fill="currentColor" /> Старт
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GlassCard>
    );
}
