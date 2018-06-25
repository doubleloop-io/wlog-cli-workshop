function makeEntryCatalog() {
    return {
        async getAll({ maxNoOfEntries } = {}) {
            return Promise.resolve([])
        },

        async add(entry) {
            return Promise.resolve()
        }
    }
}

module.exports = { makeEntryCatalog }
