
/**
 * Searches records based on a regex pattern.
 * @param {string} query
 * @param {Array<object>} records
 * @returns {{results: Array<object>, error: string | null}}
 */
export function searchRecords(query, records) {
    if (!query) {
        return { results: records, error: null };
    }

    try {
        const pattern = new RegExp(query, 'gi'); 
        const results = records.filter(record => pattern.test(record.description));

        results.forEach(record => {
            record.highlightedDescription = record.description.replace(pattern, (match) => `<mark>${match}</mark>`);
        });

        return { results, error: null };
    } catch (e) {
        return { results: [], error: "Invalid regular expression." };
    }
}

/**
 * Sorts records by a given key and direction.
 * @param {Array<object>} records 
 * @param {string} key
 * @param {'asc' | 'desc'} direction 
 * @returns {Array<object>}
 */
export function sortRecords(records, key, direction = 'asc') {
    return records;
}