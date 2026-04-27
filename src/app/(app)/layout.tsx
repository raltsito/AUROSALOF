import styles from './app.module.css'
import { BottomNav } from '@/components/layout/BottomNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <main className={styles.main}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
