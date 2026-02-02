import { StaticPageLayout } from '@/components/StaticPageLayout';
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Returns = () => {
  return (
    <StaticPageLayout title="Returns & Exchanges">
      <div className="max-w-4xl">
        <p className="text-muted-foreground text-lg mb-12">
          We want you to love your STRIDE shoes. If something isn't right, 
          we make returns and exchanges easy.
        </p>

        {/* Return Policy Highlights */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-12">
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">30-Day Free Returns</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Return any unworn items within 30 days of delivery for a full refund. 
            No questions asked. We'll even cover the return shipping.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-secondary rounded-xl">
              <p className="text-3xl font-black text-primary">30</p>
              <p className="text-sm text-muted-foreground">Days to Return</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-xl">
              <p className="text-3xl font-black text-primary">Free</p>
              <p className="text-sm text-muted-foreground">Return Shipping</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-xl">
              <p className="text-3xl font-black text-primary">5-7</p>
              <p className="text-sm text-muted-foreground">Days for Refund</p>
            </div>
          </div>
        </div>

        {/* Eligible vs Not Eligible */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold">Eligible for Return</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Unworn shoes in original condition</li>
              <li>• Items in original packaging</li>
              <li>• All tags and labels attached</li>
              <li>• Returned within 30 days</li>
              <li>• Accompanied by proof of purchase</li>
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold">Not Eligible</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Worn or used items</li>
              <li>• Items without original packaging</li>
              <li>• Items marked as final sale</li>
              <li>• Customized or personalized items</li>
              <li>• Items returned after 30 days</li>
            </ul>
          </div>
        </div>

        {/* How to Return */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Return</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Start Your Return</h3>
                <p className="text-muted-foreground">
                  Log into your account and go to your order history. Select the item you want to return.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Print Your Label</h3>
                <p className="text-muted-foreground">
                  We'll email you a prepaid return shipping label. Print it and attach it to your package.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Ship It Back</h3>
                <p className="text-muted-foreground">
                  Drop off your package at any authorized shipping location. Keep your receipt!
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Get Your Refund</h3>
                <p className="text-muted-foreground">
                  Once we receive and inspect your return, we'll process your refund within 5-7 business days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Note */}
        <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Need Help?</h3>
              <p className="text-muted-foreground">
                If you have any questions about returns or need assistance, 
                our customer service team is here to help. Contact us at support@stride.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default Returns;
