import { Router } from 'express';
import { query } from '../db/db';

const router = Router();

// --- FIXTURE UPDATES ---
router.patch('/fixtures/:id', async (req, res) => {
    const { id } = req.params;
    const { savedState, status, teamAScore, teamBScore, result, winnerId } = req.body;

    try {
        await query(
            `UPDATE public.fixtures 
             SET saved_state = COALESCE($1, saved_state),
                 status = COALESCE($2, status),
                 scores = jsonb_set(COALESCE(scores, '{}'), '{teamAScore}', to_jsonb(COALESCE($3, scores->>'teamAScore'))),
                 scores = jsonb_set(scores, '{teamBScore}', to_jsonb(COALESCE($4, scores->>'teamBScore'))),
                 result = COALESCE($5, result),
                 winner_id = COALESCE($6, winner_id)
             WHERE id = $7`,
            [JSON.stringify(savedState), status, teamAScore, teamBScore, result, winnerId, id]
        );

        const io = (req as any).io;
        if (io) io.emit('fixture_update', { id, timestamp: Date.now() });

        res.json({ success: true });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// --- DELETIONS ---
router.delete('/fixtures/:id', async (req, res) => {
    try {
        await query('DELETE FROM public.fixtures WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/teams/:id', async (req, res) => {
    try {
        await query('DELETE FROM public.teams WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/tournaments/:id', async (req, res) => {
    try {
        await query('DELETE FROM public.tournaments WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/media/:id', async (req, res) => {
    try {
        await query('DELETE FROM public.media_posts WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// --- USER DATA ---
router.get('/user/:id', async (req, res) => {
    try {
        const result = await query('SELECT * FROM public.user_profiles WHERE id = $1', [req.params.id]);
        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            profile: {
                id: user.id,
                name: user.name,
                handle: user.handle,
                role: user.role,
                avatarUrl: user.avatar_url
            },
            settings: user.settings,
            following: user.following
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { profile, settings, following } = req.body;

    try {
        await query(
            `UPDATE public.user_profiles 
             SET name = COALESCE($1, name),
                 handle = COALESCE($2, handle),
                 role = COALESCE($3, role),
                 avatar_url = COALESCE($4, avatar_url),
                 settings = COALESCE($5, settings),
                 following = COALESCE($6, following),
                 updated_at = NOW()
             WHERE id = $7`,
            [profile?.name, profile?.handle, profile?.role, profile?.avatarUrl, JSON.stringify(settings), JSON.stringify(following), id]
        );
        res.json({ success: true });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
