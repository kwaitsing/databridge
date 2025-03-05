import { MongoClient } from "mongodb"
import { createClient } from "redis"

export const connectDatabase = async (url: string) => {
    let isOnline: boolean = false
    console.log('> Connecting to the database')
    const client = new MongoClient(url);

    client.on('serverHeartbeatFailed', () => {
        console.log('> Reconnecting to the database');
        isOnline = false;
    });

    client.on('serverHeartbeatSucceeded', () => {
        if (!isOnline) {
            console.log('> Connected to the database');
        }
        isOnline = true;
    });

    try {
        await client.connect();
    } catch (error) {
        console.log(`> Error connecting to the database: ${error}`);
        throw error;
    }

    return client;
}
export const connectCache = async (url: string) => {
    const client = createClient({
        url: url
    });
    client.on('error', err => console.log('> Redis Client Error', err));
    const cache = await client.connect();
    return cache
}
export * from './interface'