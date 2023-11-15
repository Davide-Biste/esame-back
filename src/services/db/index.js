import _ from "lodash"
import fs from "fs";
import { v4 } from "uuid";


const db = JSON.parse(fs.readFileSync("./src/services/db/database.json", "utf8"));

// region User

export async function createNewUser (body) {
    if(!body.email || !body.password) throw new Error("Email and password are required");
    if(_.find(db.users, user => user.email === body.email)) throw new Error("Email already taken");
    //In caso altri filtri
    body.id = v4();

    db.users.push(body);
    fs.writeFileSync("./src/services/db/database.json", JSON.stringify(db));
    return _.find(db.users, user => user.email === body.email);
}

export function authenticate (email, password) {
    const user = _.find(db.users, user => _.isEqual(email, user.email) && _.isEqual(password, user.password))
    if (_.isNil(user)) {
        throw new Error("Authentication failed");
    }
    return user;
}

// endregion

// region Entity

export function getEntities () {
    // filtri se necessari
    return db.entities;
}

export function createEntity (body) {
    const entity = {
        name: body.name,
        address: body.address,
        type: body.type,
        id: v4(),
        products: body.products,
        range: body.range,
    }

    db.entities.push(entity);
    fs.writeFileSync("./src/services/db/database.json", JSON.stringify(db));
    return entity;
}

// endregion

export function reserve (userId, entityId, products = []) {
    const existingReservation = _.find(db.reservations, reservation => {
        _.isEqual(reservation.userId, userId) && _.isEqual(reservation.entityId, entityId)
    });

    if (!_.isNil(existingReservation)) {
        throw new Error("You already have a reservation for this entity")
    }

    const reservation = {
        entityId: entityId,
        userId: userId,
        id: v4(),
        date: new Date(),
        products: products,
        total: _.reduce(products, (acc, product) => acc + (product.price * product.quantity || 1), 0)
    }

    db.reservations.push(reservation);
    fs.writeFileSync("./src/services/db/database.json", JSON.stringify(db));
    return _.find(db.reservations, res => _.isEqual(res.id, reservation.id));
}

export function getUserReservations (userId) {
    return _.filter(db.reservations, res => _.isEqual(res.userId, userId));
}