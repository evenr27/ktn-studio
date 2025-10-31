import { FormGitLikeStore } from '../form-git-like-store'
import { FormState, FormFieldState } from '../../state/form-state'

describe('FormGitLikeStore', () => {
  let store: FormGitLikeStore
  const initialFormState: FormState = {
    id: 'test-form',
    fields: {
      field1: {
        id: 'field1',
        isCreated: true,
        isEdited: false,
        isError: false,
        value: 'initial-value',
      },
    },
  }

  beforeEach(() => {
    store = new FormGitLikeStore(initialFormState)
  })

  describe('initialization', () => {
    it('should initialize with provided form state', () => {
      expect(store.getStashData()).toEqual(initialFormState)
      expect(store.getCommitData()).toEqual(initialFormState)
    })
  })

  describe('getFormId', () => {
    it('should return the form id from stash data', () => {
      expect(store.getFormId()).toBe('test-form')
    })
  })

  describe('stashFormField', () => {
    it('should update existing field with partial data', () => {
      store.stashFormField('field1', { value: 'updated-value' })

      const stash = store.getStashData()
      expect(stash.fields.field1.value).toBe('updated-value')
      expect(stash.fields.field1.id).toBe('field1')
    })

    it('should create new field if it does not exist', () => {
      store.stashFormField('field2', { value: 'new-field-value' })

      const stash = store.getStashData()
      expect(stash.fields.field2).toBeDefined()
      expect(stash.fields.field2.id).toBe('field2')
      expect(stash.fields.field2.value).toBe('new-field-value')
      expect(stash.fields.field2.isCreated).toBe(true)
      expect(stash.fields.field2.isEdited).toBe(false)
      expect(stash.fields.field2.isError).toBe(false)
    })

    it('should preserve existing field properties when updating', () => {
      store.stashFormField('field1', { isError: true })

      const stash = store.getStashData()
      expect(stash.fields.field1.isError).toBe(true)
      expect(stash.fields.field1.value).toBe('initial-value')
      expect(stash.fields.field1.isEdited).toBe(false)
    })

    it('should not affect commit data', () => {
      store.stashFormField('field1', { value: 'changed' })

      const commit = store.getCommitData()
      expect(commit.fields.field1.value).toBe('initial-value')
    })
  })

  describe('stashFormFieldValue', () => {
    it('should update field value and mark as edited', () => {
      store.stashFormFieldValue('field1', 'new-value')

      const stash = store.getStashData()
      expect(stash.fields.field1.value).toBe('new-value')
      expect(stash.fields.field1.isEdited).toBe(true)
    })

    it('should create new field with isEdited=true', () => {
      store.stashFormFieldValue('field3', 'created-value')

      const stash = store.getStashData()
      expect(stash.fields.field3).toBeDefined()
      expect(stash.fields.field3.value).toBe('created-value')
      expect(stash.fields.field3.isEdited).toBe(true)
      expect(stash.fields.field3.isCreated).toBe(true)
    })

    it('should support different value types', () => {
      store.stashFormFieldValue('numberField', 42)
      store.stashFormFieldValue('boolField', true)
      store.stashFormFieldValue('objectField', { key: 'value' })

      const stash = store.getStashData()
      expect(stash.fields.numberField.value).toBe(42)
      expect(stash.fields.boolField.value).toBe(true)
      expect(stash.fields.objectField.value).toEqual({ key: 'value' })
    })
  })

  describe('stashFormFieldObj', () => {
    it('should replace entire field object', () => {
      const newField: FormFieldState = {
        id: 'field1',
        isCreated: false,
        isEdited: true,
        isError: true,
        value: 'completely-new',
      }

      store.stashFormFieldObj(newField)

      const stash = store.getStashData()
      expect(stash.fields.field1).toEqual(newField)
    })

    it('should add new field from object', () => {
      const newField: FormFieldState = {
        id: 'field4',
        isCreated: true,
        isEdited: false,
        isError: false,
        value: 'object-field',
      }

      store.stashFormFieldObj(newField)

      const stash = store.getStashData()
      expect(stash.fields.field4).toEqual(newField)
    })
  })

  describe('commit', () => {
    it('should commit stashed changes and reset isEdited flags', () => {
      store.stashFormFieldValue('field1', 'committed-value')
      store.stashFormField('field2', { value: 'another-value' })

      store.commit()

      const stash = store.getStashData()
      const commit = store.getCommitData()

      // Both should have the same data
      expect(stash.fields.field1.value).toBe('committed-value')
      expect(commit.fields.field1.value).toBe('committed-value')

      // All fields should have isEdited = false
      expect(stash.fields.field1.isEdited).toBe(false)
      expect(commit.fields.field1.isEdited).toBe(false)
    })

    it('should reset isEdited for all fields on commit', () => {
      store.stashFormFieldValue('field1', 'value1')
      store.stashFormFieldValue('field2', 'value2')
      store.stashFormFieldValue('field3', 'value3')

      // All fields should be marked as edited
      const stashBefore = store.getStashData()
      expect(stashBefore.fields.field1.isEdited).toBe(true)
      expect(stashBefore.fields.field2.isEdited).toBe(true)
      expect(stashBefore.fields.field3.isEdited).toBe(true)

      store.commit()

      const stashAfter = store.getStashData()
      expect(stashAfter.fields.field1.isEdited).toBe(false)
      expect(stashAfter.fields.field2.isEdited).toBe(false)
      expect(stashAfter.fields.field3.isEdited).toBe(false)
    })

    it('should preserve form id after commit', () => {
      store.stashFormFieldValue('field1', 'new-value')
      store.commit()

      expect(store.getFormId()).toBe('test-form')
      expect(store.getStashData().id).toBe('test-form')
      expect(store.getCommitData().id).toBe('test-form')
    })
  })

  describe('discard', () => {
    it('should discard uncommitted changes', () => {
      store.stashFormFieldValue('field1', 'temporary-value')

      store.discard()

      const stash = store.getStashData()
      expect(stash.fields.field1.value).toBe('initial-value')
    })

    it('should restore to last committed state', () => {
      store.stashFormFieldValue('field1', 'committed-value')
      store.commit()

      store.stashFormFieldValue('field1', 'temporary-value')
      store.discard()

      const stash = store.getStashData()
      expect(stash.fields.field1.value).toBe('committed-value')
    })
  })

  describe('form workflow', () => {
    it('should support complete form editing workflow', () => {
      // Initial state
      expect(store.getStashData().fields.field1.value).toBe('initial-value')

      // User edits field
      store.stashFormFieldValue('field1', 'user-input')
      expect(store.getStashData().fields.field1.isEdited).toBe(true)

      // User commits (saves)
      store.commit()
      expect(store.getCommitData().fields.field1.value).toBe('user-input')
      expect(store.getStashData().fields.field1.isEdited).toBe(false)

      // User makes another change
      store.stashFormFieldValue('field1', 'another-change')
      expect(store.getStashData().fields.field1.isEdited).toBe(true)

      // User discards this change
      store.discard()
      expect(store.getStashData().fields.field1.value).toBe('user-input')
      expect(store.getStashData().fields.field1.isEdited).toBe(false)
    })

    it('should handle multiple fields independently', () => {
      store.stashFormFieldValue('field1', 'value1')
      store.stashFormFieldValue('field2', 'value2')

      store.commit()

      store.stashFormFieldValue('field1', 'changed1')
      store.discard()

      const stash = store.getStashData()
      expect(stash.fields.field1.value).toBe('value1')
      expect(stash.fields.field2.value).toBe('value2')
    })
  })

  describe('listeners', () => {
    it('should notify listeners on field changes', () => {
      const listener = jest.fn()
      store.subscribe(listener)

      store.stashFormFieldValue('field1', 'new-value')

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should notify listeners on commit', () => {
      const listener = jest.fn()
      store.stashFormFieldValue('field1', 'value')
      store.subscribe(listener)

      store.commit()

      expect(listener).toHaveBeenCalledTimes(1)
    })
  })
})
