import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { serviceType, frequency, containerSize, price, organizationId } = req.body;

    const subscription = await prisma.serviceSubscription.create({
      data: {
        userId: req.userId!,
        organizationId: organizationId || null,
        serviceType,
        frequency,
        containerSize: parseInt(containerSize),
        price: parseFloat(price),
        startDate: new Date(),
        status: 'ACTIVE',
      },
      include: {
        collections: {
          take: 10,
          orderBy: { collectedAt: 'desc' },
        },
      },
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const subscriptions = await prisma.serviceSubscription.findMany({
      where: {
        userId: req.userId!,
      },
      include: {
        collections: {
          take: 5,
          orderBy: { collectedAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const subscription = await prisma.serviceSubscription.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
      include: {
        collections: {
          orderBy: { collectedAt: 'desc' },
        },
      },
    });

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { status, frequency, containerSize } = req.body;

    const subscription = await prisma.serviceSubscription.updateMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
      data: {
        status: status || undefined,
        frequency: frequency || undefined,
        containerSize: containerSize ? parseInt(containerSize) : undefined,
      },
    });

    res.json({ success: true, modified: subscription.count });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
});

router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.serviceSubscription.deleteMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
});

export default router;
