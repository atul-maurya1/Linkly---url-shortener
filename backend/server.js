import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import redisClient from './config/redis.js'

dotenv.config();

app.get("/", (req, res) => {
	res.send("live"); 
});

const PORT = process.env.PORT;

connectDB().then( async () => {
	await redisClient.connect()
	app.listen(PORT, () => {
		console.log(`server is running at http://localhost:${PORT}`);
	});
})
.catch(() => {
    console.log("connection fail") 
})
