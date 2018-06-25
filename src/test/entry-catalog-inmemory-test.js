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
        const entry = { title: "entry 1" }
        const entryCatalog = makeEntryCatalog([])

        await entryCatalog.add(entry)

        const all = await entryCatalog.getAll()
        assertEx.contains(entry, all)
    })
})
