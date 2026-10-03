(() => {
  const authSupabaseUrl = "https://ngeborpinqvyzcwfxasq.supabase.co";
  const authSupabasePublishableKey = "sb_publishable_XSiiAk-p-YqVGXlXH7lXZA_qgyeFgzJ";

  const authSupabase = supabase.createClient(
    authSupabaseUrl,
    authSupabasePublishableKey
  );

  const googleButton = document.getElementById("google-sign-in");

  if (!googleButton) {
    console.error("Google sign-in button was not found.");
    return;
  }

  googleButton.addEventListener("click", async () => {
    const { error } = await authSupabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://127.0.0.1:5500/index.html",
      },
    });

    if (error) {
      alert("Google sign-in failed: " + error.message);
    }
  });
})();