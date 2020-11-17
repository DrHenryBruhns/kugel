radio.onReceivedString(function (receivedString) {
    radiostring = receivedString
    if (radiostring.substr(0, 4) == "COM?") {
        radio.sendString("" + input.compassHeading() + String.fromCharCode(linefeed))
    } else if (radiostring.substr(0, 4) == "ACC?") {
        radio.sendString("" + input.acceleration(Dimension.Strength) + String.fromCharCode(linefeed))
    } else if (radiostring.substr(0, 4) == "TMP?") {
        radio.sendString("" + input.temperature() + String.fromCharCode(linefeed))
    } else if (radiostring.substr(0, 4) == "ACX?") {
        radio.sendString("" + input.acceleration(Dimension.X) + String.fromCharCode(linefeed))
    } else {
        radio.sendString("" + radiostring + " ?" + String.fromCharCode(linefeed))
    }
    radiostring = ""
})
let radiostring = ""
let linefeed = 0
radio.setGroup(1)
radio.setTransmitPower(7)
radio.setFrequencyBand(0)
linefeed = 10
basic.showIcon(IconNames.Yes)
