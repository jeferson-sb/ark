import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import WithField from '../examples/with-field.vue'
import ControlledComponentUnderTest from './controlled-editable.test.vue'

describe('Editable', () => {
  it('should render controlled component', async () => {
    render(ControlledComponentUnderTest)
  })

  it('should be possible to focus the placeholder and enter a value', async () => {
    render(ControlledComponentUnderTest)
    screen.getByText('Placeholder').focus()
    await user.type(screen.getByLabelText('editable input'), 'React', { delay: 10 })

    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to dbl click the placeholder to enter a value', async () => {
    render(ControlledComponentUnderTest, { props: { activationMode: 'dblclick' } })
    await user.dblClick(screen.getByText('Placeholder'))

    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'React', { delay: 10 })

    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to edit an existing value', async () => {
    render(ControlledComponentUnderTest, {
      props: { activationMode: 'dblclick', defaultValue: 'React' },
    })

    await user.dblClick(screen.getByText('React'))

    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'Solid', { delay: 10 })
    await user.click(screen.getByText('Save'))

    await screen.findByText('Solid')
  })

  it('should be possible to hide input if click EditableCancelTrigger ', async () => {
    render(ControlledComponentUnderTest, { props: { activationMode: 'dblclick' } })

    await user.dblClick(screen.getByText('Placeholder'))

    const input = screen.getByRole('textbox')
    expect(input).not.toHaveAttribute('hidden', '')

    const editableCancelTriggerButton = screen.getByRole('button', {
      name: 'cancel',
    })

    await user.click(editableCancelTriggerButton)

    expect(input).toHaveAttribute('hidden', '')
  })
})

describe('Editable / Field', () => {
  it('should set editable as required', async () => {
    render(WithField, { props: { required: true } })
    expect(screen.getByRole('textbox', { hidden: true })).toBeRequired()
  })

  it('should set editable as disabled', async () => {
    render(WithField, { props: { disabled: true } })
    expect(screen.getByRole('textbox', { hidden: true })).toBeDisabled()
  })

  it('should set editable as readonly', async () => {
    render(WithField, { props: { readOnly: true } })
    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(WithField)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(WithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should not display error text when no error is present', async () => {
    render(WithField)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
