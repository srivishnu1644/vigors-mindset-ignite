
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Records a user session/visit in the backend.
 * 
 * @param userId The id of the logged-in user.
 */
export function useCreateSession(userId?: string) {
  useEffect(() => {
    if (!userId) return;

    // Try to get IP address (optional, best effort via external service)
    const insertSession = async () => {
      let ipAddress: string | null = null;
      try {
        const resp = await fetch("https://api.ipify.org/?format=json");
        if (resp.ok) {
          const data = await resp.json();
          ipAddress = data.ip;
        }
      } catch (err) {
        // silently ignore
      }

      await supabase.from("user_sessions").insert([
        {
          user_id: userId,
          user_agent: window.navigator.userAgent,
          ip_address: ipAddress,
          metadata: null,
        },
      ]);
    };

    insertSession();
  }, [userId]);
}

