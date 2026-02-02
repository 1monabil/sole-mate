import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <StaticPageLayout title="Privacy Policy">
      <div className="max-w-3xl prose prose-invert">
        <p className="text-muted-foreground text-lg mb-8">
          Last updated: January 1, 2026
        </p>

        <p className="text-muted-foreground mb-8">
          At STRIDE, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website or make a purchase.
        </p>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We collect information you provide directly to us, such as when you:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Create an account or make a purchase</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact our customer service team</li>
            <li>Participate in surveys or promotions</li>
            <li>Leave reviews or comments</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send you order confirmations and updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
          <p className="text-muted-foreground">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>Service providers who help us operate our business</li>
            <li>Payment processors for secure transactions</li>
            <li>Shipping partners to deliver your orders</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cookies</h2>
          <p className="text-muted-foreground">
            We use cookies and similar technologies to enhance your browsing experience, 
            analyze site traffic, and personalize content. You can control cookie preferences 
            through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your 
            personal information. However, no method of transmission over the Internet is 
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our services are not directed to children under 13. We do not knowingly collect 
            personal information from children under 13. If we learn we have collected such 
            information, we will delete it promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-muted-foreground mt-4">
            <strong>Email:</strong> privacy@stride.com<br />
            <strong>Address:</strong> 123 Stride Avenue, New York, NY 10001
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
};

export default Privacy;
