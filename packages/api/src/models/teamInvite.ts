import mongoose, { Schema } from 'mongoose';

export interface ITeamInvite {
  createdAt: Date;
  email: string;
  name?: string;
  teamId: string;
  token: string;
  updatedAt: Date;
}

const TeamInviteSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    name: String,
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

TeamInviteSchema.index({ teamId: 1, email: 1 }, { unique: true });

export default mongoose.model<ITeamInvite>('TeamInvite', TeamInviteSchema);
