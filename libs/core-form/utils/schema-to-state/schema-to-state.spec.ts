import { collectSchemaNodeIds, createFormStateFromSchema } from '../schema-to-state/schema-to-state'
import { FormSchema, FormSchemaNode } from '../../schema/form-schema/form-schema'

describe('collectSchemaNodeIds', () => {
  it('should collect id from single node without children', () => {
    const node: FormSchemaNode = {
      id: 'node1',
      field: 'Text',
    }

    const ids = collectSchemaNodeIds(node)

    expect(ids).toEqual(['node1'])
  })

  it('should collect ids from node with children', () => {
    const node: FormSchemaNode = {
      id: 'parent',
      field: 'Form',
      children: [
        { id: 'child1', field: 'Text' },
        { id: 'child2', field: 'Select' },
      ],
    }

    const ids = collectSchemaNodeIds(node)

    expect(ids).toEqual(['parent', 'child1', 'child2'])
  })

  it('should collect ids recursively from nested children', () => {
    const node: FormSchemaNode = {
      id: 'root',
      field: 'Form',
      children: [
        {
          id: 'level1',
          field: 'Container',
          children: [
            { id: 'level2a', field: 'Text' },
            {
              id: 'level2b',
              field: 'Group',
              children: [{ id: 'level3', field: 'Input' }],
            },
          ],
        },
      ],
    }

    const ids = collectSchemaNodeIds(node)

    expect(ids).toEqual(['root', 'level1', 'level2a', 'level2b', 'level3'])
  })

  it('should handle node with empty children array', () => {
    const node: FormSchemaNode = {
      id: 'empty-parent',
      field: 'Form',
      children: [],
    }

    const ids = collectSchemaNodeIds(node)

    expect(ids).toEqual(['empty-parent'])
  })

  it('should maintain order of siblings', () => {
    const node: FormSchemaNode = {
      id: 'parent',
      field: 'Form',
      children: [
        { id: 'first', field: 'Text' },
        { id: 'second', field: 'Text' },
        { id: 'third', field: 'Text' },
      ],
    }

    const ids = collectSchemaNodeIds(node)

    expect(ids).toEqual(['parent', 'first', 'second', 'third'])
  })
})

describe('createFormStateFromSchema', () => {
  it('should create form state with correct id', () => {
    const schema: FormSchema = {
      id: 'test-form',
      type: 'form',
      root: {
        id: 'root',
        field: 'Form',
      },
    }

    const formState = createFormStateFromSchema(schema)

    expect(formState.id).toBe('test-form')
  })

  it('should create field states for all nodes', () => {
    const schema: FormSchema = {
      id: 'form1',
      type: 'form',
      root: {
        id: 'root',
        field: 'Form',
        children: [
          { id: 'field1', field: 'Text' },
          { id: 'field2', field: 'Select' },
        ],
      },
    }

    const formState = createFormStateFromSchema(schema)

    expect(Object.keys(formState.fields)).toHaveLength(3)
    expect(formState.fields.root).toBeDefined()
    expect(formState.fields.field1).toBeDefined()
    expect(formState.fields.field2).toBeDefined()
  })

  it('should create field states with default values', () => {
    const schema: FormSchema = {
      id: 'form2',
      type: 'form',
      root: {
        id: 'field1',
        field: 'Text',
      },
    }

    const formState = createFormStateFromSchema(schema)
    const field = formState.fields.field1

    expect(field.id).toBe('field1')
    expect(field.isCreated).toBe(true)
    expect(field.isEdited).toBe(false)
    expect(field.isError).toBe(false)
    expect(field.value).toBe('')
  })

  it('should handle nested schema structure', () => {
    const schema: FormSchema = {
      id: 'nested-form',
      type: 'form',
      root: {
        id: 'root',
        field: 'Form',
        children: [
          {
            id: 'section1',
            field: 'Section',
            children: [
              { id: 'input1', field: 'Text' },
              { id: 'input2', field: 'Text' },
            ],
          },
          {
            id: 'section2',
            field: 'Section',
            children: [{ id: 'input3', field: 'Select' }],
          },
        ],
      },
    }

    const formState = createFormStateFromSchema(schema)

    expect(Object.keys(formState.fields)).toHaveLength(6)
    expect(formState.fields.root).toBeDefined()
    expect(formState.fields.section1).toBeDefined()
    expect(formState.fields.section2).toBeDefined()
    expect(formState.fields.input1).toBeDefined()
    expect(formState.fields.input2).toBeDefined()
    expect(formState.fields.input3).toBeDefined()
  })

  it('should create independent field objects', () => {
    const schema: FormSchema = {
      id: 'form3',
      type: 'form',
      root: {
        id: 'root',
        field: 'Form',
        children: [
          { id: 'field1', field: 'Text' },
          { id: 'field2', field: 'Text' },
        ],
      },
    }

    const formState = createFormStateFromSchema(schema)

    // Modify one field
    formState.fields.field1.value = 'modified'

    // Other field should not be affected
    expect(formState.fields.field2.value).toBe('')
  })

  it('should preserve schema metadata in form state id', () => {
    const schema: FormSchema = {
      id: 'user-registration-form',
      type: 'form',
      root: {
        id: 'root',
        field: 'Form',
      },
      meta: {
        version: '1.0',
        author: 'test',
      },
    }

    const formState = createFormStateFromSchema(schema)

    expect(formState.id).toBe('user-registration-form')
  })

  it('should handle schema with deeply nested children', () => {
    const schema: FormSchema = {
      id: 'deep-form',
      type: 'form',
      root: {
        id: 'level0',
        field: 'Form',
        children: [
          {
            id: 'level1',
            field: 'Container',
            children: [
              {
                id: 'level2',
                field: 'Group',
                children: [
                  {
                    id: 'level3',
                    field: 'Section',
                    children: [{ id: 'level4', field: 'Input' }],
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const formState = createFormStateFromSchema(schema)

    expect(Object.keys(formState.fields)).toHaveLength(5)
    expect(formState.fields.level0).toBeDefined()
    expect(formState.fields.level4).toBeDefined()
  })
})

describe('integration: collectSchemaNodeIds + createFormStateFromSchema', () => {
  it('should create field state for each collected node id', () => {
    const schema: FormSchema = {
      id: 'integration-form',
      type: 'form',
      root: {
        id: 'root',
        field: 'Form',
        children: [
          { id: 'name', field: 'Text' },
          { id: 'email', field: 'Text' },
          { id: 'age', field: 'Number' },
        ],
      },
    }

    const collectedIds = collectSchemaNodeIds(schema.root)
    const formState = createFormStateFromSchema(schema)

    expect(Object.keys(formState.fields)).toEqual(collectedIds)

    collectedIds.forEach((id) => {
      expect(formState.fields[id]).toBeDefined()
      expect(formState.fields[id].id).toBe(id)
    })
  })
})
