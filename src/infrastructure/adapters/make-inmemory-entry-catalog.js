function makeEntryCatalog(entries = []) {
    return {
        async getAll() {
            return Promise.resolve(entries)
        }
    }
}

module.exports = { makeEntryCatalog }
