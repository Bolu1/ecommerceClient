import mongoose from 'mongoose'

const connection = {}

async function connect(){
    if(connection.isConnected){
        console.log('Is connected')
        return
    }if(mongoose.connections.length>0){
        connection.isConnected = mongoose.connections[0].readyState
        if(connection.isConnected == 1){
            console.log('use prev connection')
            return
        }
        await mongoose.disconnect()
    }
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    })
    console.log('new connection')
    connection.isConnected = db.connections[0].readyState
}

async function disconnect(){
    if(connection.isConnected){
        if(process.env.Node_ENV == 'production'){
            await mongoose.disconnect()
            connection.isConnected = false
        }else{
            console.log('not disconnected')
        }
    }
}

function convertDocToObj(doc){
    doc._id = doc._id.toString()
    doc.createdAt = doc.createdAt.toSring()
    doc.updatedAt = doc.createdAt.toString()
    return doc
}

const db = {connect, disconnect}
export default db