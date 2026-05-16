import { Routes, Route } from 'react-router-dom';
import { AppShell } from './AppShell/AppShell';
import { BudgetScreen } from './BudgetScreen/BudgetScreen';
import { BackupScreen } from './BackupScreen/BackupScreen';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route index element={<BudgetScreen />} />
        <Route path="/backup" element={<BackupScreen />} />
      </Routes>
    </AppShell>
  );
}

export default App
