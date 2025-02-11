export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getTimeString,
    createPostTimeFormat
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = [
        'The sky',
        'above',
        'the port',
        'was',
        'the color of television',
        'tuned',
        'to',
        'a dead channel',
        '.',
        'All',
        'this happened',
        'more or less',
        '.',
        'I',
        'had',
        'the story',
        'bit by bit',
        'from various people',
        'and',
        'as generally',
        'happens',
        'in such cases',
        'each time',
        'it',
        'was',
        'a different story',
        '.',
        'It',
        'was',
        'a pleasure',
        'to',
        'burn'
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function getTimeString(date) {
    const time = new Date(date)
    return time.toLocaleTimeString('en-IL', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })
}

function createPostTimeFormat(date) {
    const now = new Date()
    const past = new Date(date)
    const diffInMs = now - past

    const msInMinute = 60 * 1000
    const msInHour = 60 * msInMinute
    const msInDay = 24 * msInHour
    const msInWeek = 7 * msInDay
    const msInMonth = 30 * msInDay // Approximation
    const msInYear = 365 * msInDay // Approximation

    if (diffInMs < msInHour) {
        const minutes = Math.round(diffInMs / msInMinute)
        return `${minutes}m`
    } else if (diffInMs < msInDay) {
        const hours = Math.round(diffInMs / msInHour)
        return `${hours}h`
    } else if (diffInMs < msInWeek) {
        const days = Math.round(diffInMs / msInDay)
        return `${days}d`
    } else if (diffInMs < msInMonth) {
        const weeks = Math.round(diffInMs / msInWeek)
        return `${weeks}w`
    } else if (diffInMs < msInYear) {
        const months = Math.round(diffInMs / msInMonth)
        return `${months}mo`
    } else {
        const years = Math.round(diffInMs / msInYear)
        return `${years}y`
    }
}
