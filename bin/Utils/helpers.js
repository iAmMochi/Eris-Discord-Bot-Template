"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
function getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minute = now.getMinutes();
    let hour = hours;
    let amORpm = `AM`;
    if (hour > 12) {
        amORpm = `PM`;
        hour = hour - 12;
    }
    return `${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`} ${amORpm}`;
}
exports.getTime = getTime;
//# sourceMappingURL=helpers.js.map