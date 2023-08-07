import express from 'express';
import * as dotenv from 'dotenv'
import authServer from './routes/authRoute.js'
import shopRoute from './routes/shopRoute.js'
import cartRoute from './routes/cartRoute.js'
import { connectDB } from './config/db.js'
import { errorHandler } from './middleware/errorHandler.js';
import cookies from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

connectDB()
const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookies())
app.use('/api/user', authServer)
app.use('/api/shop', shopRoute)
app.use('/api/cart', cartRoute)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')))
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
	app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
