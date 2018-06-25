function makeDisplay() {
    return {
        renderEntries(entries) {
            entries.forEach(e => {
                const line = `- ${e.title} ${e.date.value}`
                console.log(line)
            })
        },

        renderNoEntries() {
            console.log("no entries yet")
        },

        renderEntryAdded(entry) {
            console.log(`entry '${entry.title}' added`)
        }
    }
}

module.exports = { makeDisplay }
