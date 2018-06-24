/**
 * TEST LIST
 * - many entries
 * - no entries
 */
const { suite, test } = require("mocha")
const assertEx = require("./assert-ex")

suite("list entries", async () => {
    test("many entries", async () => {
        const entries = [
            { title: "entry 1" },
            { title: "entry 2" },
            { title: "entry 3" }
        ]
        const entryCatalog = makeInMemoryEntryCatalog(entries)
        const display = makeSpyDisplay()

        await listEntries({ entryCatalog, display })

        assertEx.contains(entries[0].title, display.text)
        assertEx.contains(entries[1].title, display.text)
        assertEx.contains(entries[2].title, display.text)
    })

    test("no entries", async () => {
        const entryCatalog = makeInMemoryEntryCatalog([])
        const display = makeSpyDisplay()

        await listEntries({ entryCatalog, display })

        assertEx.contains("no entries yet", display.text)
    })
})

function makeInMemoryEntryCatalog(entries) {
    return {
        async getAll() {
            return Promise.resolve(entries)
        }
    }
}

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

async function listEntries({ entryCatalog, display }) {
    const all = await entryCatalog.getAll()

    if (all.length) display.renderEntries(all)
    else display.renderNoEntries()
}
