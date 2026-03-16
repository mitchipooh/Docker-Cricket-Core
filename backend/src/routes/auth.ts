import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db/db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cricket-core-secret-2026';

// Register
router.post('/register', async (req, res) => {
    const { name, handle, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = `u-${Date.now()}`;
        
        await query(
            'INSERT INTO public.user_profiles (id, name, handle, email, password, role) VALUES ($1, $2, $3, $4, $5, $6)',
            [id, name, handle, email, hashedPassword, 'Fan']
        );

        const token = jwt.sign({ id, handle, role: 'Fan' }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token, user: { id, name, handle, email, role: 'Fan' } });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { handle, password } = req.body;

    try {
        const result = await query('SELECT * FROM public.user_profiles WHERE handle = $1 OR email = $1', [handle]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, handle: user.handle, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ 
            success: true, 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                handle: user.handle, 
                email: user.email, 
                role: user.role,
                avatarUrl: user.avatar_url 
            } 
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
