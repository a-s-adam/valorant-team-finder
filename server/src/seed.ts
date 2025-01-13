import mongoose from 'mongoose';
import User from './models/User';
import Team from './models/Team';
import dotenv from 'dotenv';

dotenv.config();

const testUsers = [
  {
    username: "JettMain",
    email: "jett@test.com",
    password: "password123",
    rank: "Diamond",
    mainRole: "Duelist"
  },
  {
    username: "SageSupport",
    email: "sage@test.com",
    password: "password123",
    rank: "Immortal",
    mainRole: "Sentinel"
  },
  {
    username: "ViperPro",
    email: "viper@test.com",
    password: "password123",
    rank: "Ascendant",
    mainRole: "Controller"
  }
];

const testTeams = [
  {
    name: "Diamond Dragons",
    rankRequirement: "Diamond",
    description: "Looking for serious players to climb to Immortal",
    rolesNeeded: ["Controller", "Sentinel"]
  },
  {
    name: "Immortal Warriors",
    rankRequirement: "Immortal",
    description: "Competitive team seeking active players",
    rolesNeeded: ["Duelist", "Initiator"]
  },
  {
    name: "Ascendant Aces",
    rankRequirement: "Ascendant",
    description: "Casual but competitive team",
    rolesNeeded: ["Sentinel", "Controller"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});

    // Create users
    const createdUsers = await User.create(testUsers);
    console.log('Users created');

    // Create teams with references to users
    const teamsWithLeaders = testTeams.map((team, index) => ({
      ...team,
      leader: createdUsers[index]._id,
      members: [createdUsers[index]._id]
    }));

    await Team.create(teamsWithLeaders);
    console.log('Teams created');

    console.log('Database seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 