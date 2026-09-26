export const API_URL = 'https://api.abcz.workers.dev/api/fitlog';
export interface Workout {
  id: number; name: string; image: string; muscleGroups: string[]; equipment: string;
  difficulty: string; duration: number; caloriesBurned: number; sets: number;
  reps: string; rating: number; description: string; instructions: string[];
}
export async function fetchWorkouts(signal?: AbortSignal): Promise<Workout[]> {
  const response = await fetch(API_URL, { signal });
  if (!response.ok) throw new Error('Unable to load workouts. Please try again.');
  const data = await response.json() as Workout[];
  if (!Array.isArray(data)) throw new Error('The workout library is temporarily unavailable.');
  return data;
}
export async function fetchWorkout(id: string, signal?: AbortSignal): Promise<Workout | null> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, { signal });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Unable to load this workout. Please try again.');
  const data = await response.json() as Workout | null;
  return data && data.id ? data : null;
}
export function workoutImage(workout: Workout) { return `/images/workout-${workout.id}.jpg`; }
export type SortKey = 'duration' | 'caloriesBurned' | 'rating';
export function sortWorkouts<T extends Workout>(workouts: T[], key: SortKey): T[] {
  return [...workouts].sort((a,b) => key === 'duration' ? a[key] - b[key] : b[key] - a[key]);
}
