import { useQuizStore } from './store/useQuizStore';
import { GenderStep } from './components/GenderStep';
import { QuestionStep } from './components/QuestionStep';
import { ContactStep } from './components/ContactStep';
import { ResultStep } from './components/ResultStep';
import './App.css';

function App() {
  const stage = useQuizStore((s) => s.stage);

  return (
    <main className="page">
      {stage === 'gender' && <GenderStep />}
      {stage === 'questions' && <QuestionStep />}
      {stage === 'contact' && <ContactStep />}
      {stage === 'result' && <ResultStep />}
    </main>
  );
}

export default App;
