import mongoose, { Schema, Document } from "mongoose";

export interface Planner extends Document {
  name: string;
  entries: mongoose.Types.ObjectId[];
}

const PlannerSchema: Schema = new Schema({
  name: { type: String, required: true },
  entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }]
});

export const PlannerModel = mongoose.model<Planner>('Planner', PlannerSchema);
