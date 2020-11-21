input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    refx = input.acceleration(Dimension.X)
    refy = input.acceleration(Dimension.Y)
    refz = input.acceleration(Dimension.Z)
    refa = input.acceleration(Dimension.Strength)
    refcos = (input.acceleration(Dimension.X) * refx + input.acceleration(Dimension.Y) * refy + input.acceleration(Dimension.Z) * refz) / (input.acceleration(Dimension.Strength) * refa)
    basic.pause(200)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
radio.onReceivedString(function (receivedString) {
    radioin = receivedString
    radiostring = "" + radiostring + radioin
    sema = true
})
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        . . # . .
        . . # . .
        # # # # #
        . . # . .
        . . # . .
        `)
    max = (input.acceleration(Dimension.X) * refx + input.acceleration(Dimension.Y) * refy + input.acceleration(Dimension.Z) * refz) / (input.acceleration(Dimension.Strength) * refa)
    clim = refcos - max
    basic.pause(200)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
let start = 0
let UNNE = false
let TILT = false
let cos = 0
let outputradio = ""
let clim = 0
let max = 0
let refcos = 0
let refa = 0
let refz = 0
let refy = 0
let refx = 0
let radioin = ""
let radiostring = ""
let sema = false
radio.setGroup(1)
radio.setTransmitPower(7)
radio.setFrequencyBand(0)
let linefeed = String.fromCharCode(10)
sema = false
radiostring = ""
radioin = ""
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (sema == true) {
        if (radiostring.substr(0, 4) == "COM?") {
            outputradio = "COM=" + input.compassHeading() + linefeed
            sema = true
        } else if (radiostring.substr(0, 4) == "ACC?") {
            outputradio = "ACC=" + input.acceleration(Dimension.Strength) + linefeed
            sema = true
        } else if (radiostring.substr(0, 4) == "TMP?") {
            outputradio = "TMP=" + input.temperature() + linefeed
            sema = true
        } else if (radiostring.substr(0, 4) == "ACX?") {
            outputradio = "ACX=" + input.acceleration(Dimension.X) + linefeed
            sema = true
        } else if (radiostring.substr(0, 4) == "REF!") {
            refx = input.acceleration(Dimension.X)
            refy = input.acceleration(Dimension.Y)
            refz = input.acceleration(Dimension.Z)
            refa = input.acceleration(Dimension.Strength)
            outputradio = "DONE" + linefeed
        } else if (radiostring.substr(0, 4) == "COS?") {
            outputradio = "" + cos + linefeed
            sema = true
        } else {
            outputradio = "????" + radioin + linefeed
            sema = true
        }
        radio.sendString(outputradio)
        sema = false
        radiostring = ""
    }
    cos = (input.acceleration(Dimension.X) * refx + input.acceleration(Dimension.Y) * refy + input.acceleration(Dimension.Z) * refz) / (input.acceleration(Dimension.Strength) * refa)
    if (cos < refcos - 0.8 * clim) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        TILT = true
    } else if (cos > refcos - 0.8 * clim && cos < refcos - 0.6 * clim) {
        basic.showLeds(`
            . # . # .
            # . . . #
            . . . . .
            # . . . #
            . # . # .
            `)
    } else if (cos > refcos - 0.6 * clim && cos < refcos - 0.4 * clim) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
    } else if (cos > refcos - 0.4 * clim && cos < refcos - 0.2 * clim) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # . # .
            . . # . .
            . . . . .
            `)
        if (TILT != true) {
            if (UNNE == true) {
                outputradio = "ZIEH" + linefeed
                UNNE = false
                radio.sendString(outputradio)
                start = input.runningTime()
            }
        }
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        UNNE = true
        TILT = false
    }
    if (TILT != true) {
        if (input.runningTime() - start >= 1500) {
            outputradio = "FALL" + linefeed
            radio.sendString(outputradio)
            start = input.runningTime()
        }
    }
})
