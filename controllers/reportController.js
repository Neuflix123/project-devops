const db = require('../config/db');

const createReport = async (req, res) => {
    const { title, description, location } = req.body;
    const userId = req.user.id;

    if (!title || !description || !location) {
        return res.status(400).json({ message: 'Semua data laporan harus diisi!' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO reports (user_id, title, description, location, status) VALUES (?, ?, ?, ?, ?)',
            [userId, title, description, location, 'pending']
        );
        res.status(201).json({ message: 'Laporan berhasil dibuat!', reportId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllReports = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reports ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReportStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [result] = await db.query('UPDATE reports SET status = ? WHERE id = ?', [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Laporan tidak ditemukan' });
        }
        res.status(200).json({ message: `Status laporan ID ${id} berhasil diubah menjadi ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createReport, getAllReports, updateReportStatus };