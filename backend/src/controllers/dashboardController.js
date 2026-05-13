/*import User from '../models/User.js';
import Station from '../models/Station.js';
import Area from '../models/Area.js';

export async function getDashboardOverview(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('savedStations');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const savedStationsCount = user.savedStations?.length || 0;
    const profileComplete = !!user.profileComplete;

    const area = await Area.findOne({
      county: user.county || { $exists: true },
      constituency: user.constituency || { $exists: true },
      ward: user.ward || { $exists: true },
    }).populate('station');

    return res.json({
      overview: {
        savedStationsCount,
        profileComplete,
        currentArea: area
          ? {
              id: area._id,
              county: area.county,
              constituency: area.constituency,
              ward: area.ward,
              stationName: area.station?.name || '',
            }
          : null,
      },
    });
  } catch (error) {
    console.error('getDashboardOverview error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getDashboardActivity(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('savedStations');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const recentStations = user.savedStations || [];

    return res.json({
      activity: [
        { id: 1, type: 'profile', title: 'Profile ready', detail: user.profileComplete ? 'Your profile is complete.' : 'Complete your profile to personalize CivicHub.' },
        { id: 2, type: 'station', title: 'Saved stations', detail: `${recentStations.length} station(s) saved.` },
      ],
    });
  } catch (error) {
    console.error('getDashboardActivity error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}*/
import User from '../models/User.js';
import Station from '../models/Station.js';
import Leader from '../models/Leader.js';
import CitizenActivity from '../models/CitizenActivity.js';

function buildAlerts(user) {
  const alerts = [];

  if (!user.profileComplete) {
    alerts.push({
      id: 'profile',
      title: 'Complete your profile',
      detail: 'Add county, constituency, ward, and civic interests to personalize CivicHub.',
      severity: 'info',
    });
  }

  if (!user.isVerified) {
    alerts.push({
      id: 'verify',
      title: 'Account verification pending',
      detail: 'Your account should be verified before sensitive actions.',
      severity: 'warning',
    });
  }

  if (!user.savedStations || user.savedStations.length === 0) {
    alerts.push({
      id: 'stations',
      title: 'Save a station',
      detail: 'Save a polling or registration station for quick access later.',
      severity: 'secondary',
    });
  }

  return alerts;
}

export async function getDashboardOverview(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .populate('savedStations')
      .populate('followedLeaders')
      .lean();

    if (!user) return res.status(404).json({ message: 'User not found' });

    const recentActivities = await CitizenActivity.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    const activitiesByType = recentActivities.reduce(
      (acc, item) => {
        if (['petition', 'poll', 'consultation', 'message'].includes(item.type)) {
          acc.participation.push(item);
        }
        if (item.type === 'report') {
          acc.reports.push(item);
        }
        return acc;
      },
      { participation: [], reports: [] }
    );

    const overview = {
      profile: {
        id: user._id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        county: user.county || '',
        constituency: user.constituency || '',
        ward: user.ward || '',
        interests: user.interests || [],
        profileComplete: !!user.profileComplete,
        roles: user.roles || [],
      },
      stats: {
        savedStations: user.savedStations?.length || 0,
        followedLeaders: user.followedLeaders?.length || 0,
        participationCount: activitiesByType.participation.length,
        reportCount: activitiesByType.reports.length,
      },
      savedStations: (user.savedStations || []).map((station) => ({
        id: station._id,
        name: station.name,
        code: station.code,
        county: station.county,
        constituency: station.constituency,
        ward: station.ward,
        openHours: station.openHours,
        isOpen: station.isOpen,
        lat: station.lat,
        lng: station.lng,
      })),
      followedLeaders: (user.followedLeaders || []).map((leader) => ({
        id: leader._id,
        office: leader.office,
        name: leader.name,
        party: leader.party || leader.department || '',
        roleSummary: leader.roleSummary || '',
        manifestoHighlights: leader.manifestoHighlights || [],
      })),
      alerts: buildAlerts(user),
      participationHistory: activitiesByType.participation,
      reportHistory: activitiesByType.reports,
    };

    return res.json({ data: overview });
  } catch (error) {
    console.error('getDashboardOverview error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getDashboardActivity(req, res) {
  try {
    const items = await CitizenActivity.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ data: items });
  } catch (error) {
    console.error('getDashboardActivity error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function updateDashboardProfile(req, res) {
  try {
    const { firstName, lastName, county, constituency, ward, interests, profileComplete } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (county !== undefined) user.county = county;
    if (constituency !== undefined) user.constituency = constituency;
    if (ward !== undefined) user.ward = ward;
    if (interests !== undefined) user.interests = Array.isArray(interests) ? interests : [];
    if (profileComplete !== undefined) user.profileComplete = !!profileComplete;

    await user.save();

    await CitizenActivity.create({
      user: user._id,
      type: 'profile',
      title: 'Profile updated',
      detail: 'Citizen profile updated from dashboard.',
      sourceSection: 'dashboard',
    });

    return res.json({
      message: 'Profile updated successfully',
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
    console.error('updateDashboardProfile error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getFollowedLeaders(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('followedLeaders').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const leaders = (user.followedLeaders || []).map((leader) => ({
      id: leader._id,
      office: leader.office,
      name: leader.name,
      party: leader.party || leader.department || '',
      roleSummary: leader.roleSummary || '',
      controls: leader.controls || [],
      doesNotControl: leader.doesNotControl || [],
      manifestoHighlights: leader.manifestoHighlights || [],
    }));

    return res.json({ data: leaders });
  } catch (error) {
    console.error('getFollowedLeaders error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function followLeader(req, res) {
  try {
    const { leaderId } = req.params;
    const leader = await Leader.findById(leaderId);
    if (!leader) return res.status(404).json({ message: 'Leader not found' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const exists = (user.followedLeaders || []).some((id) => String(id) === String(leaderId));
    if (!exists) user.followedLeaders.push(leader._id);
    await user.save();

    await CitizenActivity.create({
      user: user._id,
      type: 'leader',
      title: `Followed ${leader.office}`,
      detail: leader.name,
      sourceSection: 'dashboard',
      meta: { leaderId: leader._id },
    });

    return res.json({ message: 'Leader followed', data: leader });
  } catch (error) {
    console.error('followLeader error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function unfollowLeader(req, res) {
  try {
    const { leaderId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.followedLeaders = (user.followedLeaders || []).filter((id) => String(id) !== String(leaderId));
    await user.save();

    return res.json({ message: 'Leader removed from follows' });
  } catch (error) {
    console.error('unfollowLeader error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}