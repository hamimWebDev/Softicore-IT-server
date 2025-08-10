import { model, Schema } from 'mongoose';
import { ITeam } from './team.interface';


const TeamSchema: Schema = new Schema<ITeam>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      position: { type: String, required: true },
      image: { type: String, required: true },
      facebook: { type: String, required: true },
      linkedin: { type: String, required: true },
      github: { type: String, required: true },
    },
    {
      timestamps: true, // Automatically manages createdAt and updatedAt
      versionKey: false,
    }
  );

  export const Team = model<ITeam>('Team', TeamSchema);