"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";
import { DxzLogo } from "@/components/ui/dxz-logo-mark";

/** lucide-react in this project dropped brand/logo icons, so the Instagram
 *  glyph is drawn inline in lucide's own stroke style (24x24, currentColor). */
function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Get Started",
    links: [
      {
        label: "Book a Discovery Call",
        href: "https://cal.com/dxz-automation",
        external: true,
      },
    ],
  },
];

const contactInfo = [
  {
    icon: <Mail size={18} className="text-red-500" />,
    text: "recover-revenue@dxz-automation.com",
    href: "mailto:recover-revenue@dxz-automation.com",
  },
  {
    icon: <Phone size={18} className="text-red-500" />,
    text: "+1 587-439-8181",
    href: "tel:+15874398181",
  },
  {
    icon: <MapPin size={18} className="text-red-500" />,
    text: "Calgary, AB",
  },
  {
    icon: <InstagramIcon size={18} className="text-red-500" />,
    text: "@dxz.automation",
    href: "https://www.instagram.com/dxz.automation?utm_source=qr",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden mx-0 mt-8">
      <div className="max-w-7xl mx-auto px-14 pt-14 z-40 relative">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {/* Brand section */}
          <div className="flex flex-col space-y-4 lg:max-w-[240px]">
            <DxzLogo
              iconClassName="w-9 shrink-0 sm:w-[53px] md:w-[53px] lg:w-[53px]"
              dxzClassName="text-[21px] sm:text-[30px] md:text-[30px] lg:text-[30px]"
              dxzGapClassName="-mb-[6.5px] sm:-mb-[7px] md:-mb-[7px] lg:-mb-[7px]"
              underlineClassName="h-[2px] sm:h-[3px] md:h-[3px] lg:h-[3px] my-0.5 sm:my-0.5 md:my-0.5 lg:my-0.5"
              automationClassName="text-[9px] sm:text-[13px] md:text-[13px] lg:text-[13px]"
              automationGapClassName="-mt-[3px] sm:-mt-[4px] md:-mt-[4px] lg:-mt-[4px]"
            />
            <p className="text-sm leading-relaxed">
              AI automation systems that recover lost revenue — live in 7 days.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:max-w-[240px]">
              <h4 className="text-red-500 text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="hover:text-red-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div className="lg:max-w-[240px]">
            <h4 className="text-red-500 text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      {...("external" in item && item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="hover:text-red-500 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="hover:text-red-500 transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright — sits left, directly above the divider */}
        <p className="mt-8 text-sm">
          &copy; {new Date().getFullYear()} DXZ Automation. All rights reserved.
        </p>
      </div>

      <hr
        id="footer-divider"
        className="relative z-40 border-t border-red-500/20 mx-[1cm] mt-8 mb-[1cm]"
      />

      {/* Text hover effect — same width as the divider (mx-[1cm]), height matched to the SVG's own
          800:200 viewBox ratio so the wordmark fills the box with no dead space above/below */}
      <div
        id="footer-wordmark"
        className="hidden lg:flex items-center justify-center mx-[1cm] mb-[1cm] aspect-[4/1]"
      >
        <TextHoverEffect text="DXZ AUTOMATION" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
