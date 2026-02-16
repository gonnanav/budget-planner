import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Providers } from './providers';
import { AppShell } from './components/AppShell';
import { BudgetScreen } from './components/BudgetScreen';
import { BackupScreen } from './components/BackupScreen';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<BudgetScreen />} />
            <Route path="/backup" element={<BackupScreen />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </Providers>
  );
}

export default App
