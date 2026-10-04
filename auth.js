(() => {
  const authSupabaseUrl = "https://ngeborpinqvyzcwfxasq.supabase.co";
  const authSupabasePublishableKey = "sb_publishable_XSiiAk-p-YqVGXlXH7lXZA_qgyeFgzJ";

  const authSupabase = supabase.createClient(
    authSupabaseUrl,
    authSupabasePublishableKey
  );

  const googleButton = document.getElementById("google-sign-in");

  authSupabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session) {
      console.log("Logged in as:", session.user.email);
    }
  });

  if (googleButton) {
    googleButton.addEventListener("click", async () => {
      const { error } = await authSupabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/",
        },
      });
      if (error) alert("Google sign-in failed: " + error.message);
    });
  }
})();