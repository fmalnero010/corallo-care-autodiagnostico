import { useForm } from '@tanstack/react-form';
import { useQuizStore } from '../store/useQuizStore';
import { contactSchema } from '../schemas';
import { IconChevronLeft } from './Icons';
import { useAutoFocus } from '../hooks/useAutoFocus';

export function ContactStep() {
  const setContact = useQuizStore((s) => s.setContact);
  const goBack = useQuizStore((s) => s.goBack);
  const headingRef = useAutoFocus<HTMLHeadingElement>([]);

  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: contactSchema },
    onSubmit: ({ value }) => {
      setContact(value);
    },
  });

  return (
    <div className="card">
      <h1 ref={headingRef} tabIndex={-1}>
        Ya tenemos tu diagnóstico
      </h1>
      <p className="subtitle">Dejanos tu nombre para mostrarte el resultado.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="name">
          {(field) => {
            const errorId = `${field.name}-error`;
            const hasError = field.state.meta.errors.length > 0;
            return (
              <div className="field">
                <label htmlFor={field.name}>Nombre</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  autoComplete="name"
                  className={hasError ? 'input-error' : undefined}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : undefined}
                />
                {hasError && (
                  <span id={errorId} className="field-error" role="alert">
                    {field.state.meta.errors.map(String).join(', ')}
                  </span>
                )}
              </div>
            );
          }}
        </form.Field>

        <p className="consent-note">
          Usamos tu nombre para identificar tu resultado y para que Corallo Care pueda contactarte con
          recomendaciones personalizadas para tu piel.
        </p>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button type="submit" className="primary-button" disabled={!canSubmit}>
              {isSubmitting ? 'Enviando...' : 'Ver mi resultado'}
            </button>
          )}
        </form.Subscribe>
      </form>
      <button type="button" className="link-button" onClick={goBack}>
        <IconChevronLeft className="link-button-icon" />
        Volver
      </button>
    </div>
  );
}
