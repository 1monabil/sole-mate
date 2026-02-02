import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <StaticPageLayout title="Terms of Service">
      <div className="max-w-3xl prose prose-invert">
        <p className="text-muted-foreground text-lg mb-8">
          Last updated: January 1, 2026
        </p>

        <p className="text-muted-foreground mb-8">
          Welcome to STRIDE. By accessing or using our website, you agree to be bound by these 
          Terms of Service. Please read them carefully before using our services.
        </p>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using STRIDE's website and services, you accept and agree to be 
            bound by these Terms of Service and our Privacy Policy. If you do not agree to 
            these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Use of Our Services</h2>
          <p className="text-muted-foreground mb-4">
            You agree to use our services only for lawful purposes. You may not:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the rights of others</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of our website</li>
            <li>Use our services for fraudulent purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
          <p className="text-muted-foreground">
            To access certain features, you may need to create an account. You are responsible 
            for maintaining the confidentiality of your account credentials and for all 
            activities that occur under your account. You must provide accurate and complete 
            information when creating an account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Products and Pricing</h2>
          <p className="text-muted-foreground">
            We strive to provide accurate product descriptions and pricing. However, errors 
            may occur. We reserve the right to correct any errors and to change prices without 
            notice. If a product is listed at an incorrect price, we may cancel your order and 
            notify you of the cancellation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Orders and Payment</h2>
          <p className="text-muted-foreground">
            By placing an order, you agree to pay the total amount shown at checkout. We accept 
            various payment methods as displayed on our website. All payments are processed 
            securely through our payment partners. We reserve the right to refuse or cancel 
            any order for any reason.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Shipping and Delivery</h2>
          <p className="text-muted-foreground">
            Delivery times are estimates and not guarantees. We are not responsible for delays 
            caused by shipping carriers, customs, or circumstances beyond our control. Risk of 
            loss transfers to you upon delivery to the carrier.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Returns and Refunds</h2>
          <p className="text-muted-foreground">
            Please refer to our Returns Policy for information about returns and refunds. 
            By making a purchase, you agree to the terms of our Returns Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content on our website, including text, graphics, logos, images, and software, 
            is the property of STRIDE or its licensors and is protected by intellectual property 
            laws. You may not reproduce, distribute, or create derivative works without our 
            written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the maximum extent permitted by law, STRIDE shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages arising from your use of our 
            services. Our total liability shall not exceed the amount you paid for the product 
            or service in question.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
          <p className="text-muted-foreground">
            You agree to indemnify and hold harmless STRIDE and its affiliates from any claims, 
            damages, or expenses arising from your violation of these Terms or your use of our 
            services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We may update these Terms from time to time. Continued use of our services after 
            changes constitutes acceptance of the new Terms. We encourage you to review these 
            Terms periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms shall be governed by the laws of the State of New York, without regard 
            to its conflict of law provisions. Any disputes shall be resolved in the courts of 
            New York County, New York.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about these Terms, please contact us at:
          </p>
          <p className="text-muted-foreground mt-4">
            <strong>Email:</strong> legal@stride.com<br />
            <strong>Address:</strong> 123 Stride Avenue, New York, NY 10001
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
};

export default Terms;
