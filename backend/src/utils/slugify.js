const slugify = (str) => {
  if(!str) return ''
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

module.exports = slugify
