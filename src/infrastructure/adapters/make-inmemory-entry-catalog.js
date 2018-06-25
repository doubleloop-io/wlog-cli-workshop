function makeEntryCatalog(entries = []) {
    const clone = obj => ({ ...obj })
    const innerEntries = entries.map(clone)

    return {
        async getAll() {
            return Promise.resolve([...innerEntries])
        }
    }
}

module.exports = { makeEntryCatalog }
