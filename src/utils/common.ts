export function shallowCompare(A: Object, B: Object): boolean {
  return Object.keys(A).length === Object.keys(B).length 
  && (Object.keys(A) as (keyof typeof A)[]).every((key) => {
    return (Object.prototype.hasOwnProperty.call(B, key) && A[key] === B[key])
  })
}