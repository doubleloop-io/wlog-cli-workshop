const Datastore = require("nedb")
const util = require("util")

function makeEntryCatalog({ filename }) {
    const db = new Datastore({ filename, autoload: true })
    db.insert = util.promisify(db.insert)
    //db.find = util.promisify(db.find)

    return {
        async getAll({ maxNoOfEntries } = {}) {
            return new Promise((resolve, reject) => {
                db.find({})
                    .sort({ "date.value": -1 })
                    .limit(maxNoOfEntries)
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
            })
        },

        async add(entry) {
            return db.insert(entry)
        }
    }
}

module.exports = { makeEntryCatalog }
