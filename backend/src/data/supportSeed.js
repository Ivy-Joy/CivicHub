import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import DonationCampaign from '../models/DonationCampaign.js';
import SupportDisbursement from '../models/SupportDisbursement.js';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await DonationCampaign.deleteMany({});
  await SupportDisbursement.deleteMany({});

  const campaigns = await DonationCampaign.insertMany([
    {
      title: 'Platform Maintenance',
      slug: 'platform-maintenance',
      purpose: 'Keep CivicHub secure, online, and fast.',
      category: 'maintenance',
      targetAmount: 500000,
      raisedAmount: 185000,
      disbursedAmount: 82000,
      allocationDescription: 'Hosting, uptime, security, and routine fixes.',
      priorityOrder: 1,
    },
    {
      title: 'Civic Education Content',
      slug: 'civic-education-content',
      purpose: 'Create accessible learning pages and civic guides.',
      category: 'education',
      targetAmount: 300000,
      raisedAmount: 97000,
      disbursedAmount: 40000,
      allocationDescription: 'Research, writing, editing, and visual learning assets.',
      priorityOrder: 2,
    },
    {
      title: 'Community Support Operations',
      slug: 'community-support-operations',
      purpose: 'Support community-facing civic work and response operations.',
      category: 'disbursement',
      targetAmount: 400000,
      raisedAmount: 110000,
      disbursedAmount: 35000,
      allocationDescription: 'Operations, outreach, and transparent community disbursement.',
      priorityOrder: 3,
    },
  ]);

  await SupportDisbursement.insertMany([
    {
      campaign: campaigns[0]._id,
      title: 'Server and hosting bill',
      category: 'maintenance',
      amount: 45000,
      amountLabel: 'KES 45,000',
      status: 'Completed',
      note: 'Monthly infrastructure support.',
      disbursedAt: new Date(),
    },
    {
      campaign: campaigns[1]._id,
      title: 'Content production',
      category: 'education',
      amount: 25000,
      amountLabel: 'KES 25,000',
      status: 'Released',
      note: 'Lesson design and writing support.',
    },
  ]);

  console.log('Support seed complete');
  await mongoose.connection.close();
}

seed().catch(async (err) => {
  console.error(err);
  await mongoose.connection.close();
  process.exit(1);
});