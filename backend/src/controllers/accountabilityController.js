import AccountabilityItem from '../models/AccountabilityItem.js';
import OfficialAccountability from '../models/OfficialAccountability.js';

export async function getAccountabilityHub(req, res) {
  try {
    const procurement = await AccountabilityItem.find().sort({ createdAt: -1 }).lean();
    const officials = await OfficialAccountability.find().sort({ createdAt: -1 }).lean();

    const budgetProgress = procurement.length
      ? Math.round(
          procurement.reduce((sum, item) => sum + (item.progress || 0), 0) / procurement.length
        )
      : 0;

    const metrics = {
      budgetProgress,
      procurementCount: procurement.length,
      reportsCount: procurement.length
        ? procurement.filter((item) => item.category === 'Report' || item.category === 'Complaint').length
        : 0,
      officialsCount: officials.length,
    };

    return res.json({
      data: {
        metrics,
        procurement,
        officials,
      },
    });
  } catch (error) {
    console.error('getAccountabilityHub error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function submitReport(req, res) {
  try {
    const { category, subject, description } = req.body;

    if (!category || !subject || !description) {
      return res.status(400).json({ message: 'Category, subject, and description are required' });
    }

    // Placeholder for a future report model.
    return res.status(201).json({
      message: 'Report received successfully',
    });
  } catch (error) {
    console.error('submitReport error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}