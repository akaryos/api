export const nodeENV = function (arg1: any, arg2: any) {
  return process.env.NODE_ENV ? arg1 : arg2
}
