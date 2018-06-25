const R = require("ramda")

const getCurrentYear = () => new Date().getFullYear()
const getOrDefault = R.curry(
    (getDefaultValue, value) => value || getDefaultValue()
)
const getPart = (index, getDefaultValue) =>
    R.pipe(
        R.prop(index),
        parseInt,
        getOrDefault(getDefaultValue)
    )

function parse(text, locale) {
    if (text == "today") {
        const today = new Date()
        return create(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate()
        )
    }

    if (text == "yesterday") {
        const today = new Date()
        return create(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate() - 1
        )
    }

    if (isIsoDate(text)) {
        const parts = text.split("-")
        const year = parseInt(parts[0])
        const month = parseInt(parts[1])
        const day = parseInt(parts[2])

        return create(year, month, day)
    }

    if (locale === "it") {
        const parts = text.split("/")
        const year = getPart(2, getCurrentYear)(parts)
        const month = parseInt(parts[1])
        const day = parseInt(parts[0])

        return create(year, month, day)
    }

    throw new Error(`Invalid date format ${text} ${locale}`)
}

function create(year, month, day) {
    const isoDate = new Date(Date.UTC(year, month - 1, day)).toISOString()
    return {
        value: isoDate.split("T")[0]
    }
}

function compare(date1, date2) {
    const { value: value1 } = date1
    const { value: value2 } = date2

    if (value1 < value2) return -1
    if (value1 > value2) return 1
    return 0
}

function isIsoDate(date) {
    const regex = /\d{4}-(\d{2})-\d{2}/ //yyyy-mm-dd
    const matchedGroups = { month: 1 }
    const matches = regex.exec(date)

    return (
        matches &&
        matches.length &&
        parseInt(matches[matchedGroups.month]) <= 12
    )
}

module.exports = { parse, create, compare }
