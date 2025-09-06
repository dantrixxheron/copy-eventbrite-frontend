import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().max(4000, 'La descripción no puede exceder 4000 caracteres').optional().or(z.literal('')),
  date: z.string().nonempty('La fecha es obligatoria'),
  venue: z.string().min(3, 'El lugar debe tener al menos 3 caracteres'),
  imageUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  seatMap: z.object({
    type: z.enum(['ga', 'grid']),
    rows: z.number().min(1, 'Debe haber al menos 1 fila'),
    cols: z.number().min(1, 'Debe haber al menos 1 columna'),
  }),
  price: z.number().nonnegative('El precio no puede ser negativo'),
  isPublished: z.boolean().optional(),
})