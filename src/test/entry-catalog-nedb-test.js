const { suite, beforeEach } = require("mocha")
const fs = require("fs")
const contractTest = require("./entry-catalog-contract-test")

const {
    makeEntryCatalog
} = require("../infrastructure/adapters/make-nedb-entry-catalog")

const dbName = "entries-test.db"

suite("nedb entry catalog", () => {
    beforeEach(() => {
        fs.existsSync(dbName) && fs.unlinkSync(dbName)
    })

    const buildCatalogWith = async entries => {
        const entryCatalog = await makeEntryCatalog({
            filename: dbName
        })

        await entries.forEach(entryCatalog.add)

        return entryCatalog
    }
    const buildEmptyCatalog = () => makeEntryCatalog([])

    contractTest(buildCatalogWith, buildEmptyCatalog)
})
