import { model, Schema } from "mongoose";
import { IClient } from "./client.interface";

const ClientSchema = new Schema<IClient>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      whatsapp: {
        type: String,
        required: true,
        trim: true,
      },
      website: {
        type: String,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt
        versionKey: false,
    }
);

export const Client = model<IClient>('Client', ClientSchema);