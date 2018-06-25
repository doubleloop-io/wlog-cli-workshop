const { suite, test } = require("mocha")
const assertEx = require("./assert-ex")
const { makeSpyDisplay } = require("./test-doubles")
const { addEntry } = require("../core/entry-controller")
const bdate = require("../core/bdate")

const {
    makeEntryCatalog
} = require("../infrastructure/adapters/make-inmemory-entry-catalog")

/** TEST LIST
 * ---one entry
 * duplicate
 * ubiquity
 */

suite("add entry", () => {
    test("one valid entry", async () => {
        const newEntry = entry("very important stuff", "2018-06-26")
        const entryCatalog = await makeEntryCatalog([])
        const display = makeSpyDisplay()

        await addEntry({ entryCatalog, display }, newEntry)

        const all = await entryCatalog.getAll()
        assertEx.contains(newEntry, all)
        assertEx.contains(newEntry.title, display.text)
    })
})

function entry(title, date) {
    return { title: title, date: bdate.parse(date) }
}
