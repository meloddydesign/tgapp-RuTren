import { useState } from 'react';
import { Button } from './components/atoms/Button';
import { GlassCard } from './components/atoms/GlassCard';
import { Checkbox } from './components/atoms/Checkbox';
import { Switch } from './components/atoms/Switch';
import { SectionTitle, Text, Caption } from './components/atoms/Typography'; // Added Caption
import { Activity, Flame } from 'lucide-react';
import { FormInput } from './components/molecules/FormInput';
import { SearchInput } from './components/molecules/SearchInput';
import { StatCard } from './components/molecules/StatCard';
import { GoalCard } from './components/molecules/GoalCard';
import { SectionHeader } from './components/molecules/SectionHeader';
import { DayItem } from './components/molecules/DayItem'; // Kept for example
import { RestTimerCircle } from './components/molecules/RestTimerCircle';
import { Header } from './components/organisms/Header';
import { BottomNav } from './components/organisms/BottomNav';
import { WeeklyCalendarWidget } from './components/organisms/WeeklyCalendarWidget';
import { ExerciseCard } from './components/organisms/ExerciseCard';
import { WeightChart } from './components/molecules/WeightChart';
import styles from './App.module.css';

function App() {
  const [switched, setSwitched] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'train' | 'goals' | 'settings'>('home');

  return (
    <div className={styles.container}>
      {/* Global Header */}
      <Header
        title="RuTren UI Kit v0.4.1"
        subtitle="Библиотека Компонентов"
      />

      {/* --- ATOMS --- */}
      <section className={styles.section}>
        <SectionTitle>1. Атомы (Atoms)</SectionTitle>
        <Text className={styles.headerSubtitle}>Базовые кирпичики интерфейса</Text>

        <GlassCard contentClassName={styles.cardContentCol}>
          <Caption>Buttons</Caption>
          <div className={styles.buttonGroup}>
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="primary" size="sm">Small</Button>
          </div>

          <Caption>Controls</Caption>
          <div className={styles.inputGroup}>
            <Switch checked={switched} onCheckedChange={setSwitched} />
            <label className={styles.checkboxLabel}>
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              <Text>Checkbox</Text>
            </label>
          </div>
        </GlassCard>
      </section>

      {/* --- MOLECULES --- */}
      <section className={styles.section}>
        <SectionTitle>2. Молекулы (Molecules)</SectionTitle>
        <Text className={styles.headerSubtitle}>Составные элементы</Text>

        <section>
          <SectionHeader title="Inputs & Forms" />
          <GlassCard contentClassName={styles.cardContentCol}>
            <FormInput label="Email" placeholder="example@mail.com" />
            <FormInput label="Error State" placeholder="Wrong input" error="Ошибка валидации" />
            <SearchInput placeholder="Поиск..." />
          </GlassCard>
        </section>

        <section>
          <SectionHeader title="Cards" />
          <div className={styles.statsRow}>
            <StatCard label="Тренировки" value="12" icon={<Activity size={16} />} trend={{ value: 15, isPositive: true }} />
            <StatCard label="Калории" value="8400" icon={<Flame size={16} />} trend={{ value: 5, isPositive: false }} />
          </div>
          <div style={{ marginTop: 12 }}>
            <GoalCard title="Недельная цель" progress={60} current="3" target="5" />
          </div>
        </section>

        <section>
          <SectionHeader title="Interactive" />
          <div className={styles.timerContainer}>
            <RestTimerCircle secondsRemaining={30} totalSeconds={60} isActive={true} />
          </div>
        </section>
      </section>

      {/* --- ORGANISMS --- */}
      <section className={styles.section}>
        <SectionTitle>3. Организмы (Organisms)</SectionTitle>
        <Text className={styles.headerSubtitle}>Сложные самостоятельные блоки</Text>

        <GlassCard contentClassName={styles.cardContentCol}>
          <Caption>Header (Global)</Caption>
          <div style={{ border: '1px dashed rgba(255,255,255,0.2)', borderRadius: 12 }}>
            <Header title="Заголовок" subtitle="Подзаголовок страницы" showBack onBack={() => { }} />
          </div>
        </GlassCard>

        <div className={styles.cardContentCol}>
          <Caption>Weekly Calendar Widget</Caption>
          <WeeklyCalendarWidget />
        </div>

        <div className={styles.cardContentCol}>
          <Caption>Exercise Card (Expandable)</Caption>
          <ExerciseCard title="Жим лежа" sets={4} reps="8-10" />
          <ExerciseCard title="Приседания" sets={3} reps="12" subtitle="Акцент на квадрицепс" />
        </div>

        <div className={styles.cardContentCol}>
          <Caption>Weight History Chart</Caption>
          <WeightChart
            data={[
              { label: '09', value: 72 },
              { label: '10', value: 83 },
              { label: '11', value: 79 },
              { label: '12', value: 94 },
              { label: '13', value: 91 },
              { label: '14', value: 88 }
            ]}
          />
        </div>
      </section>

      {/* Spacer used to prevent content from being hidden behind BottomNav */}
      <div style={{ height: 100 }} />

      {/* Global Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
