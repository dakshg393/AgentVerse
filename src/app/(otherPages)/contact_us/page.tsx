'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/(shadcn)/ui/card';
import { Button } from '@/components/(shadcn)/ui/button';
import { Label } from '@/components/(shadcn)/ui/label';
import { Textarea } from '@/components/(shadcn)/ui/textarea';
import { Input } from '@/components/(shadcn)/ui/input';
import { ArrowLeftSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between  ">
      {/* Header */}
      <section className="w-full py-6  shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <Link href={'/'}>
            <Button className="w-10 left-0">
              <ArrowLeftSquare />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Card */}
      <section className="flex-grow py-12 px-4 flex items-center justify-center">
        <Card className="w-full max-w-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Name Field */}
              <div className="grid w-full gap-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>

              {/* Email Field */}
              <div className="grid w-full gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>

              {/* Message Field */}
              <div className="grid w-full gap-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="Write your message..." rows={5} required />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
