import { model, Schema } from "mongoose";
import { ITechnology } from "./technology.interface";

const TechnologySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String, required: true },
    },
    { timestamps: true, versionKey: false } // This will automatically add createdAt and updatedAt

);

export const Technology = model<ITechnology>('Technology', TechnologySchema);