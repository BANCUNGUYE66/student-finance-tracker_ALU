
export const regex = {
    description: /^\S(?:.*\S)?$/,
    amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
    duplicateWord: /\b(\w+)\s+\1\b/i,
};

/**
 * Validates a record object against the regex rules.
 * @param {object} record
 * @returns {{isValid: boolean, errors: object}}
 */
export function validateRecord(record) {
    const errors = {};

    if (!regex.description.test(record.description)) {
        errors.description = "Description cannot be empty or just spaces.";
    }
    if (regex.duplicateWord.test(record.description)) {
        errors.description = "Description contains a duplicate word.";
    }
    if (!regex.amount.test(record.amount)) {
        errors.amount = "Please enter a valid positive number.";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}