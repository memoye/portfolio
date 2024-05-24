import { createClient } from "@/utils/supabase/server";
import { LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { SubmitButton } from "./SubmitButton";

function SignOut() {
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <form>
      <SubmitButton
        formAction={signOut}
        className="flex-items-center gap-2"
        variant="ghost"
      >
        <LogOutIcon className="mr-2 h-4 w-4" /> Sign Out
      </SubmitButton>
    </form>
  );
}
export default SignOut;
