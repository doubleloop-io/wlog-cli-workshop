const { suite, test } = require("mocha")
const assertEx = require("./assert-ex")
const bdate = require("../core/bdate")

const {
    makeEntryCatalog
} = require("../infrastructure/adapters/make-inmemory-entry-catalog")

/** TEST LIST
 * ---- add one entry
 * - get many entries
 * - ordered
 * - get max number of entries
 */

suite("inmemory entry catalog", () => {
    test("add one entry", async () => {
        const newEntry = entry("entry 1", "2018-06-26")
        const entryCatalog = makeEntryCatalog([])

        await entryCatalog.add(newEntry)

        const all = await entryCatalog.getAll()
        assertEx.contains(newEntry, all)
    })

    test("get many entries", async () => {
        const entries = [
            entry("entry 1", "2018-06-26"),
            entry("entry 2", "2018-06-27"),
            entry("entry 3", "2018-06-28")
        ]
        const entryCatalog = makeEntryCatalog(entries)

        const all = await entryCatalog.getAll()
        assertEx.contains(entries[0], all)
        assertEx.contains(entries[1], all)
        assertEx.contains(entries[2], all)
    })
})

function entry(title, date) {
    return { title: title, date: bdate.parse(date) }
}
