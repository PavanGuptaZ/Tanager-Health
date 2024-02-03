export const namePattern = /^(?=.{5,30}$)\b[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)?\b$/
export const emailPattern = /^(?=.{5,50}$)[A-Za-z0-9._%+-]{3,40}@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@&*#$!?])[\w@&*#$!?]{3,20}$/
export const relationPattern = /^(?=.{3,10}$)\b[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)?\b$/