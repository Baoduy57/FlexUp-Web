/**
 * Example: Using ApiClient with automatic token refresh
 * 
 * This example shows how to fetch user workouts with automatic
 * token refresh when the access token expires.
 */

"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "@/lib/api-client";
import { API_BASE_URL } from "@/lib/config";
import { useAuth } from "@/lib/auth-context";

interface Workout {
  id: number;
  title: string;
  description: string;
  // ... other fields
}

export function WorkoutListExample() {
  const { user, refreshAccessToken } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example 1: Using ApiClient (RECOMMENDED)
  const fetchWorkoutsWithApiClient = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // ApiClient automatically:
      // 1. Adds Authorization header
      // 2. Refreshes token if 401
      // 3. Retries request with new token
      const response = await ApiClient.get(
        `${API_BASE_URL}/api/Workout/user-workouts`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch workouts");
      }

      const data = await response.json();
      setWorkouts(data.data || data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Example 2: Manual token refresh (NOT RECOMMENDED - use ApiClient instead)
  const fetchWorkoutsManually = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const auth = localStorage.getItem("flexup_auth");
      if (!auth) throw new Error("Not authenticated");

      const { token } = JSON.parse(auth);

      let response = await fetch(
        `${API_BASE_URL}/api/Workout/user-workouts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If 401, try to refresh token
      if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        
        if (refreshed) {
          // Get new token and retry
          const newAuth = localStorage.getItem("flexup_auth");
          if (newAuth) {
            const { token: newToken } = JSON.parse(newAuth);
            
            response = await fetch(
              `${API_BASE_URL}/api/Workout/user-workouts`,
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              }
            );
          }
        } else {
          throw new Error("Session expired, please login again");
        }
      }

      if (!response.ok) {
        throw new Error("Failed to fetch workouts");
      }

      const data = await response.json();
      setWorkouts(data.data || data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Example 3: POST request with ApiClient
  const createWorkout = async (workoutData: Partial<Workout>) => {
    try {
      const response = await ApiClient.post(
        `${API_BASE_URL}/api/Workout/create`,
        workoutData
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create workout");
      }

      const newWorkout = await response.json();
      setWorkouts([...workouts, newWorkout.data || newWorkout]);
      
      return newWorkout;
    } catch (err) {
      console.error("Create workout error:", err);
      throw err;
    }
  };

  // Example 4: DELETE request with ApiClient
  const deleteWorkout = async (workoutId: number) => {
    try {
      const response = await ApiClient.delete(
        `${API_BASE_URL}/api/Workout/${workoutId}`
      );

      if (!response.ok) {
        throw new Error("Failed to delete workout");
      }

      setWorkouts(workouts.filter(w => w.id !== workoutId));
    } catch (err) {
      console.error("Delete workout error:", err);
      throw err;
    }
  };

  // Load workouts on mount
  useEffect(() => {
    if (user) {
      fetchWorkoutsWithApiClient();
    }
  }, [user]);

  if (!user) {
    return <div>Please login to view workouts</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Workouts</h2>
      
      <div className="mb-4 space-x-2">
        <button
          onClick={fetchWorkoutsWithApiClient}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Refresh (ApiClient)
        </button>
        
        <button
          onClick={fetchWorkoutsManually}
          disabled={loading}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Refresh (Manual)
        </button>

        <button
          onClick={() => createWorkout({ title: "New Workout", description: "Test" })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Test Workout
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="space-y-2">
        {workouts.map((workout) => (
          <div key={workout.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{workout.title}</h3>
              <p className="text-sm text-gray-600">{workout.description}</p>
            </div>
            <button
              onClick={() => deleteWorkout(workout.id)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {workouts.length === 0 && !loading && (
        <div className="text-center text-gray-500 py-8">
          No workouts found. Create one to get started!
        </div>
      )}
    </div>
  );
}
