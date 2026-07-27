import { Product, Order } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    _id: 'prod_m1',
    name: 'Apex Ultra 5G Titanium Smartphone',
    slug: 'apex-ultra-5g-smartphone',
    description: 'Flagship 6.8" 120Hz LTPO AMOLED display with 200MP Quad Camera system, Titanium frame, Snapdragon 8 Gen 3 processor, and 5000mAh battery.',
    price: 1199.99,
    originalPrice: 1299.99,
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviewCount: 240,
    badge: 'Flagship',
    tags: ['5G', '200MP Camera', 'Titanium', 'OLED 120Hz', 'Fast Charge'],
    features: [
      '6.8-inch 120Hz LTPO AMOLED Display',
      '200MP Pro-Grade Camera with 100x Space Zoom',
      'Aerospace-Grade Titanium Armor Frame',
      '45W Super Fast Wireless & Wired Charging'
    ]
  },
  {
    _id: 'prod_m2',
    name: 'Z-Fold Horizon Flex 5G Smartphone',
    slug: 'z-fold-horizon-flex-smartphone',
    description: 'Next-gen foldable 7.6" Dynamic AMOLED 2X display, dual hinge armor, ultra-thin glass, and multitasking split-screen capability.',
    price: 1499.99,
    originalPrice: 1699.99,
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 112,
    badge: 'Foldable Top',
    tags: ['Foldable', '5G', 'Dual Screen', 'Stylus Ready'],
    features: [
      '7.6-inch Foldable Dynamic AMOLED 2X Inner Screen',
      'Under-Display Camera technology',
      'Flex Mode hands-free video calls & photography',
      'IPX8 Water Resistance'
    ]
  },
  {
    _id: 'prod_l1',
    name: 'ProBook Studio M3 Max Laptop 16"',
    slug: 'probook-studio-m3-max-laptop',
    description: 'Ultimate power station for creators with 16-Core CPU, 40-Core GPU, 36GB Unified Memory, 1TB SSD, and 22-hour battery life.',
    price: 2499.99,
    originalPrice: 2699.99,
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 20,
    rating: 4.95,
    reviewCount: 310,
    badge: 'Bestseller',
    tags: ['Laptop', 'M3 Max', '16-inch', 'Studio Grade', '1TB SSD'],
    features: [
      '16.2-inch Liquid Retina XDR 120Hz ProMotion Display',
      '16-Core CPU and 40-Core GPU Monster Performance',
      '36GB Unified Ultra-Speed RAM',
      '6-Speaker Sound System with Spatial Audio'
    ]
  },
  {
    _id: 'prod_l2',
    name: 'Zenith Slim OLED Touch Ultrabook 14"',
    slug: 'zenith-slim-oled-ultrabook',
    description: 'Ultra-portable 1.2kg magnesium chassis with 2.8K 120Hz OLED Touchscreen, Intel Core Ultra 9, and AI NPU acceleration.',
    price: 1299.99,
    originalPrice: 1449.99,
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 28,
    rating: 4.7,
    reviewCount: 95,
    badge: 'Ultra Thin',
    tags: ['OLED Touch', 'Ultrabook', 'AI PC', 'Lightweight'],
    features: [
      '14-inch 2.8K 120Hz OLED Touch Screen',
      'Intel Core Ultra 9 Processor with NPU AI Engine',
      'Featherlight 1.18kg All-Metal Design',
      'Fast Charge: 60% in 45 Minutes'
    ]
  },
  {
    _id: 'prod_tv1',
    name: 'VividVision 65" 4K OLED Smart TV',
    slug: 'vividvision-65-4k-oled-smart-tv',
    description: 'Infinite contrast OLED panel with 120Hz G-Sync & FreeSync gaming support, Dolby Vision IQ, and AI Atmos sound speaker system.',
    price: 1799.99,
    originalPrice: 2099.99,
    category: 'TV',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 10,
    rating: 4.9,
    reviewCount: 185,
    badge: 'Top Rated',
    tags: ['OLED', '4K TV', '120Hz', 'Dolby Vision', 'Smart TV'],
    features: [
      'Self-lit OLED pixels for perfect blacks and infinite contrast',
      '4x HDMI 2.1 ports supporting 4K @ 120Hz VRR',
      'webOS Smart TV platform with voice remote',
      'Dolby Atmos & DTS:X 60W Built-in Audio'
    ]
  },
  {
    _id: 'prod_tv2',
    name: 'CineMax 55" Neo QLED 8K Smart TV',
    slug: 'cinemax-55-neo-qled-8k-smart-tv',
    description: 'Quantum Mini LED backlight technology with Real 8K AI Upscaling, Infinity Bezel-less screen, and multi-view split screen mode.',
    price: 1399.99,
    originalPrice: 1599.99,
    category: 'TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 14,
    rating: 4.8,
    reviewCount: 78,
    badge: '8K Ultra High-Def',
    tags: ['8K TV', 'QLED', 'Mini-LED', 'Bezel-less'],
    features: [
      'Quantum Matrix Tech with Mini LEDs',
      '8K AI Neural Quantum Processor',
      'Object Tracking Sound+ (OTS+)',
      'Anti-Reflection matte screen coating'
    ]
  },
  {
    _id: 'prod_r1',
    name: 'FrostGuard Smart French Door Refrigerator 600L',
    slug: 'frostguard-smart-french-door-refrigerator',
    description: 'InstaView glass panel door, Dual Auto Ice Maker with Craft Ice, UVnano water dispenser, and Smart ThinQ Wi-Fi cooling.',
    price: 1899.99,
    originalPrice: 2199.99,
    category: 'Refrigerator',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 8,
    rating: 4.85,
    reviewCount: 64,
    badge: 'Smart Appliance',
    tags: ['French Door', 'InstaView', 'Smart Fridge', '600L', 'Inverter'],
    features: [
      'Knock twice on InstaView glass to see inside without losing cold air',
      'Dual Auto Ice Maker produces cubical & slow-melting sphere ice',
      'Linear Inverter Compressor with 10-Year Warranty',
      'Wi-Fi App Control for temperature and door alerts'
    ]
  },
  {
    _id: 'prod_r2',
    name: 'EcoCool Double Door Inverter Refrigerator 350L',
    slug: 'ecocool-double-door-inverter-refrigerator',
    description: '5-Star Energy efficient convertible 5-in-1 refrigerator with Twin Cooling Plus, deodorizer filter, and stabilizer-free operation.',
    price: 849.99,
    originalPrice: 999.99,
    category: 'Refrigerator',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 19,
    rating: 4.75,
    reviewCount: 142,
    badge: 'Energy Star 5',
    tags: ['Double Door', 'Inverter', 'Convertible', 'Eco Cooling'],
    features: [
      '5-in-1 Convertible Modes (Normal, Extra Fridge, Seasonal, Vacation, Home Alone)',
      'Digital Inverter Compressor saves up to 50% power',
      'Fresh Room compartment preserves veggies for 15 days',
      'Stabilizer-free operation from 100V to 300V'
    ]
  },
  {
    _id: 'prod_ac1',
    name: 'BreezePro 1.5 Ton 5-Star Inverter Split AC',
    slug: 'breezepro-1-5-ton-inverter-split-ac',
    description: 'Heavy duty 100% Copper Dual Inverter Split AC with PM 2.5 Air Filter, 4-Way Air Swing, 52°C Ambient Cooling, and Wi-Fi Smart Control.',
    price: 749.99,
    originalPrice: 899.99,
    category: 'Air Conditioner',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 22,
    rating: 4.8,
    reviewCount: 190,
    badge: '5 Star Rated',
    tags: ['Split AC', '1.5 Ton', 'Inverter', 'PM 2.5 Filter', 'Smart AC'],
    features: [
      'Dual Rotary Inverter Compressor for 60% Energy Savings',
      'Cools effectively even at 52°C extreme summer heat',
      'Anti-Viral PM 2.5 Air Purification Filter',
      'Alexa & Google Home Voice Command Enabled'
    ]
  },
  {
    _id: 'prod_ac2',
    name: 'TurboChill Smart Dual Inverter AC 2.0 Ton',
    slug: 'turbochill-smart-dual-inverter-ac-2ton',
    description: 'High capacity 2.0 Ton Inverter Split Air Conditioner with Super Turbo Cool (18°C in 30 sec), Gold Fin condenser protection, and ultra-quiet 21dB operation.',
    price: 949.99,
    originalPrice: 1099.99,
    category: 'Air Conditioner',
    image: 'https://images.unsplash.com/photo-1631545806609-b47fa2c03847?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 84,
    badge: 'Super Turbo Cool',
    tags: ['2.0 Ton', 'Heavy Duty', 'Inverter AC', 'Gold Fin'],
    features: [
      '2.0 Ton High Cooling Capacity for Large Living Rooms',
      'Super Turbo Mode cools room instantly in 30 seconds',
      '100% Grooved Copper Tubes with Gold Fin Anti-Corrosion',
      'Whisper quiet indoor unit operating at 21 dB'
    ]
  },
  {
    _id: 'prod_1',
    name: 'Aura Wireless Noise-Canceling Headphones',
    slug: 'aura-wireless-headphones',
    description: 'Experience pure sonic clarity with active hybrid noise cancellation, 40-hour battery life, and spatial audio precision engineered for audiophiles.',
    price: 299.99,
    originalPrice: 349.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 42,
    rating: 4.9,
    reviewCount: 128,
    badge: 'Bestseller',
    tags: ['Wireless', 'Noise Canceling', 'Bluetooth 5.3', 'Premium'],
    features: [
      'Active Noise Cancellation with Transparency Mode',
      'Up to 40 Hours Playtime on a single charge',
      'Custom 40mm Titanium Drivers',
      'Ultra-soft Memory Foam Earcups'
    ]
  },
  {
    _id: 'prod_2',
    name: 'Luminary Minimalist Mechanical Keyboard',
    slug: 'luminary-mechanical-keyboard',
    description: 'Aircraft-grade aluminum chassis with custom hot-swappable mechanical switches, RGB backlighting, and dual wireless mode.',
    price: 159.99,
    originalPrice: 189.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 18,
    rating: 4.8,
    reviewCount: 94,
    badge: 'Trending',
    tags: ['Mechanical', 'RGB', 'Wireless', 'Hot-Swappable'],
    features: [
      'Hot-swappable MX Style Switches',
      'Per-Key Customizable RGB Lighting',
      'Bluetooth 5.1 & 2.4GHz Low Latency Dongle'
    ]
  },
  {
    _id: 'prod_3',
    name: 'Vortex Ultra Smartwatch Pro',
    slug: 'vortex-smartwatch-pro',
    description: 'Always-on Sapphire AMOLED display, ECG monitoring, dual-band GPS tracking, and 7-day battery life encased in titanium.',
    price: 399.00,
    originalPrice: 449.00,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 25,
    rating: 4.7,
    reviewCount: 76,
    badge: 'New Arrival',
    tags: ['Fitness', 'ECG', 'Waterproof', 'Titanium'],
    features: [
      '1.43-inch Curved AMOLED Sapphire Display',
      'Advanced ECG & Blood Oxygen Sensors'
    ]
  },
  {
    _id: 'prod_4',
    name: 'Prism 4K Ultra-Wide Curved Monitor 34"',
    slug: 'prism-4k-curved-monitor',
    description: 'Immersive 34-inch 165Hz Curved Gaming & Productivity display with Quantum Dot OLED panel and HDR 1000 support.',
    price: 849.99,
    originalPrice: 999.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 52,
    badge: 'Top Rated',
    tags: ['4K', 'Curved', '165Hz', 'OLED'],
    features: [
      '34-inch 3440 x 1440 WQHD OLED Panel',
      '165Hz Refresh Rate & 0.03ms Response Time'
    ]
  },
  {
    _id: 'prod_5',
    name: 'Urban Luxe Matte Leather Backpack',
    slug: 'urban-luxe-leather-backpack',
    description: 'Handcrafted full-grain Italian leather bag with dedicated 16-inch laptop compartment, weather-proof zippers, and ergonomic padding.',
    price: 189.50,
    originalPrice: 220.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 30,
    rating: 4.6,
    reviewCount: 61,
    tags: ['Leather', 'Travel', 'Water Resistant', 'Laptop Bag']
  },
  {
    _id: 'prod_6',
    name: 'HyperDrive Ergonomic Studio Chair',
    slug: 'hyperdrive-ergonomic-chair',
    description: 'Engineered for 12+ hour comfort with adaptive lumbar support, breathable mesh, and fully adjustable 4D armrests.',
    price: 499.00,
    originalPrice: 599.00,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 43,
    badge: 'Popular',
    tags: ['Ergonomic', 'Mesh', 'Office', 'Comfort']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    _id: 'ord_1001',
    orderNumber: 'ORD-84920',
    customerName: 'Alexander Wright',
    customerEmail: 'alexander@example.com',
    shippingAddress: {
      fullName: 'Alexander Wright',
      email: 'alexander@example.com',
      address: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    },
    items: [
      {
        productId: 'prod_1',
        name: 'Aura Wireless Noise-Canceling Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'prod_8',
        name: 'Zenith Fast Wireless Charging Dock 3-in-1',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1622445268465-843d31216aca?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 379.98,
    tax: 30.40,
    shipping: 0,
    total: 410.38,
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    createdAt: '2026-07-22T14:32:00Z',
    estimatedDelivery: 'July 26, 2026'
  },
  {
    _id: 'ord_1002',
    orderNumber: 'ORD-84921',
    customerName: 'Sophia Chen',
    customerEmail: 'sophia.c@example.com',
    shippingAddress: {
      fullName: 'Sophia Chen',
      email: 'sophia.c@example.com',
      address: '100 Mission Street, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States'
    },
    items: [
      {
        productId: 'prod_2',
        name: 'Luminary Minimalist Mechanical Keyboard',
        price: 159.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 319.98,
    tax: 25.60,
    shipping: 15.00,
    total: 360.58,
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: '2026-07-20T09:15:00Z',
    estimatedDelivery: 'July 23, 2026'
  },
  {
    _id: 'ord_1003',
    orderNumber: 'ORD-84922',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.v@example.com',
    shippingAddress: {
      fullName: 'Marcus Vance',
      email: 'marcus.v@example.com',
      address: '450 Fifth Avenue',
      city: 'New York',
      state: 'NY',
      postalCode: '10018',
      country: 'United States'
    },
    items: [
      {
        productId: 'prod_4',
        name: 'Prism 4K Ultra-Wide Curved Monitor 34"',
        price: 849.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 849.99,
    tax: 68.00,
    shipping: 0,
    total: 917.99,
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    createdAt: '2026-07-24T10:45:00Z',
    estimatedDelivery: 'July 28, 2026'
  }
];
