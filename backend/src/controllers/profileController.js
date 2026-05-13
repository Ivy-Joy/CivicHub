import User from '../models/User.js';
import Station from '../models/Station.js';

export async function getMyProfile(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select('-passwordHash -refreshTokens -passwordResetToken -passwordResetExpires -emailVerificationCodeHash -phoneVerificationCodeHash');

    if (!user) return res.status(404).json({ message: 'Profile not found' });

    return res.json({ profile: user });
  } catch (error) {
    console.error('getMyProfile error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function updateMyProfile(req, res) {
  try {
    const {
      firstName,
      lastName,
      county,
      constituency,
      ward,
      interests,
      profileComplete,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Profile not found' });

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (county !== undefined) user.county = county;
    if (constituency !== undefined) user.constituency = constituency;
    if (ward !== undefined) user.ward = ward;
    if (interests !== undefined) user.interests = Array.isArray(interests) ? interests : [];
    if (profileComplete !== undefined) user.profileComplete = !!profileComplete;

    await user.save();

    return res.json({
      message: 'Profile updated',
      profile: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        county: user.county,
        constituency: user.constituency,
        ward: user.ward,
        interests: user.interests,
        profileComplete: user.profileComplete,
      },
    });
  } catch (error) {
    console.error('updateMyProfile error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getSavedStations(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('savedStations');
    if (!user) return res.status(404).json({ message: 'Profile not found' });

    return res.json({ stations: user.savedStations || [] });
  } catch (error) {
    console.error('getSavedStations error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function saveStation(req, res) {
  try {
    const { stationId } = req.params;
    const station = await Station.findById(stationId);
    if (!station) return res.status(404).json({ message: 'Station not found' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Profile not found' });

    const exists = user.savedStations.some((id) => String(id) === String(stationId));
    if (!exists) user.savedStations.push(station._id);
    await user.save();

    return res.json({ message: 'Station saved', station });
  } catch (error) {
    console.error('saveStation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function removeStation(req, res) {
  try {
    const { stationId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Profile not found' });

    user.savedStations = user.savedStations.filter((id) => String(id) !== String(stationId));
    await user.save();

    return res.json({ message: 'Station removed' });
  } catch (error) {
    console.error('removeStation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}