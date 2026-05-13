//backend/src/data/civicSeed.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import EducationChapter from '../models/EducationChapter.js';
import EducationLesson from '../models/EducationLesson.js';
import Petition from '../models/Petition.js';
import PublicPoll from '../models/PublicPoll.js';
import Consultation from '../models/Consultation.js';
import AccountabilityItem from '../models/AccountabilityItem.js';
import OfficialAccountability from '../models/OfficialAccountability.js';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    EducationChapter.deleteMany({}),
    EducationLesson.deleteMany({}),
    Petition.deleteMany({}),
    PublicPoll.deleteMany({}),
    Consultation.deleteMany({}),
    AccountabilityItem.deleteMany({}),
    OfficialAccountability.deleteMany({}),
  ]);

  const chapters = await EducationChapter.insertMany([
    { title: 'Basics', slug: 'basics', subtitle: 'How the system works', order: 1 },
    { title: 'Rights', slug: 'rights', subtitle: 'What the Constitution gives you', order: 2 },
    { title: 'Elections', slug: 'elections', subtitle: 'Voting and timelines', order: 3 },
    { title: 'County Government', slug: 'county-government', subtitle: 'County roles and responsibilities', order: 4 },
    { title: 'Public Participation', slug: 'public-participation', subtitle: 'How to take part', order: 5 },
    { title: 'Accountability', slug: 'accountability', subtitle: 'Tracking power and spending', order: 6 },
  ]);

  await EducationLesson.insertMany([
    {
      chapter: chapters[0]._id,
      title: 'What is CivicHub?',
      slug: 'what-is-civichub',
      topic: 'Basics',
      level: 'Citizen',
      summary: 'A simple explanation of why CivicHub exists.',
      explainer: 'CivicHub helps users locate stations, learn rights, view leaders, and participate.',
      example: 'A first-time voter can search a station and then open the area hub.',
      citizenTakeaway: 'The app turns civic information into a guided journey.',
      articleRef: 'Overview',
      order: 1,
    },
    {
      chapter: chapters[1]._id,
      title: 'Public participation',
      slug: 'public-participation-meaning',
      topic: 'Rights',
      level: 'Citizen',
      summary: 'Why participation matters in governance.',
      explainer: 'Public participation means people should be involved in decisions that affect them.',
      example: 'A county budget forum asks residents for views before final approval.',
      citizenTakeaway: 'You are not just a spectator; you are part of the process.',
      articleRef: 'Article 10 / county participation',
      order: 1,
    },
  ]);

  await Petition.insertMany([
    {
      title: 'Improve street lighting',
      targetOffice: 'MCA',
      description: 'Residents want better lighting around the market and footpaths.',
      status: 'Open',
      supportCount: 124,
    },
  ]);

  await PublicPoll.insertMany([
    {
      title: 'Which civic issue matters most in your area?',
      description: 'Help CivicHub understand citizen priorities.',
      options: ['Roads', 'Health', 'Jobs', 'Water'],
      active: true,
    },
  ]);

  await Consultation.insertMany([
    {
      title: 'Ward development priorities',
      summary: 'Tell leaders what should be prioritized this quarter.',
      body: 'Residents can share needs on roads, drainage, safety, markets, and youth programs.',
      open: true,
    },
  ]);

  await AccountabilityItem.insertMany([
    {
      projectName: 'Ward road upgrade',
      vendor: 'Alpha Works Ltd',
      status: 'In progress',
      amount: 18000000,
      amountLabel: 'KES 18,000,000',
      category: 'Public spending',
      progress: 58,
    },
    {
      projectName: 'Drainage improvement',
      vendor: 'CityBuild Co.',
      status: 'Planned',
      amount: 9200000,
      amountLabel: 'KES 9,200,000',
      category: 'Procurement',
      progress: 15,
    },
  ]);

  await OfficialAccountability.insertMany([
    { name: 'County Governor', office: 'Governor', status: 'Active', lastUpdate: 'Budget hearing completed' },
    { name: 'County Senator', office: 'Senator', status: 'Active', lastUpdate: 'Revenue oversight pending' },
  ]);

  console.log('CivicHub seed complete');
  await mongoose.connection.close();
}

seed().catch(async (err) => {
  console.error(err);
  await mongoose.connection.close();
  process.exit(1);
});