import Link from 'next/link';
import { Crown, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold text-white">Theater My Life</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the magic of cinema with premium comfort, state-of-the-art technology, 
              and the latest blockbusters. Your perfect movie experience starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/theaters" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Theaters
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/food" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Food & Drinks
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400 text-sm">
                  !96 Nguyen Thi Minh Khai, Ho Chi Minh City
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400 text-sm">
                  +84906000000
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-yellow-500" />  
                <span className="text-gray-400 text-sm">
                  delvintrung@example.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Theater My Life. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
                Accessibility
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
              <Link href="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
