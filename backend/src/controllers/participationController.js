import Petition from '../models/Petition.js';
import PublicPoll from '../models/PublicPoll.js';
import Consultation from '../models/Consultation.js';
import User from '../models/User.js';
import Leader from '../models/Leader.js';

export async function getParticipationHub(req, res) {
  try {
    const petitions = await Petition.find().sort({ createdAt: -1 }).limit(12).lean();
    const polls = await PublicPoll.find({ active: true }).sort({ createdAt: -1 }).lean();
    const consultations = await Consultation.find({ open: true }).sort({ createdAt: -1 }).lean();

    const leaders = await Leader.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.json({
      data: {
        petitions,
        polls,
        consultations,
        leaders: leaders.map((leader) => ({
          id: leader._id,
          office: leader.office,
          name: leader.name,
          party: leader.party || leader.department || '',
        })),
      },
    });
  } catch (error) {
    console.error('getParticipationHub error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function createPetition(req, res) {
  try {
    const { title, description, targetOffice, areaId } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const petition = await Petition.create({
      title,
      description,
      targetOffice,
      areaId: areaId || null,
      createdBy: req.user?._id || null,
      status: 'Open',
    });

    return res.status(201).json({
      message: 'Petition submitted successfully',
      data: petition,
    });
  } catch (error) {
    console.error('createPetition error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function votePoll(req, res) {
  try {
    const { pollId } = req.params;
    const { option } = req.body;

    if (!option) {
      return res.status(400).json({ message: 'Option is required' });
    }

    const poll = await PublicPoll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (!Array.isArray(poll.results)) {
      poll.results = [];
    }

    const existing = poll.results.find((item) => item.option === option);
    if (existing) {
      existing.votes += 1;
    } else {
      poll.results.push({ option, votes: 1 });
    }

    await poll.save();

    return res.json({
      message: 'Vote recorded',
      data: poll,
    });
  } catch (error) {
    console.error('votePoll error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function createConsultation(req, res) {
  try {
    const { title, summary, body, areaId, deadline } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const consultation = await Consultation.create({
      title,
      summary,
      body,
      areaId: areaId || null,
      deadline: deadline || null,
      open: true,
    });

    return res.status(201).json({
      message: 'Consultation created successfully',
      data: consultation,
    });
  } catch (error) {
    console.error('createConsultation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function messageLeader(req, res) {
  try {
    const { leaderId, subject, message } = req.body;

    if (!leaderId || !subject || !message) {
      return res.status(400).json({ message: 'Leader, subject, and message are required' });
    }

    // For now this returns success. You can later store in a Message model.
    return res.status(201).json({
      message: 'Message sent successfully',
      data: {
        leaderId,
        subject,
      },
    });
  } catch (error) {
    console.error('messageLeader error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}