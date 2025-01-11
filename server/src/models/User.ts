import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  valorantUsername: string;
  valorantTag: string;
  currentRank: string;
  previousRank: string;
  stats: {
    kdr: number;
    winStreak: number;
    seasonWinRate: number;
    overallWinRate: number;
  };
  preferredRole: string;
  lookingFor: {
    type: string; // 'duo' | 'trio' | 'quad'
    active: boolean;
  };
  sessionCode?: string;
}

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  valorantUsername: { type: String, required: true },
  valorantTag: { type: String, required: true },
  currentRank: { type: String, required: true },
  previousRank: { type: String, required: true },
  stats: {
    kdr: { type: Number, required: true },
    winStreak: { type: Number, default: 0 },
    seasonWinRate: { type: Number, required: true },
    overallWinRate: { type: Number, required: true }
  },
  preferredRole: { type: String, required: true },
  lookingFor: {
    type: { type: String, enum: ['duo', 'trio', 'quad'], required: true },
    active: { type: Boolean, default: false }
  },
  sessionCode: { type: String, unique: true, sparse: true }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema); 