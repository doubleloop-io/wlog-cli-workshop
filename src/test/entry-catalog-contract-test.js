const { test } = require("mocha")
const assert = require("assert")
const assertEx = require("./assert-ex")
const bdate = require("../core/bdate")

module.exports = function(buildCatalogWith, buildEmptyCatalog) {
    test("add one entry", async () => {
        const newEntry = entry("entry 1", "2018-06-26")
        const entryCatalog = await buildEmptyCatalog()

        await entryCatalog.add(newEntry)

        const all = await entryCatalog.getAll()
        assertEx.containsRelax(newEntry, all)
    })

    test("get many entries", async () => {
        const entries = [
            entry("entry 1", "2018-06-26"),
            entry("entry 2", "2018-06-27"),
            entry("entry 3", "2018-06-28")
        ]
        const entryCatalog = await buildCatalogWith(entries)

        const all = await entryCatalog.getAll()

        assertEx.containsRelax(entries[0], all)
        assertEx.containsRelax(entries[1], all)
        assertEx.containsRelax(entries[2], all)
    })

    test("ordered", async () => {
        const entries = [
            entry("entry 2", "2018-06-27"),
            entry("entry 1", "2018-06-26"),
            entry("entry 3", "2018-06-28")
        ]
        const entryCatalog = await buildCatalogWith(entries)

        const all = await entryCatalog.getAll()

        assertEx.equalRelax(all[0], entries[2])
        assertEx.equalRelax(all[1], entries[0])
        assertEx.equalRelax(all[2], entries[1])
    })

    test("max number of entries", async () => {
        const entries = [
            entry("entry 2", "2018-06-27"),
            entry("entry 1", "2018-06-26"),
            entry("entry 3", "2018-06-28")
        ]
        const entryCatalog = await buildCatalogWith(entries)

        const all = await entryCatalog.getAll({ maxNoOfEntries: 2 })

        assert.equal(all.length, 2)
    })

    function entry(title, date) {
        return { title: title, date: bdate.parse(date) }
    }
}
