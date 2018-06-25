function makeEntryCatalog(entries = []) {
    const clone = obj => ({ ...obj })
    let innerEntries = entries.map(clone)

    return {
        async getAll() {
            return Promise.resolve([...innerEntries])
        },

        async add(entry) {
            innerEntries = [...innerEntries, entry]
        }
    }
}

module.exports = { makeEntryCatalog }
