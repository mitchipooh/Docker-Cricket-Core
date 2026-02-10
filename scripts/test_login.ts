import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, val] = line.split('=');
    if (key && val) acc[key.trim()] = val.trim();
    return acc;
}, {} as any);

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);

async function test() {
    console.log('Testing login flow for CZTTCB...\n');

    // Simulate what ProfileSetup does
    const handle = '@CZTTCB';
    const sanitizedHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const searchId = sanitizedHandle.replace('@', '').toLowerCase(); // becomes 'czttcb'

    console.log('1. Input handle:', handle);
    console.log('2. Sanitized handle:', sanitizedHandle);
    console.log('3. Search ID:', searchId);

    // First attempt: by ID
    console.log('\n4. Searching by ID:', searchId);
    const { data: byId, error: idErr } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', searchId)
        .single();

    if (byId) {
        console.log('   ✅ Found by ID:', byId.id, byId.handle);
    } else {
        console.log('   ❌ Not found by ID');
        console.log('   Error:', idErr?.message || 'No error');
    }

    // Second attempt: by handle with ilike
    const handleToTry = searchId.startsWith('@') ? searchId : `@${searchId}`; // becomes '@czttcb'
    console.log('\n5. Searching by handle (ilike):', handleToTry);
    const { data: byHandle, error: handleErr } = await supabase
        .from('user_profiles')
        .select('*')
        .ilike('handle', handleToTry)
        .single();

    if (byHandle) {
        console.log('   ✅ Found by handle:', byHandle.id, byHandle.handle, byHandle.password);
    } else {
        console.log('   ❌ Not found by handle');
        console.log('   Error:', handleErr?.message || 'No error');
    }

    // List all profiles to see what exists
    console.log('\n6. All user profiles:');
    const { data: all } = await supabase
        .from('user_profiles')
        .select('id, handle, name')
        .limit(10);

    if (all) {
        all.forEach(p => console.log('   -', p.id, '|', p.handle, '|', p.name));
    }
}

test();
