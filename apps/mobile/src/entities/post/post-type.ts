import { z } from 'zod'

const languageOptions = ['eng', 'rus'] as const

const MAX_FILE_SIZE = 12000000
const FILE_TYPES = ['png', 'jpeg', 'jpg']

const checkFileType = (file: File): boolean => {
  if (!file.name) return false
  const fileType = file.name.split('.').pop()?.toLowerCase()
  return fileType ? FILE_TYPES.includes(fileType) : false
}

const postCreateDtoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  language: z.enum(languageOptions).default('eng'),
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

export type PostDto = {
  name: string
  language: string
  id: string
  userId: string
  imagePath: string
  createdAt: Date
}

export { postCreateDtoSchema }
