import React from 'react'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const eventsTable = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
   
    if (!user) {
      return redirect("/sign-in");
    }


    return (
    <div>
      
    </div>
  )
}


export default eventsTable
