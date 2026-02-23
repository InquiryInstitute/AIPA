# Stripe purchase link for AIPA

The marketing page has a **Purchase the book** button that should point to a Stripe checkout. The simplest approach is **Stripe Payment Links** (no backend required).

## 1. Create a product in Stripe

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com).
2. Go to **Product catalog** → **Products** → **Add product**.
3. Set **Name** (e.g. “Artificial Intelligence: A Postmodern Approach (AIPA)”), **Description**, **Image** (e.g. book cover), and **Pricing** (one-time or subscription, amount, currency).
4. Save the product.

## 2. Create a Payment Link

1. In the Dashboard go to **Payment links** → **New** (or **Products** → your product → **Create payment link**).
2. Select the AIPA product, set quantity (e.g. allow 1), and any options (collect shipping, etc.).
3. Create the link. Stripe gives you a URL like `https://buy.stripe.com/xxxxxxxxxxxxx`.

## 3. Put the link on the marketing page

1. Open **`docs/index.html`**.
2. Find the Purchase button:  
   `<a href="https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK" ...>Purchase the book</a>`.
3. Replace `https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK` with your actual Payment Link URL.
4. Save and push; the live site will then send clicks to your Stripe checkout.

## Optional: test mode

Use a Payment Link from **Test mode** (toggle in Dashboard) while testing; replace with the **Live** Payment Link when you’re ready to accept real payments.
