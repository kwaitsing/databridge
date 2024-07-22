import { MongoClient } from "mongodb"
import { createClient } from "redis"
import { logger } from "toolbx"

export const connectDatabase = async (url: string) => {
    let isOnline: boolean = false
    logger('> Connecting to the database', 4)
    const client = new MongoClient(url);

    client.on('serverHeartbeatFailed', () => {
        logger('> Reconnecting to the database', 3);
        isOnline = false;
    });

    client.on('serverHeartbeatSucceeded', () => {
        if (!isOnline) {
            logger('> Connected to the database', 1);
        }
        isOnline = true;
    });

    try {
        await client.connect();
    } catch (error) {
        logger(`> Error connecting to the database: ${error}`, 2);
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