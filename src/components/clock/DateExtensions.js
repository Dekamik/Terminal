Date.monthName = function (monthNum) {
    let monthNames = {
        0: "Januari",
        1: "Februari",
        2: "Mars",
        3: "April",
        4: "Maj",
        5: "Juni",
        6: "Juli",
        7: "Augusti",
        8: "September",
        9: "Oktober",
        10: "November",
        11: "December"
    };
    return monthNames[monthNum];
}

Date.dayName = function (weekDayNum, singular = false) {
    let weekDayNames = {
        0: "Söndag",
        1: "Måndag",
        2: "Tisdag",
        3: "Onsdag",
        4: "Torsdag",
        5: "Fredag",
        6: "Lördag",
        7: "Söndag"
    };
    return weekDayNames[weekDayNum] + (singular ? "en" : "");
}

Date.dateSuffix = function (day) {
    let lastNumber = day.toString().slice(-1);
    if (lastNumber === "1" || lastNumber === "2") {
        return ":a";
    }
    else {
        return ":e";
    }
}
