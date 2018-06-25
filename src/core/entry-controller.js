async function listEntries({ entryCatalog, display }) {
    const all = await entryCatalog.getAll()

    if (all.length) display.renderEntries(all)
    else display.renderNoEntries()
}

async function addEntry({ entryCatalog, display }, entry) {
    await entryCatalog.add(entry)

    display.renderEntryAdded(entry)
}

module.exports = { listEntries, addEntry }
