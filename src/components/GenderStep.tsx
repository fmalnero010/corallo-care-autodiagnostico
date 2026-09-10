import { useQuizStore } from '../store/useQuizStore';
import { useAutoFocus } from '../hooks/useAutoFocus';

export function GenderStep() {
  const selectGender = useQuizStore((s) => s.selectGender);
  const headingRef = useAutoFocus<HTMLHeadingElement>();

  return (
    <div className="card card-intro">
      <h1 ref={headingRef} tabIndex={-1}>
        Empecemos
      </h1>
      <p className="subtitle">Elegí una opción para continuar.</p>
      <div className="gender-options">
        <button type="button" className="option-card option-card-lg" onClick={() => selectGender('mujer')}>
          Mujer
        </button>
        <button type="button" className="option-card option-card-lg" onClick={() => selectGender('hombre')}>
          Hombre
        </button>
      </div>
    </div>
  );
}
