/**
 * TEST LIST
 * - many entries
 * - no entries
 */
const { suite, test } = require("mocha")
const assertEx = require("./assert-ex")
const bdate = require("../core/bdate")
const { listEntries } = require("../core/entry-controller")
const { makeSpyDisplay } = require("./test-doubles")

const {
    makeEntryCatalog
} = require("../infrastructure/adapters/make-inmemory-entry-catalog")

suite("list entries", async () => {
    test("many entries", async () => {
        const entries = [
            entry("entry 1", "2018-06-26"),
            entry("entry 2", "2018-06-27"),
            entry("entry 3", "2018-06-28")
        ]
        const entryCatalog = makeEntryCatalog(entries)
        const display = makeSpyDisplay()

        await listEntries({ entryCatalog, display })

        assertEx.contains(entries[0].title, display.text)
        assertEx.contains(entries[1].title, display.text)
        assertEx.contains(entries[2].title, display.text)
    })

    test("no entries", async () => {
        const entryCatalog = makeEntryCatalog([])
        const display = makeSpyDisplay()

        await listEntries({ entryCatalog, display })

        assertEx.contains("no entries yet", display.text)
    })
})

function entry(title, date) {
    return { title: title, date: bdate.parse(date) }
}
