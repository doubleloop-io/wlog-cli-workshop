const { suite } = require("mocha")
const contractTest = require("./entry-catalog-contract-test")

const {
    makeEntryCatalog
} = require("../infrastructure/adapters/make-nedb-entry-catalog")

suite.skip("nedb entry catalog", () => {
    const buildCatalogWith = entries => makeEntryCatalog(entries)
    const buildEmptyCatalog = () => makeEntryCatalog([])

    contractTest(buildCatalogWith, buildEmptyCatalog)
})
