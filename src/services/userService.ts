import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { formatIndianDate } from '@/lib/format'
import type { UserRole } from '@/lib/roles'
import { isUserRole } from '@/lib/roles'

export interface UserProfile {
  uid: string
  name: string
  email: string
  phone?: string
  role: UserRole
  avatar: string
  joinedDate: string
  bio: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function resolveDisplayName(authUser: User, name?: string): string {
  return (
    name ??
    (authUser.user_metadata as { name?: string })?.name ??
    authUser.user_metadata?.full_name ??
    authUser.email?.split('@')[0] ??
    'User'
  )
}

function mapRowToProfile(row: {
  id: string
  name: string
  email: string
  role: string
  avatar: string | null
  joined_date: string | null
  bio: string | null
  phone: string | null
}): UserProfile {
  const role = isUserRole(row.role) ? row.role : 'student'
  return {
    uid: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    role,
    avatar: row.avatar ?? getInitials(row.name),
    joinedDate: row.joined_date ?? formatIndianDate(new Date()),
    bio: row.bio ?? '',
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle()

  if (error) throw error
  if (!data) return null
  return mapRowToProfile(data)
}

export async function createUserProfile(
  authUser: User,
  data: { name: string; role: UserRole; phone?: string }
): Promise<UserProfile> {
  const row = {
    id: authUser.id,
    name: data.name,
    email: authUser.email ?? '',
    phone: data.phone ?? authUser.phone ?? null,
    role: data.role,
    avatar: getInitials(data.name),
    joined_date: formatIndianDate(new Date()),
    bio: '',
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').upsert(row, { onConflict: 'id' })
  if (error) throw error

  await supabase.auth.updateUser({ data: { name: data.name, role: data.role } })

  return mapRowToProfile(row)
}

export async function assignUserRole(authUser: User, role: UserRole): Promise<UserProfile> {
  const name = resolveDisplayName(authUser)
  return createUserProfile(authUser, {
    name,
    role,
    phone: authUser.phone ?? undefined,
  })
}

export async function updateUserProfile(
  uid: string,
  updates: { bio?: string }
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', uid)
    .select('*')
    .single()

  if (error) throw error
  return mapRowToProfile(data)
}
