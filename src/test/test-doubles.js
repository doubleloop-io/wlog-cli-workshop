function makeSpyDisplay() {
    return {
        text: "",
        renderEntries(entries) {
            entries.forEach(e => {
                const line = `${e.title}\n`
                this.text += line
            })
        },

        renderNoEntries() {
            this.text += "no entries yet"
        }
    }
}

module.exports = { makeSpyDisplay }
