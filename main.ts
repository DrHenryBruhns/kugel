radio.onReceivedString(function (receivedString) {
    radiostring = receivedString
    outputradio = ""
    if (radiostring.substr(0, 4) == "COM?") {
        outputradio = "COM=" + input.compassHeading() + String.fromCharCode(linefeed)
        sema = true
    } else if (radiostring.substr(0, 4) == "ACC?") {
        outputradio = "ACC=" + input.acceleration(Dimension.Strength) + String.fromCharCode(linefeed)
        sema = true
    } else if (radiostring.substr(0, 4) == "TMP?") {
        radio.sendString("" + input.temperature() + String.fromCharCode(linefeed))
    } else if (radiostring.substr(0, 4) == "ACX?") {
        radio.sendString("" + input.acceleration(Dimension.X) + String.fromCharCode(linefeed))
    } else {
        radio.sendString("" + radiostring + "????" + String.fromCharCode(linefeed))
    }
})
let outputradio = ""
let radiostring = ""
let sema = false
let linefeed = 0
radio.setGroup(1)
radio.setTransmitPower(7)
radio.setFrequencyBand(0)
linefeed = 10
sema = false
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (sema == true) {
        radio.sendString(outputradio)
        sema = false
    }
})
