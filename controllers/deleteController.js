const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id; 
    db.start.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Failed to delete user' });
        } else {
            res.status(200).json({ success: true, message: 'User deleted successfully' });
        }
    });
});

module.exports = deleteUser;