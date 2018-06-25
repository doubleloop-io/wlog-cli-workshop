function makeEntryCatalog(entries = []) {
    const clone = obj => {
        if (!obj.date) throw new Error("entry.date not set. Did you forget it?")
        return { ...obj }
    }
    let innerEntries = entries.map(clone)

    return {
        async getAll() {
            return Promise.resolve([...innerEntries])
        },

        async add(entry) {
            if (!entry.date)
                throw new Error("entry.date not set. Did you forget it?")

            innerEntries = [...innerEntries, entry]
        }
    }
}

module.exports = { makeEntryCatalog }
