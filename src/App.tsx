import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AppShell } from './AppShell/AppShell';
import { BudgetScreen } from './BudgetScreen/BudgetScreen';
import { BackupScreen } from './BackupScreen/BackupScreen';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<BudgetScreen />} />
            <Route path="/backup" element={<BackupScreen />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App
