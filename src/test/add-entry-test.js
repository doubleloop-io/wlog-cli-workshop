const { suite, test } = require("mocha")
const assertEx = require("./assert-ex")
const {
    makeEntryCatalog
} = require("../infrastructure/adapters/make-inmemory-entry-catalog")

/** TEST LIST
 * one entry
 * many entries
 * duplicate
 * ubiquity
 */

suite("add entry", () => {
    test("one valid entry", async () => {
        const entry = { title: "very important stuff" }
        const entryCatalog = makeEntryCatalog([])

        addEntry({ entryCatalog }, entry)

        const all = await entryCatalog.getAll()
        assertEx.contains(entry, all)
    })
})

function addEntry({ entryCatalog }, entry) {
    entryCatalog.add(entry)
}
