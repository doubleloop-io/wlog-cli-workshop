const { suite, test } = require("mocha")
const assertEx = require("./assert-ex")
const { makeSpyDisplay } = require("./test-doubles")

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
        const display = makeSpyDisplay()

        addEntry({ entryCatalog, display }, entry)

        const all = await entryCatalog.getAll()
        assertEx.contains(entry, all)
        assertEx.contains(entry.title, display.text)
    })
})

function addEntry({ entryCatalog, display }, entry) {
    entryCatalog.add(entry)

    display.renderEntryAdded(entry)
}
