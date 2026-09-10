import { useQuizStore } from '../store/useQuizStore';
import { useAutoFocus } from '../hooks/useAutoFocus';

export function WelcomeStep() {
  const begin = useQuizStore((s) => s.begin);
  const headingRef = useAutoFocus<HTMLHeadingElement>();

  return (
    <div className="card card-intro">
      <h1 ref={headingRef} tabIndex={-1}>
        ¡Hola!
      </h1>
      <p className="subtitle">Queremos conocerte un poco más para acompañarte mejor.</p>
      <button type="button" className="primary-button" onClick={begin}>
        Comenzar
      </button>
    </div>
  );
}
