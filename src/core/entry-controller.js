async function listEntries({ entryCatalog, display }) {
    const all = await entryCatalog.getAll()

    if (all.length) display.renderEntries(all)
    else display.renderNoEntries()
}

module.exports = { listEntries }
