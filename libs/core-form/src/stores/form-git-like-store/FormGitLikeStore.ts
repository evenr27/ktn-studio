import { GitLikeStore } from '@ktn/core/stores'
import { FormState, FormFieldState } from '../../state/form-state/form-state'

const DEFAULT_FIELD_STATE: Omit<FormFieldState, 'id'> = {
  isCreated: true,
  isEdited: false,
  isError: false,
  value: '',
}

export class FormGitLikeStore extends GitLikeStore<FormState> {
  constructor(formState: FormState) {
    super(formState)
  }

  getFormId(): string {
    return this.getStashData().id
  }

  private ensureField(fieldId: string): FormFieldState {
    const stash = this.getStashData()
    const current = stash.fields[fieldId]
    if (current) return current
    return {
      id: fieldId,
      ...DEFAULT_FIELD_STATE,
    }
  }

  /**
   * Stash partial data for a single form field (by id).
   */
  stashFormField(fieldId: string, patch: Partial<FormFieldState>): void {
    const stash = this.getStashData()
    const current = this.ensureField(fieldId)

    this.stash({
      fields: {
        ...stash.fields,
        [fieldId]: {
          ...current,
          ...patch,
          id: fieldId,
        },
      },
    })
  }

  /**
   * Stash only the value of a single form field (marks it as edited).
   */
  stashFormFieldValue(fieldId: string, value: FormFieldState['value']): void {
    const stash = this.getStashData()
    const current = this.ensureField(fieldId)

    this.stash({
      fields: {
        ...stash.fields,
        [fieldId]: {
          ...current,
          id: fieldId,
          value,
          isEdited: true,
        },
      },
    })
  }

  /**
   * Alternative: receive the full field object.
   */
  stashFormFieldObj(field: FormFieldState): void {
    const stash = this.getStashData()
    this.stash({
      fields: {
        ...stash.fields,
        [field.id]: field,
      },
    })
  }

  /**
   * On commit: every field must become isEdited = false.
   */
  override commit(): void {
    const stash = this.getStashData()

    const committedFields: Record<string, FormFieldState> = Object.fromEntries(
      Object.entries(stash.fields).map(([id, field]) => [
        id,
        {
          ...field,
          isEdited: false,
        },
      ])
    )

    const committed: FormState = {
      id: stash.id,
      fields: committedFields,
    }

    this.setState({
      stashData: committed,
      commitData: committed,
    })
  }
}
