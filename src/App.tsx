import { Routes, Route } from 'react-router-dom';
import { AppShell } from './AppShell/AppShell';
import { BudgetScreen } from './BudgetScreen/BudgetScreen';
import { SettingsScreen } from './SettingsScreen/SettingsScreen';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route index element={<BudgetScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </AppShell>
  );
}

export default App
