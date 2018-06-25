const R = require("ramda")
const bdate = require("../../core/bdate")

async function makeEntryCatalog(entries = []) {
    const clone = obj => {
        if (!obj.date) throw new Error("entry.date not set. Did you forget it?")
        return { ...obj }
    }
    let innerEntries = entries.map(clone)

    return {
        async getAll({ maxNoOfEntries } = {}) {
            const sortByDate = R.sort((a, b) => bdate.compare(b.date, a.date))

            const limitEntries = maxNoOfEntries
                ? R.take(maxNoOfEntries)
                : R.identity

            const applyAll = R.pipe(
                sortByDate,
                limitEntries
            )

            return Promise.resolve(applyAll(innerEntries))
        },

        async add(entry) {
            if (!entry.date)
                throw new Error("entry.date not set. Did you forget it?")

            innerEntries = [...innerEntries, entry]
        }
    }
}

module.exports = { makeEntryCatalog }
