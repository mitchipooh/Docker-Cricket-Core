import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// --- ENV SETUP ---
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, val] = line.split('=');
    if (key && val) acc[key.trim()] = val.trim();
    return acc;
}, {} as any);

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCZTTCB() {
    console.log('🔍 Checking CZTTCB account...\n');

    // Check by ID
    const { data: byId, error: idError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', 'user-czttcb-admin')
        .single();

    console.log('1. Search by ID (user-czttcb-admin):');
    if (byId) {
        console.log('   ✅ Found:', {
            id: byId.id,
            handle: byId.handle,
            name: byId.name,
            role: byId.role,
            password: byId.password
        });
    } else {
        console.log('   ❌ Not found');
        if (idError) console.log('   Error:', idError.message);
    }

    // Check by handle (case-sensitive)
    const { data: byHandle, error: handleError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('handle', '@CZTTCB')
        .single();

    console.log('\n2. Search by handle (exact: @CZTTCB):');
    if (byHandle) {
        console.log('   ✅ Found:', {
            id: byHandle.id,
            handle: byHandle.handle,
            name: byHandle.name,
            role: byHandle.role,
            password: byHandle.password
        });
    } else {
        console.log('   ❌ Not found');
        if (handleError) console.log('   Error:', handleError.message);
    }

    // Check by handle (case-insensitive)
    const { data: byHandleIlike, error: ilikeError } = await supabase
        .from('user_profiles')
        .select('*')
        .ilike('handle', '@CZTTCB')
        .single();

    console.log('\n3. Search by handle (case-insensitive: @CZTTCB):');
    if (byHandleIlike) {
        console.log('   ✅ Found:', {
            id: byHandleIlike.id,
            handle: byHandleIlike.handle,
            name: byHandleIlike.name,
            role: byHandleIlike.role,
            password: byHandleIlike.password
        });
    } else {
        console.log('   ❌ Not found');
        if (ilikeError) console.log('   Error:', ilikeError.message);
    }

    // List all profiles with 'czttcb' in handle or id
    const { data: allMatches } = await supabase
        .from('user_profiles')
        .select('id, handle, name, role')
        .or('handle.ilike.%czttcb%,id.ilike.%czttcb%');

    console.log('\n4. All profiles matching "czttcb":');
    if (allMatches && allMatches.length > 0) {
        allMatches.forEach(profile => {
            console.log('   -', {
                id: profile.id,
                handle: profile.handle,
                name: profile.name,
                role: profile.role
            });
        });
    } else {
        console.log('   ❌ No matches found');
    }

    // Check organization
    const { data: org } = await supabase
        .from('organizations')
        .select('id, name, members')
        .eq('id', 'org-czttcb')
        .single();

    console.log('\n5. Organization check:');
    if (org) {
        console.log('   ✅ Organization exists:', org.name);
        console.log('   Members count:', org.members?.length || 0);
        const czttcbMember = org.members?.find((m: any) => m.handle === '@CZTTCB' || m.userId === 'user-czttcb-admin');
        if (czttcbMember) {
            console.log('   ✅ CZTTCB is a member:', czttcbMember);
        } else {
            console.log('   ❌ CZTTCB not found in members');
        }
    } else {
        console.log('   ❌ Organization not found');
    }

    // Check teams
    const { data: teams } = await supabase
        .from('teams')
        .select('id, name')
        .eq('org_id', 'org-czttcb');

    console.log('\n6. Teams check:');
    if (teams && teams.length > 0) {
        console.log(`   ✅ Found ${teams.length} teams`);
        console.log('   First 3:', teams.slice(0, 3).map(t => t.name));
    } else {
        console.log('   ❌ No teams found');
    }

    // Check org-team links
    const { data: links } = await supabase
        .from('organization_teams')
        .select('*')
        .eq('organization_id', 'org-czttcb');

    console.log('\n7. Organization-team links:');
    if (links && links.length > 0) {
        console.log(`   ✅ Found ${links.length} links`);
    } else {
        console.log('   ❌ No links found');
    }
}

checkCZTTCB();
