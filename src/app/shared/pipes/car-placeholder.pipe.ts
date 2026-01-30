import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'carPlaceholder',
    standalone: true
})
export class CarPlaceholderPipe implements PipeTransform {
    transform(imageUrl: string): string {
        // Return a base64 SVG car icon as placeholder
        const svgIcon = `data:image/svg+xml;base64,${btoa(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="carGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="#f0f4f8"/>
  <g transform="translate(50, 100)">
    <!-- Car body -->
    <path d="M 50 50 L 70 30 L 180 30 L 200 50 L 280 50 L 280 100 L 50 100 Z" fill="url(#carGrad)" stroke="#4a5568" stroke-width="3"/>
    <!-- Windows -->
    <path d="M 75 35 L 90 45 L 140 45 L 155 35 Z" fill="#e2e8f0" opacity="0.8"/>
    <rect x="160" y="35" width="35" height="15" fill="#e2e8f0" opacity="0.8"/>
    <!-- Wheels -->
    <circle cx="100" cy="110" r="20" fill="#2d3748" stroke="#1a202c" stroke-width="3"/>
    <circle cx="100" cy="110" r="10" fill="#cbd5e0"/>
    <circle cx="230" cy="110" r="20" fill="#2d3748" stroke="#1a202c" stroke-width="3"/>
    <circle cx="230" cy="110" r="10" fill="#cbd5e0"/>
    <!-- Details -->
    <rect x="60" y="60" width="30" height="15" rx="3" fill="#fbbf24"/>
    <rect x="240" y="60" width="30" height="15" rx="3" fill="#ef4444"/>
  </g>
  <text x="200" y="260" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#64748b" font-weight="600">Vehicle Image</text>
</svg>
    `)}`;

        return imageUrl || svgIcon;
    }
}
