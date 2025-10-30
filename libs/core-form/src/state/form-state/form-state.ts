export type FieldValue = string | number | boolean | Record<string, unknown> | Array<unknown> | null

export type FormFieldState = {
  id: string // must match the schema node id
  isCreated: boolean
  isEdited: boolean
  isError: boolean
  value: FieldValue
}

export type FormState = {
  id: string // same as FormSchema.id
  fields: Record<string, FormFieldState>
}
