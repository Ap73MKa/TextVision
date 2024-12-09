import { languages } from '@repo/models/types/lang-type'
import { z } from 'zod'

const MAX_FILE_SIZE = 12000000
const FILE_TYPES = ['png', 'jpeg', 'jpg']

const checkFileType = (file: File): boolean => {
  if (!file.name) return false
  const fileType = file.name.split('.').pop()?.toLowerCase()
  return fileType ? FILE_TYPES.includes(fileType) : false
}

const languageValues = languages.map((language) => language.value) as [
  string,
  ...string[],
]

const postCreateDtoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  language: z.enum(languageValues).default('eng'),
  photo: z
    .instanceof(File)
    .refine((file: File) => file.size !== 0, 'File is required')
    .refine((file) => file.size < MAX_FILE_SIZE, 'Max size is 12MB.')
    .refine(
      (file) => checkFileType(file),
      'Only .png, .jpeg formats are supported.'
    ),
})

export type PostCreateDto = z.infer<typeof postCreateDtoSchema>

export { postCreateDtoSchema }
