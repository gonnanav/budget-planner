import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Providers } from './components/Providers';
import { AppShell } from './components/AppShell';
import { BudgetScreen } from './components/BudgetScreen';
import { DataManagementScreen } from './components/DataManagementScreen';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<BudgetScreen />} />
            <Route path="/data" element={<DataManagementScreen />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </Providers>
  );
}

export default App
