const { suite, test } = require("mocha")
const assertEx = require("./assert-ex")
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
        const newEntry = entry("entry 1")
        const entryCatalog = makeEntryCatalog([])

        await entryCatalog.add(newEntry)

        const all = await entryCatalog.getAll()
        assertEx.contains(newEntry, all)
    })

    test("get many entries", async () => {
        const entries = [entry("entry 1"), entry("entry 2"), entry("entry 3")]
        const entryCatalog = makeEntryCatalog(entries)

        const all = await entryCatalog.getAll()
        assertEx.contains(entries[0], all)
        assertEx.contains(entries[1], all)
        assertEx.contains(entries[2], all)
    })
})

function entry(title) {
    return { title: title }
}
