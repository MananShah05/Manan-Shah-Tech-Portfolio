import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ttadfpuqqdrwycfjvwmf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Zha5joIyp-fkOYksGt8b_w_MKGVpZKZ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
