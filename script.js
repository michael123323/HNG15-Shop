const supabaseUrl = "https://ngeborpinqvyzcwfxasq.supabase.co";
const supabaseAnonKey = "sb_publishable_XSiiAk-p-YqVGXlXH7lXZA_qgyeFgzJ";

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseAnonKey
);

const addToCartButton = document.getElementById("add-to-cart");
if (addToCartButton) { addToCartButton.addEventListener("click", async () => { const { data: { user } } = await supabaseClient.auth.getUser();

JavaScript
    if (!user) {
        alert("Please log in first.");
        return;
    }

    const { error } = await supabaseClient
        .from("cart_items")
        .insert([
            {
                user_id: user.id,
                product_id: "wireless-headphone",
                product_name: "Wireless Headphone",
                product_price: 25000,
                quantity: 1
            }
        ]);

    if (error) {
        console.error(error);
        alert("Could not add product to cart.");
        return;
    }

    alert("Product added to cart!");
});
}

if (addToCartButton) {
  addToCartButton.addEventListener("click", () => {
    alert("Product added to cart!");
  });
}

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const full_name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  const { error } = await supabaseClient
    .from("orders")
    .insert([{ full_name, email, address }]);

  if (error) {
    console.error(error);
    alert("Order failed: " + error.message);
    return;
  }

  const { error: emailError } = await supabaseClient.functions.invoke(
    "send_order_confirmation",
    {
      body: { name: full_name, email }
    }
  );

  if (emailError) {
    console.error(emailError);
    alert("Order saved, but the confirmation email could not be sent.");
    return;
  }

  alert("Order placed successfully! Please check your email.");
  event.target.reset();
});
}
