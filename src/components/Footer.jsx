"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Github, Dribbble, Mail } from "lucide-react";

export default function FooterCom() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-muted/30 backdrop-blur-sm">
      {/* Decorative Gradient Line */}
      <div className="h-[3px] bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500"></div>

      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* Brand */}
          <div className="mt-5">
            <Link
              href="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Piv
              </span>{" "}
              Blog
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Discover insightful stories, guides, and tips about web development and creativity.
            </p>
          </div>

          {/* Link Groups */}
          <div className="grid grid-cols-2 gap-8 mt-6 sm:grid-cols-4 sm:gap-6">
            {/* About */}
            <div className="ml-4 sm:ml-10">
  <h3 className="text-sm font-semibold text-foreground mb-3">
    About
  </h3>
  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
    <li>
      <Link
        href="https://www.100jsprojects.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        100 JS Projects
      </Link>
    </li>
    <li>
      <Link
        href="/about"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        Piv&apos;s Blog
      </Link>
    </li>
  </ul>
</div>            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Follow us
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="https://github.com/sahandghavidel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Contact
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="natanmuleta77@gmail.com"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />natanmuleta77@gmail.com   </Link>
                </li>
                <li>
                  <p>0954913498</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-6" />

        {/* Bottom Section */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {year} Piv Blog. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-end gap-5">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#">
                <Facebook className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#">
                <Instagram className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#">
                <Twitter className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/natanmuletahunde"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#">
                <Dribbble className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
