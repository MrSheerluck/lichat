import { db } from "../db";
import { userSettings } from "../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto"

export async function upsertApiKey(userId: string, apiKey: string) {
    const [newApiKey] = await db.insert(userSettings).values({ id: crypto.randomUUID(), userId, geminiApiKey: apiKey }).onConflictDoUpdate({
        target: userSettings.userId,
        set: { geminiApiKey: apiKey }
    })
        .returning()

    return newApiKey
}


export async function getApiKey(userId: string) {
    const [settings] = await db.select().from(userSettings).where(eq(userSettings.userId, userId));
    return settings?.geminiApiKey || null;
}


export async function deleteApiKey(userId: string) {
    const [updated] = await db.update(userSettings)
        .set({ geminiApiKey: null })
        .where(eq(userSettings.userId, userId))
        .returning();
    return updated;
}

