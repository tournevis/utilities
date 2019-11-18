export const isString = s => {
  return typeof s === 'string'
}

export const isEmptyString = s => {
  return isString(s) && s.length === 0
}

export const isPhoneNumberValid = phone => {
  if (isEmptyString(phone)) return
  var regex = /^(0|\+33|\+32|\+352|\+41|\+262)[1-9]([-.\s]?[0-9]{2}){4}$/
  return regex.test(phone)
}

export const isPasswordLong = pass => {
  return !isEmptyString(pass) && pass.length > 3
}

export const isEmailValid = email => {
  if (isEmptyString(email)) return
  var regex = /(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})/
  return regex.test(email)
}
export const checkStringInputs = (inputs, obj) => {
  if (process.env.NODE_ENV !== 'production') return true
  return inputs.every(val => !isEmptyString(obj[val]))
}
