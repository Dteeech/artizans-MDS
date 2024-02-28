import { isLength } from 'validator'

const ValidateRegisterForm = (formData) => {
  const errors = {}

  if (typeof formData === 'object') {
    // checking first name
    if (!isLength(formData.firstName, { min: 2, max: undefined })) {
      errors.firstName = 'First name is invalid'
    }
    if (!isLength(formData.lastName, { min: 2, max: undefined })) {
      errors.lastName = 'Last name is invalid'
    } else {
      throw new Error('invalid parameter')
    }
  }
  return errors
}

export {
  ValidateRegisterForm
}
