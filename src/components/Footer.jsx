import { Mail, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1C1917] text-[#F3E8DF] pt-20 pb-10">
      <div className="premium-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-6">
              Aura Spices.
            </div>
            <p className="text-[#57534E] text-sm leading-relaxed mb-6">
              Sourcing the world's finest spices, directly from generations of passionate farmers to your kitchen.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="w-10 h-10 rounded-full bg-[#292524] flex items-center justify-center hover:bg-primary transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full bg-[#292524] flex items-center justify-center hover:bg-primary transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full bg-[#292524] flex items-center justify-center hover:bg-primary transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-[#57534E]">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/#collection" className="hover:text-primary transition-colors">Our Collection</Link></li>
              <li><Link to="/#story" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/#reviews" className="hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-[#57534E]">
              <li><Link to="/#collection" className="hover:text-primary transition-colors">Whole Spices</Link></li>
              <li><Link to="/#collection" className="hover:text-primary transition-colors">Ground Spices</Link></li>
              <li><Link to="/#collection" className="hover:text-primary transition-colors">Blended Masalas</Link></li>
              <li><Link to="/#collection" className="hover:text-primary transition-colors">Gift Boxes</Link></li>
              <li><Link to="/#collection" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-[#57534E]">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-primary shrink-0 mt-0.5" />
                <span>123 Spice Market Lane,<br />Heritage District, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary shrink-0" />
                <span>hello@auraspices.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#292524] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#57534E]">
          <p>&copy; {new Date().getFullYear()} Aura Spices. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-[#F3E8DF] transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-[#F3E8DF] transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-[#F3E8DF] transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
