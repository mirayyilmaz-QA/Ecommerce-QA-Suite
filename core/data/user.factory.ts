import { faker } from '@faker-js/faker';

export function createGuestUser() {
    return {
        email: faker.internet.email(),
        fName: faker.person.firstName(),
        lName: faker.person.lastName(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zip: faker.location.zipCode(),
        phone: faker.phone.number(),
        country: 'US',
        region: 'New York'
    };
}

export function createRegisteredUser() {
    return {
        account: {
            fName: faker.person.firstName(),
            lName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12 })
        },
        shipping: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            zip: faker.location.zipCode(),
            phone: faker.phone.number(),
            country: 'US',
            region: 'New York'
        }
    };
}
