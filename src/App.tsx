import { useAppStore } from './store';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import AdminPage from './pages/AdminPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  const store = useAppStore();

  switch (store.page) {
    case 'landing': return <LandingPage store={store} />;
    case 'login': return <LoginPage store={store} />;
    case 'assessment': return <AssessmentPage store={store} />;
    case 'results': return <ResultsPage store={store} />;
    case 'admin': return <AdminPage store={store} />;
    case 'privacy': return <PrivacyPage store={store} />;
    default: return <LandingPage store={store} />;
  }
}

export default App
