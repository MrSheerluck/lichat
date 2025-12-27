import type { Static } from "elysia";
import { chatMessageModel, chatRequestModel } from "../models/chat.model";

export type ChatMessage = Static<typeof chatMessageModel>;
export type ChatRequest = Static<typeof chatRequestModel>;