import express from 'express';
import Team from '../models/Team';
import { auth } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

// Create team
router.post('/', auth, async (req, res) => {
  try {
    const { name, rankRequirement, description } = req.body;
    
    const team = new Team({
      name,
      leader: req.user?.userId,
      members: [req.user?.userId],
      rankRequirement,
      description
    });

    await team.save();
    res.status(201).json(team);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('leader members', 'username');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username mainRole rank')
      .populate('members', 'username mainRole rank');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Join team
router.post('/:id/join', auth, async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check if user is already a member
    const memberId = new mongoose.Types.ObjectId(req.user.userId);
    const isMember = team.members.some(id => id.equals(memberId));
    
    if (isMember) {
      return res.status(400).json({ error: 'Already a member of this team' });
    }

    // Add member and save
    team.members.push(memberId);
    await team.save();

    // Return populated team data
    const updatedTeam = await Team.findById(team._id)
      .populate('leader', 'username')
      .populate('members', 'username');
      
    res.json(updatedTeam);
  } catch (error) {
    console.error('Join team error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 