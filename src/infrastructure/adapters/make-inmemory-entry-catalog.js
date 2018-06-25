const R = require("ramda")
const bdate = require("../../core/bdate")

function makeEntryCatalog(entries = []) {
    const clone = obj => {
        if (!obj.date) throw new Error("entry.date not set. Did you forget it?")
        return { ...obj }
    }
    let innerEntries = entries.map(clone)

    return {
        async getAll() {
            const sortByDate = R.sort((a, b) => bdate.compare(b.date, a.date))
            const sorted = sortByDate(innerEntries)
            return Promise.resolve(sorted)

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
