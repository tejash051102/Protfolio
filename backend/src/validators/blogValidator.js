const { z } = require('zod')

exports.createBlogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().optional()
})

exports.updateBlogSchema = exports.createBlogSchema.partial()
