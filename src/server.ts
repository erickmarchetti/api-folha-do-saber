import app from "./app"
import AppDataSource from "./data-source"
import "dotenv/config"

const init = async () => {
    await AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log("Servidor executando na porta " + PORT)
    })
}
init()
