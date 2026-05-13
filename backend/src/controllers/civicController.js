//backend/src/controllers/civicController.js
import Station from '../models/Station.js';
import Area from '../models/Area.js';
import Leader from '../models/Leader.js';

function safeText(value) {
  return String(value || '').trim().toLowerCase();
}

function distanceKm(a, b) {
  if (!a || !b) return Number.MAX_SAFE_INTEGER;
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export async function searchStations(req, res) {
  try {
    const q = safeText(req.query.q);
    const lat = req.query.lat ? Number(req.query.lat) : null;
    const lng = req.query.lng ? Number(req.query.lng) : null;
    const userLocation = Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;

    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { code: { $regex: q, $options: 'i' } },
            { county: { $regex: q, $options: 'i' } },
            { constituency: { $regex: q, $options: 'i' } },
            { ward: { $regex: q, $options: 'i' } },
          ],
        }
      : {};

    const stations = await Station.find(filter).lean();

    const mapped = stations
      .map((station) => {
        const dist = userLocation ? distanceKm(userLocation, { lat: station.lat, lng: station.lng }) : null;
        return {
          ...station,
          distanceKm: dist,
          distanceLabel: dist != null ? `${dist.toFixed(1)} km` : '—',
        };
      })
      .sort((a, b) => {
        if (a.distanceKm == null && b.distanceKm == null) return a.name.localeCompare(b.name);
        if (a.distanceKm == null) return 1;
        if (b.distanceKm == null) return -1;
        return a.distanceKm - b.distanceKm;
      });

    return res.json({ data: mapped });
  } catch (error) {
    console.error('searchStations error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getStationById(req, res) {
  try {
    const station = await Station.findById(req.params.id).lean();
    if (!station) return res.status(404).json({ message: 'Station not found' });
    return res.json({ data: station });
  } catch (error) {
    console.error('getStationById error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getAreaByStationId(req, res) {
  try {
    const area = await Area.findOne({ station: req.params.stationId })
      .populate('station')
      .populate('leaders')
      .lean();

    if (!area) return res.status(404).json({ message: 'Area not found' });

    return res.json({ data: area });
  } catch (error) {
    console.error('getAreaByStationId error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getAreaHub(req, res) {
  try {
    const area = await Area.findById(req.params.areaId).populate('station').populate('leaders').lean();
    if (!area) return res.status(404).json({ message: 'Area not found' });

    return res.json({ data: area });
  } catch (error) {
    console.error('getAreaHub error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getLeaderDetail(req, res) {
  try {
    const leader = await Leader.findById(req.params.leaderId).populate('area').lean();
    if (!leader) return res.status(404).json({ message: 'Leader not found' });

    return res.json({ data: leader });
  } catch (error) {
    console.error('getLeaderDetail error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function compareLeaders(req, res) {
  try {
    const ids = Array.isArray(req.query.leaderIds)
      ? req.query.leaderIds
      : req.query.leaderIds
      ? [req.query.leaderIds]
      : [];

    if (!ids.length) return res.status(400).json({ message: 'No leaderIds supplied' });

    const leaders = await Leader.find({ _id: { $in: ids } }).lean();
    const data = leaders.map((leader) => ({
      id: leader._id,
      office: leader.office,
      theme: leader.comparisonTags?.[0] || 'General',
      highlight: leader.manifestoHighlights?.[0] || 'No highlight available',
    }));

    return res.json({ data });
  } catch (error) {
    console.error('compareLeaders error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}