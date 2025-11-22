import User from '../models/User.js';
import Hospital from '../models/Hospital.js';
import Patient from '../models/Patient.js';

// GET /api/admin/stats
// Returns aggregate counts for quick admin overview.

export const getAdminStats = async (req, res) => {
  try {
    const [users, hospitals, patients] = await Promise.all([
      User.countDocuments(),
      Hospital.countDocuments(),
      Patient.countDocuments(),
    ]);

    return res.json({
      users,
      hospitals,
      patients,
      message: 'Admin stats fetched',
    });
  } catch (err) {
    console.error('Admin stats error', err);
    return res.status(500).json({ message: 'Failed to fetch admin stats' });
  }
};
