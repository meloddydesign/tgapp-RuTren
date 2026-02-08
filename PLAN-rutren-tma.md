# RuTren TMA: Детальный План Разработки (v6.2 - RU)

> **Цель**: Пошаговая инструкция с детальным описанием всех компонентов на русском языке.

---

## 📦 КОМПОНЕНТНАЯ АРХИТЕКТУРА

### 🧩 UI Components (Атомарные элементы)

#### GlassCard

**Назначение**: Базовый контейнер с эффектом glassmorphism для всех карточек.

**Props**:

```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg'; // 12px | 16px | 24px
}
```

**Стили** (`GlassCard.module.css`):

```css
.card {
  background: var(--glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: var(--padding-md);
}
```

**Использование**: Обертка для виджетов Главной (Dashboard), карточек упражнений, модальных окон.

---

#### NeonButton

**Назначение**: Основная кнопка с неоновым акцентом и тактильной отдачей.

**Props**:

```typescript
interface NeonButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode; // Lucide icon
}
```

**Логика**:

- При клике вызывает `lightHaptic()` из `useTelegram`
- Primary: неоновый фон (#D0FD3E), черный текст
- Secondary: прозрачный фон, неоновый border
- Ghost: без фона, только текст

**Стили**:

```css
.primary {
  background: var(--accent);
  color: #000;
  font-weight: 600;
  transition: transform 0.2s;
}
.primary:active {
  transform: scale(0.95);
}
```

---

#### WeightInput

**Назначение**: Специализированный инпут для ввода веса/повторов в зале.

**Props**:

```typescript
interface WeightInputProps {
  value: number | '';
  onChange: (value: number) => void;
  placeholder: string;
  unit?: 'kg' | 'reps';
  autoFocus?: boolean;
}
```

**Особенности**:

- `inputMode="decimal"` для мобильной клавиатуры
- `font-size: 32px` для удобства в зале
- Автофокус при монтировании
- Glassmorphism стиль

---

#### GlassySkeleton

**Назначение**: Анимированная заглушка при загрузке данных.

**Props**:

```typescript
interface GlassySkeletonProps {
  width?: string | number;
  height?: string | number;
  variant: 'card' | 'text' | 'circle' | 'button';
}
```

**Анимация**:

```css
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.6; }
}
```

---

### 🔧 Feature Components (Сложная логика)

#### WeekCalendar (Календарь недели)

**Назначение**: Горизонтальный календарь недели на Главной.

**Props**:

```typescript
interface WeekCalendarProps {
  workouts: Workout[]; // массив тренировок
  onDayClick: (date: Date) => void;
}
```

**Структура**:

- 7 дней (пн-вс)
- Индикатор тренировки (зеленая точка)
- Текущий день выделен неоновым border
- Горизонтальный скролл

**State**:

```typescript
const [selectedDate, setSelectedDate] = useState(new Date());
```

---

#### RestTimer (Таймер отдыха)

**Назначение**: Таймер отдыха между подходами.

**Props**:

```typescript
interface RestTimerProps {
  duration: number; // секунды
  onComplete: () => void;
  autoStart?: boolean;
}
```

**Логика**:

- Круговой SVG прогресс-бар
- Countdown от `duration` до 0
- При завершении: `successHaptic()` + `onComplete()`
- Кнопка "Пропустить"

**State**:

```typescript
const [timeLeft, setTimeLeft] = useState(duration);
const [isRunning, setIsRunning] = useState(autoStart);
```

---

#### WorkoutCard (Карточка тренировки)

**Назначение**: Карточка тренировки в истории.

**Props**:

```typescript
interface WorkoutCardProps {
  workout: Workout;
  onClick: () => void;
}
```

**Отображает**:

- Дата и время
- Тип тренировки (иконка)
- Тоннаж
- Калории
- Длительность

---

#### ExerciseRow (Строка упражнения)

**Назначение**: Строка упражнения в активной тренировке.

**Props**:

```typescript
interface ExerciseRowProps {
  exercise: Exercise;
  onAddSet: (weight: number, reps: number) => void;
  sets: Set[];
}
```

**Структура**:

- Название упражнения
- История подходов (вес x повторы)
- Кнопка "Добавить подход"

---

### 📱 Views (16 Экранов)

#### 1. Заставка (Splash)

**Компоненты**: Логотип (SVG), Framer Motion `<motion.div>`

**Логика**:

```typescript
useEffect(() => {
  const checkAuth = async () => {
    const user = await initUser();
    if (user.isNew) navigate('/onboarding');
    else navigate('/dashboard');
  };
  checkAuth();
}, []);
```

---

#### 2. Онбординг (Onboarding)

**Компоненты**: `WeightInput`, `NeonButton`, `GlassCard`

**State**:

```typescript
const [weight, setWeight] = useState('');
const [height, setHeight] = useState('');
const [goal, setGoal] = useState<'strength' | 'mass' | 'cut'>('strength');
```

**Валидация**: Вес > 30, Рост > 140

---

#### 3. Главная / Дашборд (Dashboard)

**Компоненты**: `GlassCard` (виджеты), `WeekCalendar`, `NeonButton`, Bottom Tabs

**Виджеты**:

1. **Калории**: Сумма за сегодня из `useWorkoutStore`
2. **Время**: Общая длительность тренировок
3. **Тоннаж**: Сумма (вес × повторы) всех подходов

**Bottom Tabs**:

- Главная (Домик)
- Тренировки (Гантеля)
- Профиль (Человечек)

---

#### 4. Активная тренировка (Active Workout)

**Компоненты**: `WeightInput`, `RestTimer`, `ExerciseRow`, `NeonButton`

**State**:

```typescript
const { activeWorkout, addSet, finishWorkout } = useWorkoutStore();
const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
const [weight, setWeight] = useState('');
const [reps, setReps] = useState('');
```

**Логика сохранения подхода**:

```typescript
const handleSaveSet = () => {
  mediumHaptic();
  addSet(currentExerciseIndex, { weight, reps, timestamp: Date.now() });
  setWeight('');
  setReps('');
  // Запуск RestTimer
};
```

---

#### 5. Итоги тренировки (Workout Summary)

**Компоненты**: `GlassCard`, `NeonButton`, PR Badge (если есть новые рекорды)

**Расчеты**:

```typescript
const totalTonnage = exercises.reduce((sum, ex) => 
  sum + ex.sets.reduce((s, set) => s + (set.weight * set.reps), 0), 0
);

const calories = calculateMET(workoutType, userWeight, duration);
```

---

#### 6-16. Остальные экраны

- **6. Список программ (Weeks List)**
- **7. Детали тренировки (Workout Detail)**
- **8. Библиотека упражнений (Exercise Library)**
- **9. История (History)**
- **10. Календарь (Calendar)**
- **11. Аналитика (Exercise Insights)**
- **12. Профиль и Рекорды (Profile & PRs)**
- **13. Замеры тела (Measurements)**
- **14. Привычки (Daily Habits)**
- **15. Настройки (Settings)**
- **16. Отзывы (Feedback)**

*(Каждый экран следует той же структуре: View.tsx + View.module.css + index.ts)*

---

## 📋 PHASE 1: Инициализация

### 1.1 Создание проекта Vite

- [ ] 1.1.1 `npm create vite@latest . -- --template react-ts`
- [ ] 1.1.2 Подтвердить перезапись
- [ ] 1.1.3 `npm install`

### 1.2 Установка пакетов

- [ ] 1.2.1 `npm install firebase`
- [ ] 1.2.2 `npm install zustand zustand-persist`
- [ ] 1.2.3 `npm install @twa-dev/sdk`
- [ ] 1.2.4 `npm install lucide-react`
- [ ] 1.2.5 `npm install framer-motion`

### 1.3 Структура папок

- [ ] 1.3.1-8 Создать все папки (`api`, `components/ui`, `components/features`, `views`, `store`, `styles`, `types`, `utils`)

### 1.4 Firebase Setup

- [ ] 1.4.1 Создать `firebase.ts` с конфигом
- [ ] 1.4.2 `.env.local` с ключами
- [ ] 1.4.3 Добавить в `.gitignore`

### 1.5 CSS Variables

- [ ] 1.5.1 Создать `variables.css` со всеми токенами
- [ ] 1.5.2 Импортировать в `main.tsx`

---

## 📋 PHASE 2: UI Components

### 2.1 GlassCard

- [ ] 2.1.1 Создать папку + файлы
- [ ] 2.1.2 Реализовать props интерфейс
- [ ] 2.1.3 Glassmorphism стили

### 2.2 NeonButton

- [ ] 2.2.1 Создать папку + файлы
- [ ] 2.2.2 3 варианта (primary/secondary/ghost)
- [ ] 2.2.3 Haptic integration

### 2.3 WeightInput

- [ ] 2.3.1 Создать папку + файлы
- [ ] 2.3.2 Крупный шрифт + decimal keyboard

### 2.4 GlassySkeleton

- [ ] 2.4.1 Создать папку + файлы
- [ ] 2.4.2 Пульсирующая анимация

### 2.5 Telegram SDK

- [ ] 2.5.1 `useTelegram` hook
- [ ] 2.5.2 Интеграция в `App.tsx`

---

## 📋 PHASE 3: State & Data

### 3.1 TypeScript Types

- [ ] 3.1.1 `user.ts` (Пользователь)
- [ ] 3.1.2 `workout.ts` (Тренировка, Упражнение, Подход)
- [ ] 3.1.3 `metrics.ts` (Замеры)

### 3.2 Zustand Stores

- [ ] 3.2.1 `useAuthStore` (Авторизация)
- [ ] 3.2.2 `useWorkoutStore` (Логика тренировки)
- [ ] 3.2.3 `useMetricsStore` (Замеры)

### 3.3 Firebase Listeners

- [ ] 3.3.1 `listenToWorkouts`
- [ ] 3.3.2 `listenToMetrics`
- [ ] 3.3.3 `listenToWeeks`

---

## 📋 PHASE 4: Views (Сборка экранов)

### 4.1-4.5 Приоритетные экраны

- [ ] 4.1 Заставка (Splash)
- [ ] 4.2 Онбординг (Onboarding)
- [ ] 4.3 Главная (Dashboard)
- [ ] 4.4 Активная тренировка (Active Workout)
- [ ] 4.5 Итоги тренировки (Summary)

### 4.6-4.16 Остальные экраны

- [ ] 4.6-4.16 Сборка оставшихся экранов

---

## 📋 PHASE 5: Polish (Полировка)

### 5.1 Haptics (Вибрации)

- [ ] 5.1.1 `haptics.ts` утилита
- [ ] 5.1.2 Интеграция в кнопки

### 5.2 Error Boundaries (Обработка ошибок)

- [ ] 5.2.1 `ErrorBoundary.tsx`
- [ ] 5.2.2 Обернуть все Views

### 5.3 Animations (Анимации)

- [ ] 5.3.1 Page transitions
- [ ] 5.3.2 Hover effects

### 5.4 Testing (Тесты)

- [ ] 5.4.1-6 Lint, TypeScript, Build, Telegram test

---

**План разработки RuTren v6.2 (RU) утвержден и готов к старту!** 🚀
