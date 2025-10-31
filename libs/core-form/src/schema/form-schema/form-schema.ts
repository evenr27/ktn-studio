export type FormSchemaNode = {
  id: string // unique inside the form
  field: string // "Form" | "Text" | "Select" | ...
  name?: string
  style?: Record<string, string>
  props?: Record<string, unknown>
  bindings?: Record<string, unknown>
  children?: FormSchemaNode[]
}

export type FormSchema = {
  id: string // id of the form itself
  type: 'form'
  root: FormSchemaNode
  meta?: Record<string, unknown>
}
