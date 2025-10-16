/**
 * @param {string} query 
 * @param {Array<object>} records 
 * @returns {Array<object>}
 */
export function searchRecords(query, records) {
    if (!query) {
        return records.map(r => ({ ...r, highlightedDescription: r.description }));
    }
    
    let pattern;
    try {
        pattern = new RegExp(query, 'gi');
    } catch (e) {
        return [];
    }
    
    const results = records.filter(record => pattern.test(record.description));

    return results.map(record => ({
        ...record,
        highlightedDescription: record.description.replace(pattern, (match) => `<mark>${match}</mark>`)
    }));
}

/**
 * @param {Array<object>} records 
 * @param {string} key 
 * @param {'asc' | 'desc'} direction 
 * @returns {Array<object>} 
 */
export function sortRecords(records, key, direction = 'asc') {
    const sortedRecords = [...records];

    sortedRecords.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        let comparison = 0;
        if (valA > valB) {
            comparison = 1;
        } else if (valA < valB) {
            comparison = -1;
        }
        
        return direction === 'desc' ? comparison * -1 : comparison;
    });

    return sortedRecords;
}