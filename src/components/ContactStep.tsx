import { useForm } from '@tanstack/react-form';
import { useQuizStore } from '../store/useQuizStore';
import { contactSchema } from '../schemas';

export function ContactStep() {
  const setContact = useQuizStore((s) => s.setContact);
  const goBack = useQuizStore((s) => s.goBack);

  const form = useForm({
    defaultValues: { name: '', email: '' },
    validators: { onChange: contactSchema },
    onSubmit: ({ value }) => {
      setContact(value);
    },
  });

  return (
    <div className="card">
      <h2>Ya tenemos tu diagnóstico</h2>
      <p className="subtitle">Dejanos tu nombre y email para mostrarte el resultado y enviártelo por mail.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="name">
          {(field) => (
            <div className="field">
              <label htmlFor={field.name}>Nombre</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="name"
              />
              {field.state.meta.errors.length > 0 && (
                <span className="field-error">{field.state.meta.errors.map(String).join(', ')}</span>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div className="field">
              <label htmlFor={field.name}>Email</label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="email"
              />
              {field.state.meta.errors.length > 0 && (
                <span className="field-error">{field.state.meta.errors.map(String).join(', ')}</span>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button type="submit" className="primary-button" disabled={!canSubmit}>
              {isSubmitting ? 'Enviando...' : 'Ver mi resultado'}
            </button>
          )}
        </form.Subscribe>
      </form>
      <button type="button" className="link-button" onClick={goBack}>
        Volver
      </button>
    </div>
  );
}
