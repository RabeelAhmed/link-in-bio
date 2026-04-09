const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const ClickEvent = require('../models/ClickEvent');

// GET /api/links - Get all active links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Server error fetching links' });
  }
});

// POST /api/links - Create a new link
router.post('/', async (req, res) => {
  try {
    const { title, url, order } = req.body;
    
    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const newLink = new Link({ title, url, order });
    await newLink.save();
    
    res.status(201).json(newLink);
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ error: 'Server error creating link' });
  }
});

// POST /api/links/click/:id - Track a click
router.post('/click/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if link exists
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    const click = new ClickEvent({
      linkId: id,
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.connection.remoteAddress
    });

    await click.save();
    
    res.status(200).json({ message: 'Click tracked successfully' });
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ error: 'Server error tracking click' });
  }
});

// GET /api/links/stats - Get basic stats
router.get('/stats', async (req, res) => {
  try {
    // Aggregate clicks per link
    const stats = await ClickEvent.aggregate([
      {
        $group: {
          _id: "$linkId",
          clicks: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "links",
          localField: "_id",
          foreignField: "_id",
          as: "link"
        }
      },
      {
        $unwind: "$link"
      },
      {
        $project: {
          _id: 1,
          title: "$link.title",
          url: "$link.url",
          clicks: 1
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

module.exports = router;
