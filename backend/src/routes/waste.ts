import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { wasteType, weight, volume, notes } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { userType: true },
    });

    const record = await prisma.wasteRecord.create({
      data: {
        userId: user?.userType === 'ORGANIZATION' ? null : req.userId!,
        organizationId: user?.userType === 'ORGANIZATION' ? (await prisma.organization.findUnique({ where: { userId: req.userId! } }))?.id : null,
        wasteType,
        weight: parseFloat(weight),
        volume: volume ? parseFloat(volume) : null,
        notes,
      },
    });

    res.status(201).json(record);
  } catch (error) {
    console.error('Error creating waste record:', error);
    res.status(500).json({ error: 'Failed to create waste record' });
  }
});

router.get('/summary', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { userType: true },
    });

    let where: any = {};
    if (user?.userType === 'ORGANIZATION') {
      const org = await prisma.organization.findUnique({
        where: { userId: req.userId! },
        select: { id: true },
      });
      where = { organizationId: org?.id };
    } else {
      where = { userId: req.userId! };
    }

    const records = await prisma.wasteRecord.findMany({ where });

    const summary = {
      totalWeight: records.reduce((sum, r) => sum + r.weight, 0),
      totalVolume: records.reduce((sum, r) => sum + (r.volume || 0), 0),
      recordCount: records.length,
      byType: {} as any,
    };

    records.forEach((record) => {
      const type = record.wasteType;
      if (!summary.byType[type]) {
        summary.byType[type] = { count: 0, weight: 0, volume: 0 };
      }
      summary.byType[type].count++;
      summary.byType[type].weight += record.weight;
      summary.byType[type].volume += record.volume || 0;
    });

    res.json(summary);
  } catch (error) {
    console.error('Error fetching waste summary:', error);
    res.status(500).json({ error: 'Failed to fetch waste summary' });
  }
});

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { userType: true },
    });

    let where: any = {};
    if (user?.userType === 'ORGANIZATION') {
      const org = await prisma.organization.findUnique({
        where: { userId: req.userId! },
        select: { id: true },
      });
      where = { organizationId: org?.id };
    } else {
      where = { userId: req.userId! };
    }

    const records = await prisma.wasteRecord.findMany({
      where,
      orderBy: { date: 'desc' },
      take: 100,
    });

    res.json(records);
  } catch (error) {
    console.error('Error fetching waste records:', error);
    res.status(500).json({ error: 'Failed to fetch waste records' });
  }
});

export default router;
