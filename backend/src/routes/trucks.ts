import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { licensePlate, capacity, truckType, fuelType, organizationId } = req.body;

    const org = await prisma.organization.findUnique({
      where: { userId: req.userId! },
    });

    if (!org) {
      return res.status(400).json({ error: 'Organization not found' });
    }

    const truck = await prisma.truck.create({
      data: {
        licensePlate,
        capacity: parseInt(capacity),
        truckType,
        fuelType,
        organizationId: org.id,
        status: 'IDLE',
      },
    });

    res.status(201).json(truck);
  } catch (error) {
    console.error('Error creating truck:', error);
    res.status(500).json({ error: 'Failed to create truck' });
  }
});

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const org = await prisma.organization.findUnique({
      where: { userId: req.userId! },
    });

    if (!org) {
      return res.json([]);
    }

    const trucks = await prisma.truck.findMany({
      where: { organizationId: org.id },
      include: {
        locations: {
          take: 1,
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    res.json(trucks);
  } catch (error) {
    console.error('Error fetching trucks:', error);
    res.status(500).json({ error: 'Failed to fetch trucks' });
  }
});

router.post('/:id/location', async (req: AuthRequest, res: Response) => {
  try {
    const { latitude, longitude, speed, heading } = req.body;

    const location = await prisma.truckLocation.create({
      data: {
        truckId: req.params.id,
        driverId: req.userId!,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        speed: speed ? parseFloat(speed) : null,
        heading: heading ? parseFloat(heading) : null,
      },
    });

    res.status(201).json(location);
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ error: 'Failed to save location' });
  }
});

router.get('/:id/locations', async (req: AuthRequest, res: Response) => {
  try {
    const locations = await prisma.truckLocation.findMany({
      where: { truckId: req.params.id },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

router.put('/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const truck = await prisma.truck.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.json(truck);
  } catch (error) {
    console.error('Error updating truck status:', error);
    res.status(500).json({ error: 'Failed to update truck status' });
  }
});

export default router;
