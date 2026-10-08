// What the contact API accepts. The form checks the same rules, so it never
// blocks something the API would take or sends something it would reject.

// WHATWG's pattern for type="email", the one browsers use
export const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// lengths of the trimmed values
export const LIMITS = {
    name: { min: 2, max: 100 },
    email: { max: 254 },
    message: { min: 10, max: 5000 },
}
