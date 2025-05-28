import { createClient ) from'@supabase/supabase-js';

const supabaseUrl = 'https://eoolonboheynnbaodzac.supabase.co';
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvb2xvbmJvaGV5bm5iYW9kemFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MTcxMDQsImV4cCI6MjA2Mzk5MzEwNH0.gvdp0gstwS_D-eOsBfP9WtmaxJVguBaXjtR_BjVJUXU';

export const supabase = createClient(supabaseUrl, supabaseKey);