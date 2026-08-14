const { z } = require('zod')

exports.createProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  category: z.string().optional(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional()
})

exports.updateProjectSchema = exports.createProjectSchema.partial()
