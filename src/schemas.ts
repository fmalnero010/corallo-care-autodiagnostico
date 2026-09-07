import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Ingresá tu nombre completo')
    .max(80, 'Nombre demasiado largo'),
  email: z.string().trim().min(1, 'Ingresá tu email').email('Ingresá un email válido'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const genderSchema = z.enum(['mujer', 'hombre']);

export const letterSchema = z.enum(['A', 'B', 'C', 'D', 'E', 'F']);

export const sendResultRequestSchema = z.object({
  gender: genderSchema,
  result: z.string().min(1),
  answers: z.record(z.string(), z.string()),
  contact: contactSchema,
});

export type SendResultRequest = z.infer<typeof sendResultRequestSchema>;
