export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bmi_reports: {
        Row: {
          activity_level: string
          age: number
          bmi: number
          calculated_at: string | null
          category: string
          gender: string
          height: number
          height_unit: string
          id: string
          nutrition_details: Json | null
          nutrition_summary: string | null
          user_id: string
          weight: number
        }
        Insert: {
          activity_level: string
          age: number
          bmi: number
          calculated_at?: string | null
          category: string
          gender: string
          height: number
          height_unit: string
          id?: string
          nutrition_details?: Json | null
          nutrition_summary?: string | null
          user_id: string
          weight: number
        }
        Update: {
          activity_level?: string
          age?: number
          bmi?: number
          calculated_at?: string | null
          category?: string
          gender?: string
          height?: number
          height_unit?: string
          id?: string
          nutrition_details?: Json | null
          nutrition_summary?: string | null
          user_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "bmi_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          category: string
          created_at: string
          difficulty_level: string | null
          equipment_needed: string[] | null
          id: string
          instructions: string | null
          muscle_groups: string[] | null
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          difficulty_level?: string | null
          equipment_needed?: string[] | null
          id?: string
          instructions?: string | null
          muscle_groups?: string[] | null
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          difficulty_level?: string | null
          equipment_needed?: string[] | null
          id?: string
          instructions?: string | null
          muscle_groups?: string[] | null
          name?: string
        }
        Relationships: []
      }
      food_items: {
        Row: {
          calcium_mg: number | null
          calories_per_100g: number
          carbs_g: number
          category: string
          created_at: string
          fat_g: number
          fiber_g: number | null
          id: string
          iron_mg: number | null
          name: string
          potassium_mg: number | null
          protein_g: number
          serving_size_g: number
          sodium_mg: number | null
          sugar_g: number | null
          updated_at: string
          vitamin_c_mg: number | null
        }
        Insert: {
          calcium_mg?: number | null
          calories_per_100g: number
          carbs_g?: number
          category: string
          created_at?: string
          fat_g?: number
          fiber_g?: number | null
          id?: string
          iron_mg?: number | null
          name: string
          potassium_mg?: number | null
          protein_g?: number
          serving_size_g?: number
          sodium_mg?: number | null
          sugar_g?: number | null
          updated_at?: string
          vitamin_c_mg?: number | null
        }
        Update: {
          calcium_mg?: number | null
          calories_per_100g?: number
          carbs_g?: number
          category?: string
          created_at?: string
          fat_g?: number
          fiber_g?: number | null
          id?: string
          iron_mg?: number | null
          name?: string
          potassium_mg?: number | null
          protein_g?: number
          serving_size_g?: number
          sodium_mg?: number | null
          sugar_g?: number | null
          updated_at?: string
          vitamin_c_mg?: number | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          created_at: string
          current_value: number | null
          description: string | null
          goal_type: string
          id: string
          nutrition_macros: Json | null
          status: string
          target_date: string | null
          target_unit: string | null
          target_value: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_value?: number | null
          description?: string | null
          goal_type: string
          id?: string
          nutrition_macros?: Json | null
          status?: string
          target_date?: string | null
          target_unit?: string | null
          target_value?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_value?: number | null
          description?: string | null
          goal_type?: string
          id?: string
          nutrition_macros?: Json | null
          status?: string
          target_date?: string | null
          target_unit?: string | null
          target_value?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          membership_type: string
          price: number | null
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          membership_type: string
          price?: number | null
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          membership_type?: string
          price?: number | null
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      progress_tracking: {
        Row: {
          body_part: string | null
          created_at: string
          id: string
          metric_type: string
          notes: string | null
          recorded_date: string
          unit: string
          user_id: string
          value: number
        }
        Insert: {
          body_part?: string | null
          created_at?: string
          id?: string
          metric_type: string
          notes?: string | null
          recorded_date?: string
          unit: string
          user_id: string
          value: number
        }
        Update: {
          body_part?: string | null
          created_at?: string
          id?: string
          metric_type?: string
          notes?: string | null
          recorded_date?: string
          unit?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "progress_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          metadata: Json | null
          session_started_at: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          session_started_at?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          session_started_at?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_exercises: {
        Row: {
          exercise_id: string
          id: string
          notes: string | null
          order_in_workout: number
          reps: number | null
          rest_seconds: number | null
          sets: number | null
          weight_kg: number | null
          workout_id: string
        }
        Insert: {
          exercise_id: string
          id?: string
          notes?: string | null
          order_in_workout?: number
          reps?: number | null
          rest_seconds?: number | null
          sets?: number | null
          weight_kg?: number | null
          workout_id: string
        }
        Update: {
          exercise_id?: string
          id?: string
          notes?: string | null
          order_in_workout?: number
          reps?: number | null
          rest_seconds?: number | null
          sets?: number | null
          weight_kg?: number | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          calories_burned: number | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          name: string
          updated_at: string
          user_id: string
          workout_date: string
        }
        Insert: {
          calories_burned?: number | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
          workout_date?: string
        }
        Update: {
          calories_burned?: number | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
          workout_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
