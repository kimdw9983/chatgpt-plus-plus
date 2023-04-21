export function shallowCompare(A: Object, B: Object): boolean {
  return Object.keys(A).length === Object.keys(B).length 
  && (Object.keys(A) as (keyof typeof A)[]).every((key) => {
    return (Object.prototype.hasOwnProperty.call(B, key) && A[key] === B[key])
  })
}

/* Only JSON serializable can be deepcopied. 
 * Functions, Symbols, circular references will be lost during this process */
export function deepCopy(obj: Object): Object {
  return JSON.parse(JSON.stringify(obj))
}

export function uuidv4(): string {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: string) => {
    const charCode = parseInt(c)
    return ((charCode ^ crypto.getRandomValues(new Uint8Array(1))[0]) & (15 >> (charCode / 4))).toString(16)
  })
}

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development'
}