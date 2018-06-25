function makeDisplay() {
    return {
        renderEntries(entries) {
            entries.forEach(e => {
                const line = `- ${e.title}`
                console.log(line)
            })
        },

        renderNoEntries() {
            console.log("no entries yet")
        }
    }
}

module.exports = { makeDisplay }
