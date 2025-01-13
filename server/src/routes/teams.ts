import express from 'express';
import Team from '../models/Team';
import { auth } from '../middleware/auth';

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

// Join team
router.post('/:id/join', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.members.includes(req.user?.userId as any)) {
      return res.status(400).json({ error: 'Already a member of this team' });
    }

    team.members.push(req.user?.userId as any);
    await team.save();

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 