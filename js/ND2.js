document.addEventListener('DOMContentLoaded', function() {

    const EIA = [
        { name: "first", checkedValue: "" },
        { name: "second", checkedValue: "" },
        { name: "third", checkedValue: "" },
        { name: "one", checkedValue: "" },
        { name: "two", checkedValue: "" },
        { name: "three", checkedValue: "" }
    ];

    const multiplier = {
        'Z': 0.001,
        'Y': 0.01,
        'R': 0.01,
        'X': 0.1,
        'S': 0.1,
        'A': 1,
        'B': 10,
        'H': 10,
        'C': 100,
        'D': 1000,
        'E': 10000,
        'F': 100000
    }

    const resistorCode = {
        01: 100,
        02: 102,
        03: 105,
        04: 107,
        05: 110,
        06: 113,
        07: 115,
        08: 118,
        09: 121,
        10: 124,
        11: 127,
        12: 130,
        13: 133,
        14: 137,
        15: 140,
        16: 143,
        17: 147,
        18: 150,
        19: 154,
        20: 158,
        21: 162,
        22: 165,
        23: 169,
        24: 174,
        25: 178,
        26: 182,
        27: 187,
        28: 191,
        29: 196,
        30: 200,
        31: 205,
        32: 210,
        33: 215,
        34: 221,
        35: 226,
        36: 232,
        37: 237,
        38: 243,
        39: 249,
        40: 255,
        41: 261,
        42: 267,
        43: 274,
        44: 280,
        45: 287,
        46: 294,
        47: 301,
        48: 309,
        49: 316,
        50: 324,
        51: 332,
        52: 340,
        53: 348,
        54: 357,
        55: 365,
        56: 374,
        57: 383,
        58: 392,
        59: 402,
        60: 412,
        61: 422,
        62: 432,
        63: 442,
        64: 453,
        65: 464,
        66: 475,
        67: 487,
        68: 499,
        69: 511,
        70: 523,
        71: 536,
        72: 549,
        73: 562,
        74: 576,
        75: 590,
        76: 604,
        77: 619,
        78: 634,
        79: 649,
        80: 665,
        81: 681,
        82: 698,
        83: 715,
        84: 732,
        85: 750,
        86: 768,
        87: 787,
        88: 806,
        89: 825,
        90: 845,
        91: 866,
        92: 887,
        93: 909,
        94: 931,
        95: 954,
        96: 976
        }
      
    function updateCheckedValueEIA() {
        EIA.forEach(group => {
            const radioInput = document.getElementsByName(group.name);
      
            for (let i = 0; i < radioInput.length; i++) {
                if (radioInput[i].checked) {
                    group.checkedValue = radioInput[i].value;
                    break; 
                }
            }
        });

        var resistance = 0;
        var code = 0;
        EIA.forEach(group => {
            if (group.name === "first") {
                resistance = parseInt(group.checkedValue) * 10;
            } else if (group.name === "second") {
                if (group.checkedValue === "R") {
                resistance = resistance / 10;
                } else { resistance = resistance + parseInt(group.checkedValue); }
            } else if (group.name === "third") { 
                if(resistance<10) {
                resistance = resistance + parseInt(group.checkedValue) / 10;
            } else { resistance = resistance * (10 ** parseInt(group.checkedValue)); }}

            if(resistance<1000) {
                document.getElementById("answer").innerHTML = resistance + " ??";
                } else {document.getElementById("answer").innerHTML = resistance/1000 + " k??";}

            if(resistance == 0) {
                if (group.name === "one") {
                    code = parseInt(group.checkedValue) * 10;
                } else if (group.name === "two") {
                    code = code + parseInt(group.checkedValue);
                } else if (group.name === "three") {
                    resistance = resistorCode[code] * multiplier[group.checkedValue];
                }
    
                if(resistance<1000) {
                    document.getElementById("answer").innerHTML = resistance + " ??";
                    } else {document.getElementById("answer").innerHTML = resistance/1000 + " k??";}
            }
        });
    }
    

    EIA.forEach(group => {
        const radioInput = document.getElementsByName(group.name);
        radioInput.forEach(input => {
            input.addEventListener("click", updateCheckedValueEIA);
        });
      });

});
