import { MongoClient, Db } from 'mongodb'

// Patrón oficial MongoDB para Next.js:
// Cachear la promesa del cliente en globalThis para sobrevivir hot-reloads en dev
// y reutilizar conexiones entre invocaciones warm en producción (serverless).
declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined
}

function buildMongoUri(): string {
	const rawUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/'
	const password = process.env.MONGODB_PASSWORD

	if (rawUri.includes('<db_password>')) {
		if (!password) {
			throw new Error('Falta MONGODB_PASSWORD en .env.local para conectar con Atlas')
		}
		return rawUri.replace('<db_password>', encodeURIComponent(password))
	}

	return rawUri
}

function createClientPromise(): Promise<MongoClient> {
	const uri = buildMongoUri()

	const client = new MongoClient(uri, {
		// Serverless: pool pequeño, Next.js puede levantar múltiples instancias.
		// Cada instancia × maxPoolSize × nodos Atlas = conexiones totales en servidor.
		maxPoolSize: 5,
		// Liberar conexiones inactivas antes de que Atlas las cierre por timeout (10 min).
		maxIdleTimeMS: 60_000,
		// Fallo rápido si Atlas no responde en 10 s.
		connectTimeoutMS: 10_000,
		// Tiempo máximo para seleccionar un servidor del replica set.
		serverSelectionTimeoutMS: 10_000,
	})

	return client.connect()
}

const dbName = process.env.MONGODB_DB_NAME || 'blog'

function getClientPromise(): Promise<MongoClient> {
	if (!globalThis._mongoClientPromise) {
		const promise = createClientPromise()

		// Si la conexión falla, limpiar la caché para que el siguiente request reintente.
		promise.catch(() => {
			globalThis._mongoClientPromise = undefined
		})

		globalThis._mongoClientPromise = promise
	}

	return globalThis._mongoClientPromise
}

export async function db(): Promise<Db> {
	const client = await getClientPromise()
	return client.db(dbName)
}
