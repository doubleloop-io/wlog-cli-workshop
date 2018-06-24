const assert = require("assert")
const R = require("ramda")

const prettyPrint = obj => JSON.stringify(obj, 2)

const partialContains = (entry, allEntries) =>
    R.any(R.flip(partialEqual)(entry), allEntries)

const partialEqual = (actual, expected) => {
    const keys = Object.keys(expected)
    const isEqual = R.equals(R.pick(keys, actual), expected)
    return isEqual
}

function contains(entry, allEntries) {
    const contains = (item, items) => {
        if (R.is(String, items))
            return R.contains(R.toLower(item), R.toLower(items))
        else return R.contains(item, items)
    }

    assert.ok(
        contains(entry, allEntries),
        `${prettyPrint(entry)} is not contained in ${prettyPrint(allEntries)}`
    )
}

function containsRelax(entry, allEntries) {
    const isContained = partialContains(entry, allEntries)

    assert.ok(
        isContained,
        `${prettyPrint(entry)} is not contained in ${prettyPrint(allEntries)}`
    )
}

function equalRelax(actual, expected) {
    assert.ok(
        partialEqual(actual, expected),
        `${prettyPrint(actual)} is not partially equal to ${prettyPrint(
            expected
        )}`
    )
}

function isEmpty(allEntries) {
    assert.ok(R.empty(allEntries), `${prettyPrint(allEntries)} is not empty`)
}

module.exports = { contains, isEmpty, equalRelax, containsRelax }
