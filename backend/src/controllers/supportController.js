import DonationCampaign from '../models/DonationCampaign.js';
import Donation from '../models/Donation.js';
import SupportDisbursement from '../models/SupportDisbursement.js';
import CitizenActivity from '../models/CitizenActivity.js';

export async function getSupportHub(req, res) {
  try {
    const campaigns = await DonationCampaign.find({ isActive: true }).sort({ priorityOrder: 1, createdAt: -1 }).lean();
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(10).lean();
    const disbursements = await SupportDisbursement.find().sort({ createdAt: -1 }).limit(10).lean();

    const totals = campaigns.reduce(
      (acc, item) => {
        acc.targetAmount += item.targetAmount || 0;
        acc.raisedAmount += item.raisedAmount || 0;
        acc.disbursedAmount += item.disbursedAmount || 0;
        return acc;
      },
      { targetAmount: 0, raisedAmount: 0, disbursedAmount: 0 }
    );

    return res.json({
      data: {
        campaigns,
        donations,
        disbursements,
        totals,
      },
    });
  } catch (error) {
    console.error('getSupportHub error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function createDonation(req, res) {
  try {
    const {
      campaignId,
      donorName,
      email,
      phone,
      amount,
      anonymous,
      paymentReference,
      note,
    } = req.body;

    if (!campaignId || !amount) {
      return res.status(400).json({ message: 'Campaign and amount are required' });
    }

    const campaign = await DonationCampaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const donation = await Donation.create({
      campaign: campaign._id,
      user: req.user?._id || null,
      donorName: donorName || '',
      email: email || '',
      phone: phone || '',
      amount: Number(amount),
      anonymous: !!anonymous,
      paymentReference: paymentReference || '',
      note: note || '',
      status: 'Pending',
    });

    campaign.raisedAmount = Number(campaign.raisedAmount || 0) + Number(amount);
    await campaign.save();

    if (req.user?._id) {
      await CitizenActivity.create({
        user: req.user._id,
        type: 'donation',
        title: `Donation for ${campaign.title}`,
        detail: `Support amount: ${amount}`,
        sourceSection: 'support',
        meta: { campaignId: campaign._id, donationId: donation._id },
      });
    }

    return res.status(201).json({
      message: 'Support recorded successfully',
      data: donation,
    });
  } catch (error) {
    console.error('createDonation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function confirmDonation(req, res) {
  try {
    const { donationId } = req.params;
    const donation = await Donation.findById(donationId);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    donation.status = 'Confirmed';
    await donation.save();

    return res.json({ message: 'Donation confirmed', data: donation });
  } catch (error) {
    console.error('confirmDonation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}