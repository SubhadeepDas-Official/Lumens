import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function loadEnv() {
  const envPath = resolve(process.cwd(), '.env')
  const content = readFileSync(envPath, 'utf8')
  const env = {}
  for (const line of content.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) env[key.trim()] = rest.join('=').trim()
  }
  return env
}

const env = loadEnv()
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)

const email = `lumens.e2e.${Date.now()}@mail.com`
const password = 'password12345'

console.log('Testing signup:', email)

const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { name: 'E2E User', role: 'teacher' },
    emailRedirectTo: 'http://localhost:5173/verify-email',
  },
})

if (signUpError) {
  console.error('SIGNUP ERROR:', signUpError.message)
  process.exit(1)
}

console.log('Signup OK. Session:', !!signUpData.session, 'User:', signUpData.user?.id)

if (signUpData.session && signUpData.user) {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', signUpData.user.id)
    .maybeSingle()

  if (profileError) console.error('PROFILE READ ERROR:', profileError.message)
  else console.log('Profile after signup:', profile)

  const { error: signOutError } = await supabase.auth.signOut()
  if (signOutError) console.error('SIGNOUT ERROR:', signOutError.message)

  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (loginError) {
    console.log('LOGIN (expected if email unconfirmed):', loginError.message)
  } else {
    console.log('Login OK. Role metadata:', loginData.user?.user_metadata?.role)
    const { data: loginProfile } = await supabase
      .from('profiles')
      .select('role,name')
      .eq('id', loginData.user.id)
      .maybeSingle()
    console.log('Profile after login:', loginProfile)
  }
} else {
  console.log('No session after signup (email confirmation likely required).')
  const { data: profiles, error } = await supabase.from('profiles').select('id,email,role,name')
  if (error) console.error('PROFILE LIST ERROR:', error.message)
  else console.log('Profiles visible to anon (expect []):', profiles)
}

console.log('Done.')
