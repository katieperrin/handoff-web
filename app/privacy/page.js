export const metadata = {
  title: 'Privacy Policy — The Handoffs',
};

const CONTACT_EMAIL = 'hello@thehandoffs.com'; // TODO: update to your actual contact email
const EFFECTIVE_DATE = 'February 26, 2026';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F6FB] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-1">The</p>
          <h1 className="text-3xl font-bold text-[#2D2040]">Handoff</h1>
          <p className="text-sm text-gray-400 mt-1">Luxury. Simplified.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 text-[#2D2040]">
          <div>
            <h2 className="text-2xl font-bold mb-1">Privacy Policy</h2>
            <p className="text-sm text-gray-400">Effective date: {EFFECTIVE_DATE}</p>
          </div>

          <Section title="1. Introduction">
            <p>
              The Handoffs ("we," "our," or "us") operates a luxury handbag rental membership service
              through our mobile application and website (collectively, the "Service"). This Privacy
              Policy explains what personal information we collect, how we use it, and your rights
              regarding that information.
            </p>
            <p className="mt-3">
              By creating an account or using the Service, you agree to the collection and use of
              information as described in this policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <Subsection title="Account Information">
              When you create an account, we collect your email address, phone number, and the
              password you choose (stored in hashed form — we never see your plain-text password).
            </Subsection>
            <Subsection title="Profile & Shipping Information">
              To ship bags to and from you, we collect your full name, street address, city, state,
              ZIP code, and optionally a phone number for shipping carrier use.
            </Subsection>
            <Subsection title="Payment Information">
              Payments are processed by Stripe. We do not store your credit card number, CVV, or
              full card details on our servers. Stripe may store payment method information on your
              behalf in accordance with their own privacy policy.
            </Subsection>
            <Subsection title="Bag Contribution Information">
              If you contribute a bag to the rental pool, we collect details about the bag (brand,
              model, condition, photos) and a pickup shipping address.
            </Subsection>
            <Subsection title="Usage Information">
              We collect information about how you interact with the Service, including rental
              history, credit transactions, and wishlist activity.
            </Subsection>
            <Subsection title="Device & Push Notification Tokens">
              If you grant permission, we collect your device's push notification token to send you
              updates about your rentals and account activity. This is optional and can be revoked
              in your device settings at any time.
            </Subsection>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>To create and manage your account</li>
              <li>To verify your identity via SMS one-time passcode (phone number verification)</li>
              <li>To process rental requests, shipments, and returns</li>
              <li>To charge your payment method for your membership subscription</li>
              <li>To calculate and award rental credits to bag owners</li>
              <li>To send you transactional emails and push notifications about your rentals and account</li>
              <li>To generate prepaid shipping labels for bag transport</li>
              <li>To notify you when a saved bag becomes available</li>
              <li>To improve and operate the Service</li>
            </ul>
          </Section>

          <Section title="4. Third-Party Services">
            <p className="text-sm text-gray-600 mb-3">
              We share data with the following third-party providers only as necessary to operate
              the Service:
            </p>
            <div className="space-y-3">
              {[
                { name: 'Supabase', purpose: 'Database, authentication, and file storage. Your account data, bag photos, and transaction records are stored on Supabase infrastructure.' },
                { name: 'Stripe', purpose: 'Payment processing for membership subscriptions. Stripe handles all credit card data and is PCI DSS compliant.' },
                { name: 'Twilio', purpose: 'SMS delivery for phone number verification (one-time passcodes) during sign-up and password reset.' },
                { name: 'Resend', purpose: 'Transactional email delivery (shipping notifications, credit summaries, action alerts).' },
                { name: 'EasyPost', purpose: 'Shipping label generation and package tracking. We share name and address information with EasyPost to create prepaid labels.' },
                { name: 'Expo', purpose: 'Mobile app hosting and push notification delivery for iOS and Android devices.' },
              ].map(({ name, purpose }) => (
                <div key={name} className="bg-[#F8F6FB] rounded-xl px-4 py-3">
                  <p className="text-sm font-semibold text-[#2D2040]">{name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{purpose}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              We do not sell your personal information to third parties. We do not share your data
              with advertisers or data brokers.
            </p>
          </Section>

          <Section title="5. Data Retention">
            <p>
              We retain your personal information for as long as your account is active or as needed
              to provide the Service. If you request account deletion, we will delete or anonymize
              your personal data within 30 days, except where we are required to retain records for
              legal or financial compliance purposes (e.g., billing records required by tax law).
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate information via your profile settings</li>
              <li><strong>Delete</strong> your account and associated personal data</li>
              <li><strong>Opt out</strong> of push notifications at any time in your device settings</li>
              <li><strong>Port</strong> your data in a machine-readable format upon request</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#7B5EA7] hover:underline font-medium">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </Section>

          <Section title="7. Security">
            <p>
              We use industry-standard security practices including encrypted connections (HTTPS),
              hashed passwords, and row-level security on our database. However, no method of
              transmission over the internet is 100% secure, and we cannot guarantee absolute
              security of your data.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              The Service is not directed to individuals under the age of 18. We do not knowingly
              collect personal information from anyone under 18. If you believe a minor has provided
              us with personal information, please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by email or through a notice in the app. Continued use of the Service after
              changes take effect constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <div className="mt-3 bg-[#F8F6FB] rounded-xl px-4 py-3">
              <p className="text-sm font-semibold text-[#2D2040]">The Handoffs</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-[#7B5EA7] hover:underline">
                {CONTACT_EMAIL}
              </a>
            </div>
          </Section>
        </div>

        <p className="text-center text-xs text-gray-300 mt-8">
          © {new Date().getFullYear()} The Handoffs. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-base font-bold text-[#2D2040] mb-3">{title}</h3>
      <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

function Subsection({ title, children }) {
  return (
    <div className="mb-3">
      <p className="text-sm font-semibold text-[#2D2040] mb-1">{title}</p>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  );
}
