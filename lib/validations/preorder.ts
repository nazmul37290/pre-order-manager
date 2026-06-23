import z from "zod";

export const PreOrderWhenEnum=['out-of-stock','regardless-of-stock']
export const PreOrderStatusEnum=['active','inactive']

export const preOrderSchema = z.object({
  name: z.string().min(1, 'Name is required'),

  products: z.coerce
    .number()
    .int()
    .min(1, 'Value must be minimum 1'),

  preOrderWhen: z.enum(PreOrderWhenEnum),

  startsAt: z.coerce.date({
    error: 'Starting date is required',
  }),

  endsAt: z.coerce.date().optional(),

  status: z.enum(PreOrderStatusEnum),
});