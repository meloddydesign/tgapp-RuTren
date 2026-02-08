import { useState } from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { SectionHeader } from '../molecules/SectionHeader';
import { DayItem } from '../molecules/DayItem';
import styles from './WeeklyCalendarWidget.module.css';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function WeeklyCalendarWidget() {
    const [activeDay, setActiveDay] = useState(2); // Wednesday

    return (
        <section className={styles.container}>
            <SectionHeader title="Расписание" actionLabel="Все" />
            <GlassCard contentClassName={styles.row}>
                {DAYS.map((day, i) => (
                    <DayItem
                        key={day}
                        day={day}
                        date={12 + i}
                        isActive={i === activeDay}
                        hasDot={i % 2 === 0}
                        onClick={() => setActiveDay(i)}
                    />
                ))}
            </GlassCard>
        </section>
    );
}
