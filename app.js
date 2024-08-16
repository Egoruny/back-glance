require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
 const models = require('./models/models')
const routes = require('./routes/index')
const cors = require('cors')

 const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',routes)



const start = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT,() => {
            console.log(`sever statrt on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()






























 async function clearTable() {
    try {
        await sequelize.sync({ force: true })
        console.log("Таблица очищена");
    } catch (error) {
        console.error('Ошибка при очистке таблицы:', error);
    }
}


// clearTable();