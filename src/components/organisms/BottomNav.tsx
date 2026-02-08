import { type ComponentProps } from 'react';
import { cn } from '@/utils/cn';
import { GlassCard } from '../atoms/GlassCard';
import { TabItem } from '../molecules/TabItem';
import { Home, Activity, Trophy, Settings } from 'lucide-react';
import styles from './BottomNav.module.css';

type BottomNavProps = {
    activeTab?: 'home' | 'train' | 'goals' | 'settings';
    onTabChange?: (tab: 'home' | 'train' | 'goals' | 'settings') => void;
} & Omit<ComponentProps<typeof GlassCard>, 'children'>;

export function BottomNav({ activeTab = 'home', onTabChange, className, ...props }: BottomNavProps) {
    return (
        <GlassCard
            className={cn(styles.nav, className)}
            contentClassName={styles.content}
            noPadding
            {...props}
        >
            <TabItem
                icon={Home}
                isActive={activeTab === 'home'}
                onClick={() => onTabChange?.('home')}
            />
            <TabItem
                icon={Activity}
                isActive={activeTab === 'train'}
                onClick={() => onTabChange?.('train')}
            />
            <TabItem
                icon={Trophy}
                isActive={activeTab === 'goals'}
                onClick={() => onTabChange?.('goals')}
            />
            <TabItem
                icon={Settings}
                isActive={activeTab === 'settings'}
                onClick={() => onTabChange?.('settings')}
            />
        </GlassCard>
    );
}
