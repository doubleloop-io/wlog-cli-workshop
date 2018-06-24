/*
function deleteFile(fileName) {
    fs.existsSync(fileName) && fs.unlinkSync(fileName)
}

function writeFile(fileName, entries) {
    const json = JSON.stringify(entries)
    fs.writeFileSync(fileName, json, { encoding: "utf8", flag: "w" })
}

function readFile(fileName) {
    if (!fs.existsSync(fileName)) return []

    const json = fs.readFileSync(fileName, { encoding: "utf8", flag: "r" })
    return JSON.parse(json)
}

function getAll() {
    const sortByDate = R.pipe(
        R.sort((a, b) => bdate.compare(a.date, b.date),
        R.reverse
    )

    const limitResults = maxNoOfEntries
        ? R.take(maxNoOfEntries)
        : R.identity

    const results = R.pipe(
        sortByDate,
        limitResults
    )(innerEntries)

    return Promise.resolve(results)
}
*/
