'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/(shadcn)/ui/card";
import { Button } from "@/components/(shadcn)/ui/button";
import { ArrowLeftSquare } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <section className="w-full min-h-screen px-4 py-10 flex flex-col items-center bg-muted">
      {/* Back Button */}
      <div className="self-start mb-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowLeftSquare className="w-4 h-4" />
            Home
          </Button>
        </Link>
      </div>

      {/* Privacy Policy Card */}
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
          <p><strong>Effective Date:</strong> 22/5/2025</p>

          <p>
            At <strong>AgentVerse</strong>, your privacy is our priority. This Privacy Policy describes how we collect, use, and safeguard your personal information when you visit our website or use our services.
          </p>

          <h2 className="text-base font-semibold text-primary">1. Information We Collect</h2>
          <ul className="list-disc list-inside">
            <li><strong>Personal Information:</strong> Such as name, email address, and contact details that you voluntarily provide.</li>
            <li><strong>Usage Data:</strong> Information like pages visited, time spent, and clicks, used for analytics.</li>
            <li><strong>Cookies & Tracking:</strong> Technologies that help us improve user experience and performance.</li>
          </ul>

          <h2 className="text-base font-semibold text-primary">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside">
            <li>Provide and maintain our services</li>
            <li>Communicate with you for support or updates</li>
            <li>Analyze usage to improve user experience</li>
            <li>Prevent fraud and ensure site security</li>
          </ul>

          <h2 className="text-base font-semibold text-primary">3. Sharing Your Information</h2>
          <p>We do <strong>not sell</strong> your personal data. We may share information with:</p>
          <ul className="list-disc list-inside">
            <li>Trusted service providers for operational support</li>
            <li>Law enforcement if required to comply with legal obligations</li>
          </ul>

          <h2 className="text-base font-semibold text-primary">4. Your Rights and Choices</h2>
          <ul className="list-disc list-inside">
            <li>Access and update your personal data</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of non-essential communications</li>
          </ul>
          <p>
            Contact us at <a href="mailto:[your@email.com]" className="text-blue-600 underline">[your@email.com]</a>
            to make such requests.
          </p>

          <h2 className="text-base font-semibold text-primary">5. Data Security</h2>
          <p>We use industry-standard measures to protect your data from unauthorized access, loss, or misuse.</p>

          <h2 className="text-base font-semibold text-primary">6. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.</p>

          <h2 className="text-base font-semibold text-primary">7. Updates to This Policy</h2>
          <p>This policy may be updated periodically. All changes will be posted on this page with an updated effective date.</p>

          <h2 className="text-base font-semibold text-primary">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, feel free to contact us:</p>
          <p><strong>Email:</strong> <a href="mailto:[your@email.com]" className="text-blue-600 underline">
            [your@email.com]</a></p>
          <p><strong>Address:</strong> [Your Company Address]</p>
        </CardContent>
      </Card>
    </section>
  );
}
