const { suite, test } = require("mocha")
const assert = require("assert")
const { parse, create } = require("../core/bdate")

suite("bdate", () => {
    test("parse iso date", () => {
        assert.deepEqual(parse("2018-01-31"), create(2018, 1, 31))
    })

    test("invalid iso date", () => {
        assert.throws(() => parse("01-31-2018"), Error)
    })

    test("parse date it locale", () => {
        assert.deepEqual(parse("31/01/2018", "it"), create(2018, 1, 31))
    })

    test("missing year", () => {
        assert.deepEqual(parse("31/01", "it"), create(2018, 1, 31))
    })

    test("today", () => {
        const today = new Date()
        assert.deepEqual(
            parse("today"),
            create(today.getFullYear(), today.getMonth() + 1, today.getDate())
        )
    })

    test("yesterday", () => {
        const today = new Date()
        assert.deepEqual(
            parse("yesterday"),
            create(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate() - 1
            )
        )
    })
})
