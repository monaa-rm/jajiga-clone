import jalaali from 'jalaali-js';

export function convertPersianDigitsToEnglish(str) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = str;

    for (let i = 0; i < persianDigits.length; i++) {
        const regex = new RegExp(persianDigits[i], 'g');
        result = result.replace(regex, englishDigits[i]);
    }

    return result;
}

export function formatPersianDateRange(dates) {
    if (!Array.isArray(dates) || dates.length !== 2) {
        throw new Error("Input must be an array of two dates");
    }

    const [start, end] = dates.map(date => convertPersianDigitsToEnglish(date));

    const startParts = start.split('/');
    const endParts = end.split('/');

    if (startParts.length !== 3 || endParts.length !== 3) {
        throw new Error("Invalid date format");
    }

    const startDate = {
        jy: parseInt(startParts[0], 10),
        jm: parseInt(startParts[1], 10),
        jd: parseInt(startParts[2], 10)
    };
    const endDate = {
        jy: parseInt(endParts[0], 10),
        jm: parseInt(endParts[1], 10),
        jd: parseInt(endParts[2], 10)
    };

    const startDay = startDate.jd;
    const startMonth = getPersianMonthName(startDate.jm);
    const endDay = endDate.jd;
    const endMonth = getPersianMonthName(endDate.jm);

    if (startDate.jm === endDate.jm) {
        return `${startDay} الی ${endDay} ${startMonth}`;
    } else {
        return `${startDay} ${startMonth} الی ${endDay} ${endMonth}`;
    }
}

function getPersianMonthName(monthNumber) {
    const monthNames = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    return monthNames[monthNumber - 1];
}

// مثال استفاده
const dates = ['۱۴۰۳/۰۴/۱۰', '۱۴۰۳/۰۴/۱۹'];
// console.log(formatPersianDateRange(dates)); // خروجی: "10 الی 19 تیر"
