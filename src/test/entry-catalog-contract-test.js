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
        assertEx.contains(newEntry, all)
    })

    test("get many entries", async () => {
        const entries = [
            entry("entry 1", "2018-06-26"),
            entry("entry 2", "2018-06-27"),
            entry("entry 3", "2018-06-28")
        ]
        const entryCatalog = await buildCatalogWith(entries)

        const all = await entryCatalog.getAll()

        assertEx.contains(entries[0], all)
        assertEx.contains(entries[1], all)
        assertEx.contains(entries[2], all)
    })

    test("ordered", async () => {
        const entries = [
            entry("entry 2", "2018-06-27"),
            entry("entry 1", "2018-06-26"),
            entry("entry 3", "2018-06-28")
        ]
        const entryCatalog = await buildCatalogWith(entries)

        const all = await entryCatalog.getAll()

        assert.deepEqual(all[0], entries[2])
        assert.deepEqual(all[1], entries[0])
        assert.deepEqual(all[2], entries[1])
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
