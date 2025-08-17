import Link from "next/link";

export default function NavigationBar() {
  return (
    <>
      <nav className="flex justify-around">
        <h1>DominickCS - Blog</h1>
        <Link href="/">Home</Link>
        <Link href="/">Articles</Link>
        <Link href="/">Home</Link>
      </nav>
    </>
  )
}
