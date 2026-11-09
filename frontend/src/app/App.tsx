import { AppContent } from './AppContent';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
