import './globals.css'

export const metadata = {
  title: 'Simple Store',
  description: 'A simple store built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}