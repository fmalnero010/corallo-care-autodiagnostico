import { useQuizStore } from '../store/useQuizStore';

export function GenderStep() {
  const selectGender = useQuizStore((s) => s.selectGender);

  return (
    <div className="card">
      <h1>Autodiagnóstico de piel</h1>
      <p className="subtitle">Respondé unas preguntas rápidas y descubrí tu tipo de piel.</p>
      <div className="gender-options">
        <button type="button" className="option-card" onClick={() => selectGender('mujer')}>
          Mujer
        </button>
        <button type="button" className="option-card" onClick={() => selectGender('hombre')}>
          Hombre
        </button>
      </div>
    </div>
  );
}
