import * as faker from 'faker';

let id = 1;

let allEvents = Array.apply(null, { length: 300 }).map(() => {
    return {
        id: id++,
        name: faker.company.companyName(),
        place: faker.address.streetAddress(),
        date: faker.date.future()
    };
});

export const fetchEventsAPI = ({ query = '', offset = 0, limit = 50 } = {}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(allEvents.length)
            const fetchedEvents = allEvents
                .slice(offset, offset + limit)
                .filter(e => !query || e.name.indexOf(query) !== -1);
            resolve(fetchedEvents);
        }, 1000)
    });
}

export const addEventAPI = ({ name, place, date = new Date().toString() }) => {
    //console.log(name +"-"+ place +"-"+ date)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const event = {
                id: id++,
                name,
                place,
                date
            }
            console.log(event)
            console.log(allEvents)
            allEvents.unshift(event)
            resolve(event)
        }, 1000);
    })
}

export const removeEventById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            allEvents = allEvents.filter(event => event.id !== id)
            resolve()
        }, 1000);
    })
}

export const removeAllEventsAPI = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            allEvents = []
            resolve()
        }, 1000);
    })
}
