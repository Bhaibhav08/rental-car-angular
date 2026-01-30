import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="min-height: 100vh; background: #ffffff;">
      <!-- Navigation Header -->
      <nav style="background: white; border-bottom: 1px solid #e5e7eb; padding: 20px 0; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <svg style="width: 24px; height: 24px; color: white;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <span style="font-size: 24px; font-weight: 800; color: #1f2937;">RentalCar</span>
          </div>
          <div style="display: flex; gap: 16px; align-items: center;">
            <a href="#features" style="color: #6b7280; text-decoration: none; font-weight: 500; font-size: 15px;">Features</a>
            <a href="#about" style="color: #6b7280; text-decoration: none; font-weight: 500; font-size: 15px;">About</a>
            <a routerLink="/login" style="padding: 10px 24px; background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; transition: all 0.3s;">
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section style="padding: 80px 24px; background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);">
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
            <!-- Left Content -->
            <div>
              <h1 style="font-size: 48px; font-weight: 800; color: #111827; line-height: 1.2; margin: 0 0 24px 0;">
                Premium Car Rental Service for Every Journey
              </h1>
              <p style="font-size: 18px; color: #6b7280; line-height: 1.7; margin: 0 0 32px 0;">
                Experience the freedom of the road with our premium fleet. From economy to luxury, we have the perfect vehicle for your needs.
              </p>
              <div style="display: flex; gap: 16px;">
                <a routerLink="/login" style="padding: 16px 32px; background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4); transition: all 0.3s;">
                  Get Started
                </a>
                <a href="#about" style="padding: 16px 32px; background: white; color: #1f2937; border: 2px solid #1f2937; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px; transition: all 0.3s;">
                  Learn More
                </a>
              </div>
            </div>

            <!-- Right Image/Graphic -->
            <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-radius: 20px; padding: 60px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
              <svg style="width: 100%; max-width: 300px; height: auto; color: white;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" style="padding: 80px 24px; background: white;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 60px;">
            <h2 style="font-size: 36px; font-weight: 800; color: #111827; margin: 0 0 16px 0;">Why Choose Us</h2>
            <p style="font-size: 18px; color: #6b7280; max-width: 600px; margin: 0 auto;">
              We provide exceptional service and premium vehicles to make your journey memorable
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
            <!-- Feature 1 -->
            <div style="padding: 32px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <svg style="width: 28px; height: 28px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">Premium Fleet</h3>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0;">
                Choose from our extensive collection of 30+ vehicles ranging from economy to luxury cars
              </p>
            </div>

            <!-- Feature 2 -->
            <div style="padding: 32px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-center; margin-bottom: 20px;">
                <svg style="width: 28px; height: 28px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">Instant Booking</h3>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0;">
                Book your perfect vehicle in seconds with our streamlined reservation process
              </p>
            </div>

            <!-- Feature 3 -->
            <div style="padding: 32px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-center; margin-bottom: 20px;">
                <svg style="width: 28px; height: 28px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">Secure & Safe</h3>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0;">
                Your security is our priority with encrypted payments and verified vehicles
              </p>
            </div>

            <!-- Feature 4 -->
            <div style="padding: 32px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-center; margin-bottom: 20px;">
                <svg style="width: 28px; height: 28px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">Best Prices</h3>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0;">
                Competitive pricing with no hidden fees - transparent and affordable rates
              </p>
            </div>

            <!-- Feature 5 -->
            <div style="padding: 32px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-center; margin-bottom: 20px;">
                <svg style="width: 28px; height: 28px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">24/7 Support</h3>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0;">
                Our dedicated team is available round the clock to assist you
              </p>
            </div>

            <!-- Feature 6 -->
            <div style="padding: 32px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-center; margin-bottom: 20px;">
                <svg style="width: 28px; height: 28px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">Verified Vehicles</h3>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0;">
                All vehicles are regularly maintained and thoroughly inspected
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" style="padding: 80px 24px; background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);">
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
            <!-- Left Content -->
            <div>
              <h2 style="font-size: 36px; font-weight: 800; color: #111827; margin: 0 0 24px 0;">About RentalCar</h2>
              <p style="font-size: 16px; color: #6b7280; line-height: 1.8; margin: 0 0 20px 0;">
                RentalCar is your trusted partner for premium vehicle rentals. With over a decade of experience in the industry, we've built a reputation for excellence, reliability, and customer satisfaction.
              </p>
              <p style="font-size: 16px; color: #6b7280; line-height: 1.8; margin: 0 0 20px 0;">
                Our extensive fleet includes everything from economical hatchbacks for city exploration to luxurious sedans and spacious SUVs for family adventures. We're committed to providing you with a seamless booking experience and well-maintained vehicles that ensure your journey is comfortable and safe.
              </p>
              <p style="font-size: 16px; color: #6b7280; line-height: 1.8; margin: 0 0 32px 0;">
                Whether you're a business traveler, tourist, or local resident, RentalCar has the perfect vehicle to meet your needs. Join thousands of satisfied customers who trust us for their transportation needs.
              </p>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
                <div>
                  <div style="font-size: 32px; font-weight: 800; color: #1f2937; margin-bottom: 8px;">30+</div>
                  <div style="font-size: 14px; color: #6b7280; font-weight: 500;">Premium Vehicles</div>
                </div>
                <div>
                  <div style="font-size: 32px; font-weight: 800; color: #1f2937; margin-bottom: 8px;">5000+</div>
                  <div style="font-size: 14px; color: #6b7280; font-weight: 500;">Happy Customers</div>
                </div>
                <div>
                  <div style="font-size: 32px; font-weight: 800; color: #1f2937; margin-bottom: 8px;">10+</div>
                  <div style="font-size: 14px; color: #6b7280; font-weight: 500;">Years Experience</div>
                </div>
              </div>
            </div>

            <!-- Right Stats -->
            <div style="background: white; border-radius: 20px; padding: 48px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
              <h3 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 24px 0;">Our Mission</h3>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.7; margin: 0 0 24px 0;">
                To provide accessible, reliable, and premium car rental services that empower people to explore, travel, and conduct business with confidence and convenience.
              </p>
              <h3 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 24px 0;">Our Values</h3>
              <ul style="margin: 0; padding: 0; list-style: none;">
                <li style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px; color: #6b7280;">Customer Satisfaction First</li>
                <li style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px; color: #6b7280;">Transparency & Honesty</li>
                <li style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px; color: #6b7280;">Quality & Reliability</li>
                <li style="padding: 12px 0; font-size: 15px; color: #6b7280;">Innovation & Excellence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section style="padding: 80px 24px; background: linear-gradient(135deg, #1f2937 0%, #111827 100%);">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <h2 style="font-size: 36px; font-weight: 800; color: white; margin: 0 0 16px 0;">Ready to Start Your Journey?</h2>
          <p style="font-size: 18px; color: rgba(255,255,255,0.9); margin: 0 0 32px 0;">
            Join thousands of satisfied customers. Sign in now to browse our fleet and book your perfect vehicle.
          </p>
          <a routerLink="/login" style="padding: 16px 48px; background: white; color: #1f2937; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 8px 20px rgba(0,0,0,0.15); transition: all 0.3s;">
            Sign In / Sign Up
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer style="background: #1f2937; padding: 60px 24px 24px; color: white;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; margin-bottom: 40px;">
            <div>
              <h4 style="font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">RentalCar</h4>
              <p style="font-size: 14px; color: #9ca3af; line-height: 1.6; margin: 0;">
                Premium car rental service for every journey. Your trusted transportation partner.
              </p>
            </div>
            <div>
              <h4 style="font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">Quick Links</h4>
              <ul style="margin: 0; padding: 0; list-style: none;">
                <li style="margin-bottom: 8px;"><a href="#features" style="color: #9ca3af; text-decoration: none; font-size: 14px;">Features</a></li>
                <li style="margin-bottom: 8px;"><a href="#about" style="color: #9ca3af; text-decoration: none; font-size: 14px;">About Us</a></li>
                <li style="margin-bottom: 8px;"><a routerLink="/login" style="color: #9ca3af; text-decoration: none; font-size: 14px;">Sign In</a></li>
              </ul>
            </div>
            <div>
              <h4 style="font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">Contact</h4>
              <ul style="margin: 0; padding: 0; list-style: none;">
                <li style="margin-bottom: 8px; color: #9ca3af; font-size: 14px;">contact@rentalcar.com</li>
                <li style="margin-bottom: 8px; color: #9ca3af; font-size: 14px;">+1 (555) 123-4567</li>
                <li style="color: #9ca3af; font-size: 14px;">24/7 Support Available</li>
              </ul>
            </div>
            <div>
              <h4 style="font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">Follow Us</h4>
              <div style="display: flex; gap: 12px;">
                <a href="#" style="width: 36px; height: 36px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                  <span style="color: white;">f</span>
                </a>
                <a href="#" style="width: 36px; height: 36px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                  <span style="color: white;">t</span>
                </a>
                <a href="#" style="width: 36px; height: 36px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                  <span style="color: white;">in</span>
                </a>
              </div>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 14px;">
              © 2024 RentalCar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class LandingComponent { }
