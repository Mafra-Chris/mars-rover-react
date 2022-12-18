import * as yup from 'yup'

export const roverSchema = yup.object().shape({
  row: yup.number().min(1).max(8).required(),
  col: yup.number().min(1).max(10).required(),
  position: yup.string().required(),
  instructions: yup.string().required(),
})