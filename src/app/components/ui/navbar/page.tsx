'use client'
import Link from "next/link";
import { useState } from "react"

export default function NavigationBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div>
        <nav>
          <section className="mobile-nav-closed flex lg:hidden">
            <div
              className="hamburger-icon space-y-2 mt-4 ml-4"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="cross-icon absolute top-0 right-0 px-4 py-4"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <div className="mobile-nav-open flex flex-col items-center justify-between min-h-[250px]">
                <nav className="left-nav">
                  <Link onClick={() => setIsNavOpen((prev) => !prev)} className="m-8" href="/">Home</Link>
                  <Link onClick={() => setIsNavOpen((prev) => !prev)} className="m-8" href="/about">About</Link>
                </nav>
                <nav className="right-nav">
                  <Link onClick={() => setIsNavOpen((prev) => !prev)} className="m-8" href="/">Search</Link>
                  <Link onClick={() => setIsNavOpen((prev) => !prev)} className="m-8" href="/login">Sign In</Link>
                  <Link onClick={() => setIsNavOpen((prev) => !prev)} className="m-8" href="/subscribe">Subscribe</Link>
                </nav>
              </div>
            </div>
          </section>
        </nav>
        <div className="desktop-navigation-bar hidden lg:flex lg:justify-between mt-4">
          <nav className="left-nav">
            <Link className="m-8" href="/">Home</Link>
            <Link className="m-8" href="/about">About</Link>
          </nav>
          <nav className="mid-nav">
            <Link href="/">Dominick Smith</Link>
          </nav>
          <nav className="right-nav">
            <Link className="m-8" href="/">Search</Link>
            <Link className="m-8" href="/login">Sign In</Link>
            <Link className="m-8" href="/subscribe">Subscribe</Link>
          </nav>
        </div>
      </div>

      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }

      .hamburger-icon:hover {
        cursor: pointer;
      }

      .cross-icon:hover {
        cursor: pointer;
      }
    `}</style>
    </>
  )
}
