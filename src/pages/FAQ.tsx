import { StaticPageLayout } from '@/components/StaticPageLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. Free shipping is available on orders over $100.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes! Once your order ships, you\'ll receive an email with tracking information. You can also track your order in your account dashboard.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 50 countries worldwide. International shipping times vary by destination, typically 7-14 business days.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer free returns within 30 days of purchase. Items must be unworn, in original packaging, with all tags attached.',
      },
      {
        q: 'How do I exchange an item?',
        a: 'To exchange an item, initiate a return through your account and place a new order for the desired item. This ensures you get your new size quickly.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        q: 'How do I find my size?',
        a: 'Check out our Size Guide for detailed measurements and fitting tips. If you\'re between sizes, we recommend sizing up for a more comfortable fit.',
      },
      {
        q: 'Are your shoes true to size?',
        a: 'Our shoes generally run true to size. However, some styles may fit differently. Check individual product pages for specific fit recommendations.',
      },
      {
        q: 'How do I care for my shoes?',
        a: 'We recommend using a soft brush or cloth to remove dirt. For deeper cleaning, use a mild soap and water solution. Allow shoes to air dry away from direct heat.',
      },
    ],
  },
  {
    category: 'Account & Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. We use industry-standard SSL encryption to protect your personal and payment information.',
      },
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page and enter your email. You\'ll receive a link to reset your password.',
      },
    ],
  },
];

const FAQ = () => {
  return (
    <StaticPageLayout title="Frequently Asked Questions">
      <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
        Find answers to common questions about orders, shipping, returns, and more. 
        Can't find what you're looking for? Contact our support team.
      </p>

      <div className="space-y-12">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
            <Accordion type="single" collapsible className="bg-card rounded-xl border border-border">
              {section.questions.map((faq, index) => (
                <AccordionItem key={index} value={`${section.category}-${index}`}>
                  <AccordionTrigger className="px-6 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </StaticPageLayout>
  );
};

export default FAQ;
