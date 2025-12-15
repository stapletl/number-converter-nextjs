# Number Converter

I got tired of having to hit the "convert" button when using online base converter calculators, so here we are. Check out the deployed app here:
https://number-converter-nextjs.vercel.app/

A modern, real-time number base converter built with Next.js 16 and React 19. Convert numbers seamlessly between decimal, binary, hexadecimal, and octal number systems with an intuitive interface and dark mode support.

## Features

- **Real-time Conversion**: Instantly convert numbers between different bases as you type
- **Multiple Number Bases**: Support for Decimal (base 10), Binary (base 2), Hexadecimal (base 16), and Octal (base 8)
- **Dark Mode**: Beautiful dark/light theme with smooth transitions and system preference detection
- **Modern UI**: Clean, responsive interface built with shadcn/ui and Tailwind CSS
- **Type-safe**: Fully typed with TypeScript for better development experience

## Tech Stack

- **Framework**: Next.js 16.0.5
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Theme**: next-themes for dark mode support
- **Icons**: Lucide React
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your machine

### Development

1. Install dependencies:

```bash
bun install
```

2. Run the development server:

```bash
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
bun run build
bun start
```

## How It Works

The converter uses a custom base conversion algorithm that:

1. Accepts input in any supported base (2, 8, 10, 16, 32, 64, custom)
2. Converts the input to decimal (base 10) as an intermediate step
3. Converts from decimal to the target base for display
4. Validates input to ensure only valid digits for each base are accepted

All conversions happen in real-time as you type, providing instant feedback across all number bases.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
