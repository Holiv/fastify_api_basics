let items = require("../Items")
const { getItems, getItem, addItem, deleteItem, updateItem } = require('../controllers/items.js')

//#region 

//Creating an object schema to validade the structure of the responses object.
//We can store the model in a variable and reuse it.
const Item = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'}
    }
}

//Model type that is going to returned in a GET request to the /items endpoint defined in the 'SCHEMA' property
//'HANDLER' property is responsible to execute the action
const getItemsOpt = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            }
        }
    },
    handler: getItems
}

//Model type that is going to be returned in a GET request to the /items/id endpoint
const getItemOpt = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItem
}

const addItemOpt = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            }
        },
        response: {
            201: Item
        }
    },
    handler: addItem
}

const deleteItemOpt = {
    schema: {
        response: {
            204: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            }
        }
    },
    handler: deleteItem
};

const updateItemOpt = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {type: 'string'}
            }
        },
        responde: {
            200: Item
        }
    },
    handler: updateItem
}

//#endregion


//Function to group all requests.
//It is a special function that is turned in a plugin and registered in the Fastfy app after being exported.
//This function accepts 3 paremeters, 'fastify', 'options' and 'done'. 
//At the end of it we must call the done() that is a function.

function itemRoutes(fastify, options, done) {

    //In the GET request structure we must obey parameters
    /*
        .1 - The Route
        .2 - The Type Schema returned in the answer
        .3 - Anonymous function that execute the requested action.
    */ 
    fastify.get("/items", getItemsOpt);
      
    fastify.get("/items/:id",getItemOpt);

    fastify.post('/items', addItemOpt);

    fastify.delete('/items/:id', deleteItemOpt);

    fastify.put('/items/:id', updateItemOpt);

    done();
}

module.exports = itemRoutes


