import { useQuizStore } from './store/useQuizStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GenderStep } from './components/GenderStep';
import { QuestionStep } from './components/QuestionStep';
import { ContactStep } from './components/ContactStep';
import { ResultStep } from './components/ResultStep';
import './App.css';

function App() {
  const stage = useQuizStore((s) => s.stage);

  return (
    <div className="page">
      <Header />
      <main className="page-main" aria-live="polite">
        {stage === 'gender' && <GenderStep />}
        {stage === 'questions' && <QuestionStep />}
        {stage === 'contact' && <ContactStep />}
        {stage === 'result' && <ResultStep />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
