import { FormSchema, FormSchemaNode } from '../../schema/form-schema/form-schema'
import { FormState, FormFieldState } from '../../state/form-state/form-state'

const createDefaultFieldState = (id: string): FormFieldState => ({
  id,
  isCreated: true,
  isEdited: false,
  isError: false,
  value: '',
})

export function collectSchemaNodeIds(node: FormSchemaNode): string[] {
  const ids: string[] = [node.id]
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      ids.push(...collectSchemaNodeIds(child))
    }
  }
  return ids
}

export function createFormStateFromSchema(schema: FormSchema): FormState {
  const ids = collectSchemaNodeIds(schema.root)

  return {
    id: schema.id,
    fields: Object.fromEntries(ids.map((fieldId) => [fieldId, createDefaultFieldState(fieldId)])),
  }
}
