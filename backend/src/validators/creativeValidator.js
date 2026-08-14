const { z } = require('zod')

exports.createCreativeSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional()
})

exports.updateCreativeSchema = exports.createCreativeSchema.partial()
