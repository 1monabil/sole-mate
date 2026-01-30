import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderItem {
  product_name: string;
  quantity: number;
  price_at_purchase: number;
  size: string | null;
  product_image: string | null;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderConfirmationRequest {
  orderId: string;
  email: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount?: number;
  discountCode?: string;
  totalAmount: number;
  shippingAddress: ShippingAddress;
}

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const generateEmailHtml = (data: OrderConfirmationRequest) => {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div>
              <p style="margin: 0; font-weight: 600; color: #111827;">${item.product_name}</p>
              ${item.size ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">Size: ${item.size}</p>` : ""}
              <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">Qty: ${item.quantity}</p>
            </div>
          </div>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #111827;">
          ${formatCurrency(item.price_at_purchase * item.quantity)}
        </td>
      </tr>
    `
    )
    .join("");

  const discountHtml = data.discountAmount
    ? `
      <tr>
        <td style="padding: 8px 0; color: #059669;">Discount (${data.discountCode})</td>
        <td style="padding: 8px 0; text-align: right; color: #059669;">-${formatCurrency(data.discountAmount)}</td>
      </tr>
    `
    : "";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #111827 0%, #374151 100%); padding: 32px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">STRIDE</h1>
            <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">Order Confirmation</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="width: 64px; height: 64px; background-color: #dcfce7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <span style="font-size: 32px;">✓</span>
              </div>
              <h2 style="margin: 0 0 8px; color: #111827; font-size: 24px; font-weight: 700;">Thank you for your order!</h2>
              <p style="margin: 0; color: #6b7280; font-size: 16px;">Hi ${data.customerName}, we've received your order.</p>
            </div>

            <!-- Order Info -->
            <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">Order Number</p>
              <p style="margin: 0; font-size: 18px; font-weight: 700; color: #111827; font-family: monospace;">${data.orderId.slice(0, 8).toUpperCase()}</p>
            </div>

            <!-- Items -->
            <h3 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Totals -->
            <div style="border-top: 2px solid #e5e7eb; padding-top: 16px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Subtotal</td>
                    <td style="padding: 8px 0; text-align: right; color: #111827;">${formatCurrency(data.subtotal)}</td>
                  </tr>
                  ${discountHtml}
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Shipping</td>
                    <td style="padding: 8px 0; text-align: right; color: #059669;">Free</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0 0; font-size: 18px; font-weight: 700; color: #111827;">Total</td>
                    <td style="padding: 16px 0 0; text-align: right; font-size: 18px; font-weight: 700; color: #111827;">${formatCurrency(data.totalAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Shipping Address -->
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              <h3 style="margin: 0 0 12px; color: #111827; font-size: 16px; font-weight: 600;">Shipping Address</h3>
              <p style="margin: 0; color: #6b7280; line-height: 1.6;">
                ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
                ${data.shippingAddress.address}<br>
                ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zipCode}<br>
                ${data.shippingAddress.country}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Need help? Contact us at support@stride.com</p>
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">© 2024 STRIDE. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Order confirmation email request received");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: OrderConfirmationRequest = await req.json();
    console.log("Processing order confirmation for:", data.orderId);

    // Validate required fields
    if (!data.email || !data.orderId || !data.items || data.items.length === 0) {
      throw new Error("Missing required fields: email, orderId, or items");
    }

    const html = generateEmailHtml(data);

    // Send email - use your verified domain or Resend's test domain
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "onboarding@resend.dev";
    
    const emailResponse = await resend.emails.send({
      from: `STRIDE <${fromEmail}>`,
      to: [data.email],
      subject: `Order Confirmed - #${data.orderId.slice(0, 8).toUpperCase()}`,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
