import mongoose from 'mongoose';

export interface ITeam extends mongoose.Document {
  name: string;
  leader: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  rankRequirement: string;
  description: string;
  createdAt: Date;
}

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Team name must be at least 3 characters long']
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  rankRequirement: {
    type: String,
    required: true,
    enum: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant']
  },
  description: {
    type: String,
    required: [true, 'Team description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ITeam>('Team', teamSchema); 