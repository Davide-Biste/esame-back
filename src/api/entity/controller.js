import _ from "lodash";
import {
    authenticate,
    createEntity,
    createNewUser,
    getEntities,
    getUserReservations,
    reserve
} from "../../services/db/index.js";

export const actions = {
    createUser: async function ({ params, body}, res) {
        try {
            const createdUser = await createNewUser(body);
            return res.status(201).send(createdUser);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: error.message ?? error});
        }
        
    },
    login: async function ({params, body},res) {
        try {
            if (!body.email || !body.password) throw new Error("Email and password are required");
            return res.status(200).send(authenticate(body.email, body.password))
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: error.message ?? error});
        }
    },
    getAllEntities: async function ({params, body}, res){
        try{
            const entity = await getEntities();
            return res.status(200).send(entity)
        }
        catch(error){
            console.log(error);
            return res.status(500).send({message: error.message ?? error});
        }
    },
    createEntityBackoffice: async function ({params, body}, res){
        try{
            const entity = await createEntity(body);
            return res.status(200).send(entity)
        }
        catch(error){
            console.log(error);
            return res.status(500).send({message: error.message ?? error});
        }
    },
    postReservations: async function ({params, body}, res){
        try{
            const entity = await reserve(params.userId, params.entityId, body.products);
            return res.status(200).send(entity)
        }
        catch(error){
            console.log(error);
            return res.status(500).send({message: error.message ?? error});
        }
    },
    getReservations: async function ({ params }, res) {
        try {
            const reservations = await getUserReservations(params.userId);
            return res.status(200).send(reservations);
        }
        catch(error){
            console.log(error);
            return res.status(500).send({message: error.message ?? error});
        }
    }
}