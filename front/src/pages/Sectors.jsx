import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Building2,
  Factory,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Car,
  Search,
  Filter,
  MapPin,
  Briefcase,
  LayoutGrid,
  Box,
  FileText,
  Download,
  ChevronDown,
  Droplets,
  Hammer,
  PaintBucket,
  Beaker,
  Layers,
  Grid,
} from "lucide-react";

// --- 1. بيانات القطاعات ---
const SECTORS_DATA = [
  {
    id: "educational",
    title: "Educational",
    icon: <GraduationCap />,
    description:
      "Supports schools & universities with durable learning environments.",
    tabs: [
      "Schools",
      "Universities",
      "Research Institutes",
      "Training Centers",
    ],
    areas: [
      {
        id: "sub-structure",
        title: "Sub-Structure Elements",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "roofs",
        title: "Roofs",
        products: [
          "Waterproofing Products",
          "Sealants",
          "Protective Coatings",
          "Plastering Textured Products",
        ],
      },
      {
        id: "facades",
        title: "Façades",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured Products",
          "Products Coatings",
        ],
      },
      {
        id: "walls",
        title: "Walls",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured Products",
        ],
      },
      {
        id: "floors",
        title: "Floors",
        products: [
          "Tile Adhesives & Grouts",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "kitchens",
        title: "Kitchens & Bathrooms",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Flooring Products",
        ],
      },
      {
        id: "submerged",
        title: "Submerged Areas",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Concrete Repair",
        ],
      },
      {
        id: "gyms",
        title: "Gyms",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "pools",
        title: "Swimming Pools",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Protective Coatings",
        ],
      },
      {
        id: "parking",
        title: "Car Parks",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
          "Flooring Products",
          "Sealants",
        ],
      },
      {
        id: "storage",
        title: "Storage / Loading Bays",
        products: [
          "Concrete Repair",
          "Concrete Fibers",
          "Protective Coatings",
          "Anchoring and Grouts",
        ],
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: <Car />,
    description: "High-performance solutions for bridges, tunnels, and roads.",
    tabs: ["Bridges", "Roadworks", "Tunnels", "Drainage Systems"],
    areas: [
      {
        id: "bridges",
        title: "Bridges",
        products: [
          "Concrete Repair Products",
          "Waterproofing Products",
          "Concrete Fiber",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "tunnels",
        title: "Tunnels",
        products: [
          "Waterproofing Products",
          "Concrete Repair Products",
          "Concrete Fiber",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "roadworks",
        title: "Roadworks",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Concrete Fiber",
          "Concrete Repair Products",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "pipelines",
        title: "Pipelines",
        products: [
          "Waterproofing Products",
          "Concrete Repair Products",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
    ],
  },
  {
    id: "power-energy",
    title: "Power & Energy",
    icon: <Zap />,
    description:
      "Critical infrastructure protection for power stations & wind farms.",
    tabs: ["Power Stations", "Cooling Towers", "Substations", "Wind Farms"],
    areas: [
      {
        id: "turbine",
        title: "Turbine Halls",
        products: [
          "Protective Coatings",
          "Surface Treatments",
          "Flooring Products",
          "Sealants",
        ],
      },
      {
        id: "cooling",
        title: "Cooling Towers",
        products: [
          "Waterproofing Products",
          "Sealants",
          "Protective Coatings",
          "Concrete Repair Products",
          "Surface Treatments",
        ],
      },
      {
        id: "substations",
        title: "Substations",
        products: [
          "Sealants",
          "Flooring Products",
          "Protective Coatings",
          "Concrete Repair Products",
          "Surface Treatments",
        ],
      },
    ],
  },
  {
    id: "industrial",
    title: "Industrial",
    icon: <Factory />,
    description: "Heavy-duty solutions for factories, warehouses, and plants.",
    tabs: ["Factories", "Warehouses", "Data Centers", "Power Plants"],
    areas: [
      {
        id: "production",
        title: "Production Areas",
        products: ["Flooring Products", "Sealants", "Protective Coatings"],
      },
      {
        id: "warehouses",
        title: "Warehouses",
        products: ["Flooring Products", "Concrete Repair", "Joint Sealants"],
      },
      {
        id: "tanks",
        title: "Tanks & Silos",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Protective Coatings",
        ],
      },
      {
        id: "loading",
        title: "Storage / Loading Bays",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
    ],
  },
  {
    id: "high-rise",
    title: "High Rise",
    icon: <Building2 />,
    description: "Complete building envelope solutions for residential towers.",
    areas: [
      {
        id: "sub-struct",
        title: "Sub-Structure",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Concrete Fibers",
        ],
      },
      {
        id: "roofs",
        title: "Roofs & Terraces",
        products: ["Waterproofing Products", "Sealants", "Protective Coatings"],
      },
      {
        id: "facades",
        title: "Façades",
        products: ["Protective Coatings", "Sealants", "Textured Plastering"],
      },
      {
        id: "interiors",
        title: "Interiors",
        products: ["Tile Adhesives & Grouts", "Waterproofing", "Sealants"],
      },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: <Briefcase />,
    description:
      "Hygienic solutions for hospitals, clinics, and sterile areas.",
    tabs: ["Hospitals", "Clinics", "Laboratories", "Sterile Rooms"],
    areas: [
      {
        id: "operating",
        title: "Operating Rooms",
        products: [
          "Sealants",
          "Flooring Products",
          "Protective Coatings",
          "Concrete Repair",
        ],
      },
      {
        id: "labs",
        title: "Laboratories",
        products: ["Sealants", "Flooring Products", "Protective Coatings"],
      },
      {
        id: "sterile",
        title: "Sterile Areas",
        products: ["Sealants", "Flooring Products", "Protective Coatings"],
      },
    ],
  },
  {
    id: "hospitality",
    title: "Hospitality",
    icon: <LayoutGrid />,
    description: "Aesthetic & durable solutions for hotels and resorts.",
    tabs: ["Hotels", "Resorts", "Restaurants", "Recreational Facilities"],
    areas: [
      {
        id: "lobbies",
        title: "Lobbies & Ballrooms",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "pools-spa",
        title: "Pools & Spas",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Protective Coatings",
        ],
      },
      {
        id: "kids",
        title: "Kids Play Area",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
    ],
  },
  {
    id: "residential",
    title: "Residential",
    icon: <Building2 />,
    description:
      "Supports apartments and villas with waterproofing systems, concrete repair and reinforcement solutions, sealants, protective coatings, surface treatments, textured plaster finishes, tile adhesives & grouts, and flooring products.",
    tabs: ["Apartments", "Villas"],
    areas: [
      {
        id: "sub-structure",
        title: "Sub-Structure Elements",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "roofs",
        title: "Roofs",
        products: [
          "Waterproofing Products",
          "Sealants",
          "Protective Coatings",
          "Plastering Textured",
        ],
      },
      {
        id: "facades",
        title: "Façades",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured Products",
          "Products Coatings",
        ],
      },
      {
        id: "walls",
        title: "Walls",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured",
        ],
      },
      {
        id: "floors",
        title: "Floors",
        products: [
          "Tile Adhesives & Grouts",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "kitchens",
        title: "Kitchens & Bathrooms",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Flooring Products",
        ],
      },
      {
        id: "submerged",
        title: "Submerged Areas",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Concrete Repair",
        ],
      },
      {
        id: "gyms",
        title: "Gyms",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "pools",
        title: "Swimming Pools",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Protective Coatings",
        ],
      },
      {
        id: "gardens",
        title: "Gardens",
        products: [
          "Sealants",
          "Flooring Products",
          "Protective Coatings",
          "Concrete Repair",
          "Waterproofing Products",
          "Surface Treatments",
        ],
      },
    ],
  },
  {
    id: "commercial-retail",
    title: "Commercial & Retail",
    icon: <Briefcase />,
    description:
      "Supports offices, malls, supermarkets, and showrooms with robust flooring systems, protective coatings, waterproofing solutions, concrete repair technologies, sealants, and finishing systems.",
    tabs: ["Office Buildings", "Shopping Malls", "Supermarkets", "Showrooms"],
    areas: [
      {
        id: "sub-structure",
        title: "Sub-Structure Elements",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "roofs",
        title: "Roofs",
        products: [
          "Waterproofing Products",
          "Sealants",
          "Protective Coatings",
          "Plastering Textured",
        ],
      },
      {
        id: "facades",
        title: "Façades",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured Products",
          "Products Coatings",
        ],
      },
      {
        id: "walls",
        title: "Walls",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured",
        ],
      },
      {
        id: "floors",
        title: "Floors",
        products: [
          "Tile Adhesives & Grouts",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "kitchens",
        title: "Kitchens & Bathrooms",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Flooring Products",
        ],
      },
      {
        id: "submerged",
        title: "Submerged Areas",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Concrete Repair",
        ],
      },
      {
        id: "gyms",
        title: "Gyms",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "storage",
        title: "Storage / Loading Bays",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "parking",
        title: "Car Parks",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
          "Flooring Products",
          "Sealants",
        ],
      },
      {
        id: "food-halls",
        title: "Food Halls",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
          "Plastering Textured Products",
          "Tile Adhesives & Grouts",
          "Sealants",
        ],
      },
    ],
  },
  {
    id: "correctional-security",
    title: "Correctional & Security",
    icon: <Factory />,
    description:
      "Supports jails, military bases, and secure facilities with high-strength concrete repair systems, protective coatings, secure flooring solutions, sealants, and waterproofing products.",
    tabs: ["Jails", "Military Bases"],
    areas: [
      {
        id: "sub-structure",
        title: "Sub-Structure Elements",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "roofs",
        title: "Roofs",
        products: [
          "Waterproofing Products",
          "Sealants",
          "Protective Coatings",
          "Plastering Textured",
        ],
      },
      {
        id: "facades",
        title: "Façades",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured Products",
          "Products Coatings",
        ],
      },
      {
        id: "walls",
        title: "Walls",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured",
        ],
      },
      {
        id: "floors",
        title: "Floors",
        products: [
          "Tile Adhesives & Grouts",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "kitchens",
        title: "Kitchens & Bathrooms",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Flooring Products",
        ],
      },
      {
        id: "parking",
        title: "Car Parks",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
          "Flooring Products",
          "Sealants",
        ],
      },
      {
        id: "secure-perimeters",
        title: "Secure Perimeters",
        products: ["Concrete Repair", "Protective Coatings"],
      },
      {
        id: "workshops",
        title: "Workshops",
        products: [
          "Concrete Repair",
          "Protective Coatings",
          "Flooring Products",
          "Sealants",
          "Waterproofing Products",
          "Anchoring and Grouts",
          "Tile Adhesives & Grouts",
        ],
      },
    ],
  },
  {
    id: "cultural-entertainment",
    title: "Cultural & Entertainment",
    icon: <LayoutGrid />,
    description:
      "Delivers solutions for theaters, museums, arenas, and cinemas using acoustic and decorative surface treatments, protective coatings, flooring systems, waterproofing products, and finishing solutions.",
    tabs: ["Theaters", "Museums", "Sports Arenas", "Cinemas"],
    areas: [
      {
        id: "sub-structure",
        title: "Sub-Structure Elements",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "roofs",
        title: "Roofs",
        products: [
          "Waterproofing Products",
          "Sealants",
          "Protective Coatings",
          "Plastering Textured",
        ],
      },
      {
        id: "facades",
        title: "Façades",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured Products",
          "Products Coatings",
        ],
      },
      {
        id: "walls",
        title: "Walls",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured",
        ],
      },
      {
        id: "floors",
        title: "Floors",
        products: [
          "Tile Adhesives & Grouts",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "kitchens",
        title: "Kitchens & Bathrooms",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Flooring Products",
        ],
      },
      {
        id: "submerged",
        title: "Submerged Areas",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Concrete Repair",
        ],
      },
      {
        id: "storage",
        title: "Storage / Loading Bays",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "parking",
        title: "Car Parks",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
          "Flooring Products",
          "Sealants",
        ],
      },
      {
        id: "food-halls",
        title: "Food Halls",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
          "Tile Adhesives & Grouts",
          "Sealants",
        ],
      },
      {
        id: "acoustic-halls",
        title: "Acoustically Treated Halls",
        products: [
          "Surface Treatments",
          "Plastering Textured Products",
          "Protective Coatings",
          "Flooring Products",
        ],
      },
      {
        id: "climate-controlled",
        title: "Climate-Controlled Zones",
        products: ["Surface Treatments", "Protective Coatings"],
      },
    ],
  },
  {
    id: "transportation",
    title: "Transportation",
    icon: <Car />,
    description:
      "Supports airports, stations, terminals, and ports with high-performance waterproofing systems, concrete repair technologies, protective coatings, sealants, flooring systems, and runway-grade solutions.",
    tabs: ["Airports", "Train Stations", "Bus Terminals", "Seaports"],
    areas: [
      {
        id: "sub-structure",
        title: "Sub-Structure Elements",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "roofs",
        title: "Roofs",
        products: [
          "Waterproofing Products",
          "Sealants",
          "Protective Coatings",
          "Plastering Textured",
        ],
      },
      {
        id: "facades",
        title: "Façades",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured Products",
          "Products Coatings",
        ],
      },
      {
        id: "walls",
        title: "Walls",
        products: [
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Plastering Textured",
        ],
      },
      {
        id: "floors",
        title: "Floors",
        products: [
          "Tile Adhesives & Grouts",
          "Protective Coatings",
          "Surface Treatments",
        ],
      },
      {
        id: "kitchens",
        title: "Kitchens & Bathrooms",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Flooring Products",
        ],
      },
      {
        id: "submerged",
        title: "Submerged Areas",
        products: [
          "Waterproofing Products",
          "Tile Adhesives & Grouts",
          "Concrete Repair",
        ],
      },
      {
        id: "storage",
        title: "Storage / Loading Bays",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "parking",
        title: "Car Parks",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
          "Flooring Products",
          "Sealants",
        ],
      },
      {
        id: "food-halls",
        title: "Food Halls",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
          "Tile Adhesives & Grouts",
          "Sealants",
        ],
      },
      {
        id: "runways",
        title: "Runways & Taxiways",
        products: [
          "Concrete Repair",
          "Protective Coatings",
          "Flooring Products",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "control-towers",
        title: "Control Towers",
        products: [
          "Plastering Textured Product",
          "Protective Coatings",
          "Sealants",
        ],
      },
    ],
  },
  {
    id: "cement",
    title: "Cement",
    icon: <Factory />,
    description:
      "Serves cement plants with cement additives, concrete repair systems, fiber reinforcement, protective coatings, and industrial flooring solutions.",
    tabs: ["Cement Plants"],
    areas: [
      {
        id: "raw-mill",
        title: "Cement Raw Material Mill",
        products: ["Cement additives"],
      },
      {
        id: "silos",
        title: "Silos",
        products: ["Concrete Repair", "Concrete Fiber"],
      },
      {
        id: "packing",
        title: "Packing Facilities",
        products: ["Concrete Repair", "Concrete Fiber"],
      },
      {
        id: "storage",
        title: "Storage / Loading Bays",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fibers",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "industrial-floors",
        title: "Industrial Floors",
        products: [
          "Flooring Products",
          "Protective Coatings",
          "Surface Treatments",
          "Tile Adhesives & Grouts",
          "Sealants",
          "Concrete Repair",
        ],
      },
    ],
  },
  {
    id: "concrete",
    title: "Concrete",
    icon: <Building2 />,
    description:
      "Supports batching plants, precast facilities, infrastructure, and residential construction with concrete admixtures, repair and strengthening systems, fiber reinforcement, waterproofing solutions.",
    tabs: ["Batching Plants", "Precast Facilities"],
    areas: [
      {
        id: "high-rise",
        title: "High Rise Buildings",
        products: [
          "Concrete Repair",
          "Concrete Fiber",
          "Waterproofing Products",
          "Surface Treatments",
          "Plastering Textured Products",
          "Protective Coatings",
          "Flooring Products",
          "Sealants",
          "Anchoring and Grouts",
          "Tile Adhesives & Grouts",
        ],
      },
      {
        id: "dams",
        title: "Dams",
        products: ["Concrete Repair", "Concrete Fiber"],
      },
      {
        id: "power-plants",
        title: "Power Plants",
        products: ["Concrete Repair", "Protective Coatings", "Sealants"],
      },
      {
        id: "residential",
        title: "Residential Buildings",
        products: [
          "Concrete Fiber",
          "Waterproofing Products",
          "Surface Treatments",
          "Plastering Textured Products",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
          "Tile Adhesives & Grouts",
        ],
      },
      {
        id: "roads",
        title: "Roads & Highways",
        products: [
          "Concrete Repair",
          "Concrete Fiber",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "bridges",
        title: "Bridges",
        products: [
          "Concrete Repair",
          "Concrete Fiber",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "tunnel",
        title: "Tunnel",
        products: [
          "Concrete Repair",
          "Concrete Fiber",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "ready-mix",
        title: "Ready-Mix Concrete",
        products: ["Concrete Admixtures"],
      },
      {
        id: "precast",
        title: "Precast",
        products: [
          "Concrete Repair",
          "Concrete Fiber",
          "Protective Coatings",
          "Sealants",
        ],
      },
    ],
  },
  {
    id: "marine",
    title: "Marine",
    icon: <Factory />,
    description:
      "Delivers marine-grade solutions for quays, jetties, docks, and slipways using corrosion-resistant protective coatings, concrete repair systems, waterproofing solutions, sealants.",
    tabs: ["Quay Walls", "Jetties", "Docks"],
    areas: [
      {
        id: "marine-piling",
        title: "Marine Piling",
        products: [
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fiber",
          "Anchoring and Grouts",
          "Waterproofing Products",
          "Surface Treatments",
        ],
      },
      {
        id: "quay-walls",
        title: "Quay Walls",
        products: [
          "Sealants",
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fiber",
          "Anchoring and Grouts",
          "Waterproofing Products",
          "Surface Treatments",
        ],
      },
      {
        id: "slipways",
        title: "Slipways",
        products: [
          "Sealants",
          "Protective Coatings",
          "Concrete Repair",
          "Concrete Fiber",
          "Anchoring and Grouts",
          "Waterproofing Products",
          "Surface Treatments",
        ],
      },
    ],
  },
  {
    id: "oil-gas",
    title: "Oil & Gas",
    icon: <Zap />,
    description:
      "Supports refineries, pipelines, storage tanks, and offshore platforms with chemical-resistant coatings, waterproofing systems, concrete repair technologies, fiber reinforcement, sealants.",
    tabs: ["Refineries", "Storage Tanks", "Pipelines"],
    areas: [
      {
        id: "tanks",
        title: "Tanks",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Concrete Fiber",
        ],
      },
      {
        id: "pipelines",
        title: "Pipelines",
        products: [
          "Waterproofing Products",
          "Concrete Repair Products",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "offshore",
        title: "Offshore Platforms",
        products: [
          "Surface Treatments",
          "Concrete Fiber",
          "Concrete Repair Products",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
          "Waterproofing Products",
        ],
      },
    ],
  },
  {
    id: "water",
    title: "Water",
    icon: <Factory />,
    description:
      "Serves treatment plants, reservoirs, pipelines, and pumping stations with waterproofing systems, concrete repair solutions, protective coatings, sealants, surface treatments.",
    tabs: ["Treatment Plants", "Pumping Stations", "Reservoirs", "Pipelines"],
    areas: [
      {
        id: "pipelines",
        title: "Pipelines",
        products: [
          "Waterproofing Products",
          "Concrete Repair Products",
          "Protective Coatings",
          "Sealants",
          "Anchoring and Grouts",
        ],
      },
      {
        id: "treatment-tanks",
        title: "Treatment Tanks",
        products: [
          "Waterproofing Products",
          "Concrete Repair Products",
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
        ],
      },
      {
        id: "reservoirs",
        title: "Reservoirs",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
          "Concrete Fiber",
        ],
      },
      {
        id: "septic-tanks",
        title: "Septic Tanks",
        products: [
          "Waterproofing Products",
          "Concrete Repair",
          "Protective Coatings",
          "Sealants",
          "Surface Treatments",
        ],
      },
    ],
  },
];

// --- 2. دالة الربط مع صفحة الحلول ---
// Maps product category names from Sectors to Solutions page IDs
const getSolutionLink = (productName) => {
  const mapping = {
    "Waterproofing Products": "waterproofing",
    Sealants: "sealants",
    "Concrete Repair": "cementitious-repair",
    "Concrete Repair Products": "cementitious-repair",
    "Protective Coatings": "protective-coating",
    "Flooring Products": "flooring",
    "Tile Adhesives & Grouts": "tile-adhesives",
    "Concrete Admixtures": "concrete-admixtures",
    "Concrete Fibers": "concrete-fibers",
    "Concrete Fiber": "concrete-fibers",
    "Surface Treatments": "surface-treatments",
    "Plastering Textured Products": "decorative",
    "Plastering Textured": "decorative",
    "Products Coatings": "protective-coating",
    "Anchoring and Grouts": "cementitious-repair",
    "Cement additives": "cement-additives",
  };

  const solutionId = mapping[productName];
  if (solutionId) {
    return `/solutions#${solutionId}`;
  }

  // Fallback: use search query
  return `/solutions?search=${encodeURIComponent(productName)}`;
};

// --- 3. المكونات الفرعية ---

// دالة للحصول على بيانات الفئة (أيقونة + وصف)
const getProductCategoryInfo = (name) => {
  const categoryData = {
    "Waterproofing Products": {
      icon: <Droplets size={32} />,
      description:
        "Advanced waterproofing systems for roofs, basements, and wet areas",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    Sealants: {
      icon: <Box size={32} />,
      description:
        "Flexible joint sealants for construction and infrastructure",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    "Concrete Repair": {
      icon: <Hammer size={32} />,
      description:
        "Restoration mortars and repair systems for damaged concrete",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    "Concrete Repair Products": {
      icon: <Hammer size={32} />,
      description:
        "Restoration mortars and repair systems for damaged concrete",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    "Protective Coatings": {
      icon: <PaintBucket size={32} />,
      description: "Surface protection against carbonation and chemical attack",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    "Flooring Products": {
      icon: <Grid size={32} />,
      description: "Industrial and decorative flooring solutions",
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    "Tile Adhesives & Grouts": {
      icon: <Layers size={32} />,
      description: "High-performance tile fixing systems and grouts",
      color: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    "Concrete Admixtures": {
      icon: <Beaker size={32} />,
      description: "Performance enhancers for strength and durability",
      color: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    "Concrete Fibers": {
      icon: <Grid size={32} />,
      description: "Fiber reinforcement to control cracking",
      color: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    "Concrete Fiber": {
      icon: <Grid size={32} />,
      description: "Fiber reinforcement to control cracking",
      color: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    "Surface Treatments": {
      icon: <Layers size={32} />,
      description: "Curing compounds and surface protection agents",
      color: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    "Plastering Textured Products": {
      icon: <PaintBucket size={32} />,
      description: "Decorative finish plasters and textured coatings",
      color: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    "Plastering Textured": {
      icon: <PaintBucket size={32} />,
      description: "Decorative finish plasters and textured coatings",
      color: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    "Anchoring and Grouts": {
      icon: <Hammer size={32} />,
      description: "High-strength anchoring and grouting systems",
      color: "bg-slate-50",
      iconColor: "text-slate-600",
    },
    "Cement additives": {
      icon: <Grid size={32} />,
      description: "Grinding aids and performance enhancers for cement",
      color: "bg-gray-50",
      iconColor: "text-gray-600",
    },
    "Products Coatings": {
      icon: <PaintBucket size={32} />,
      description: "Protective coating systems",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
  };

  return (
    categoryData[name] || {
      icon: <Box size={32} />,
      description: "Professional construction solutions",
      color: "bg-gray-50",
      iconColor: "text-gray-600",
    }
  );
};

// كرت المنتج المحسّن
const ProductCard = ({ name }) => {
  const info = getProductCategoryInfo(name);

  return (
    <Link
      to={getSolutionLink(name)}
      className="bg-white rounded-2xl border border-gray-100 hover:border-[#ee2039] hover:shadow-xl transition-all duration-300 group/product flex flex-col h-full overflow-hidden cursor-pointer"
    >
      {/* Header with Icon */}
      <div
        className={`${info.color} p-6 flex items-center justify-center transition-colors duration-300 group-hover/product:bg-[#ee2039]/5`}
      >
        <div
          className={`${info.iconColor} group-hover/product:text-[#ee2039] transition-colors duration-300`}
        >
          {info.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-slate-900 text-base mb-2 group-hover/product:text-[#ee2039] transition-colors leading-tight">
          {name}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
          {info.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={12} />
            View Details
          </span>
          <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/product:bg-[#ee2039] group-hover/product:text-white transition-all duration-300 group-hover/product:scale-110">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- 3. المكون الرئيسي للصفحة ---
const Sectors = () => {
  // Detect if desktop or mobile on initial load
  const getInitialSectorId = () => {
    if (typeof window !== "undefined") {
      // Desktop: lg breakpoint is 1024px in Tailwind
      return window.innerWidth >= 1024 ? SECTORS_DATA[0].id : null;
    }
    return null;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [activeSectorId, setActiveSectorId] = useState(getInitialSectorId);
  const [activeAreaId, setActiveAreaId] = useState(null);

  // Scroll to top only on initial page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle window resize to reset state if switching between mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      // Only update if currently null and switching to desktop
      if (isDesktop && activeSectorId === null) {
        setActiveSectorId(SECTORS_DATA[0].id);
      }
      // Or if switching to mobile and a sector is open, keep it (user might have opened it)
      // No action needed - let user control
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSectorId]);

  // --- Handle URL Hash Navigation ---
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const sectorId = location.hash.replace("#", "");
      const sector = SECTORS_DATA.find((s) => s.id === sectorId);
      if (sector) {
        setActiveSectorId(sectorId);
        setTimeout(() => {
          const element = document.getElementById(sectorId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    }
  }, [location]);

  // --- Search Logic ---
  const filteredSectors = useMemo(() => {
    if (!searchTerm) return SECTORS_DATA;
    const lowerTerm = searchTerm.toLowerCase();

    return SECTORS_DATA.reduce((acc, sector) => {
      const sectorMatches = sector.title.toLowerCase().includes(lowerTerm);

      const matchingAreas = sector.areas.reduce((areaAcc, area) => {
        const areaTitleMatches = area.title.toLowerCase().includes(lowerTerm);
        const matchingProducts = area.products.filter((p) =>
          p.toLowerCase().includes(lowerTerm),
        );

        if (areaTitleMatches || matchingProducts.length > 0) {
          areaAcc.push({
            ...area,
            products: areaTitleMatches ? area.products : matchingProducts,
          });
        }
        return areaAcc;
      }, []);

      if (sectorMatches || matchingAreas.length > 0) {
        acc.push({
          ...sector,
          areas: sectorMatches ? sector.areas : matchingAreas,
        });
      }
      return acc;
    }, []);
  }, [searchTerm]);

  const activeSector = useMemo(() => {
    const found = filteredSectors.find((s) => s.id === activeSectorId);
    if (found) return found;

    // Fallback: on desktop (lg+), show first sector; on mobile, show nothing
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      return filteredSectors[0] || null;
    }
    return null;
  }, [filteredSectors, activeSectorId]);

  const activeArea = useMemo(() => {
    if (!activeSector || !activeAreaId) return null;
    return activeSector.areas.find((a) => a.id === activeAreaId);
  }, [activeSector, activeAreaId]);

  const handleSectorChange = (sectorId) => {
    // Toggle: if clicking the same sector, close it (set to null)
    if (activeSectorId === sectorId) {
      setActiveSectorId(null);
      setActiveAreaId(null);
    } else {
      setActiveSectorId(sectorId);
      setActiveAreaId(null);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black text-center overflow-hidden text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              Sector Expertise
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Sectors We <span className="text-[#ee2039]">Serve</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Tailored engineering solutions for every industry. Select a sector
              to see our breakdown of areas and recommended materials.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search sectors, areas, or products..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#ee2039] focus:ring-1 focus:ring-[#ee2039] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter size={16} />
              <span className="font-medium">
                {filteredSectors.length} Sectors Found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredSectors.length > 0 ? (
            <>
              {/* Desktop Layout: Side by Side */}
              <div className="hidden lg:flex flex-row gap-8 lg:gap-12 min-h-[600px]">
                {/* --- Left Sidebar --- */}
                <div className="w-full lg:w-[380px] lg:min-w-[380px] space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                    Select Industry
                  </h3>
                  <div className="flex flex-col gap-3">
                    {filteredSectors.map((sector) => (
                      <button
                        key={sector.id}
                        onClick={() => handleSectorChange(sector.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                          activeSector && activeSector.id === sector.id
                            ? "bg-black border-slate-900 text-white shadow-xl scale-100 z-10"
                            : "bg-white border-gray-100 text-slate-600 hover:border-[#ee2039] hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            activeSector && activeSector.id === sector.id
                              ? "bg-[#ee2039] text-white"
                              : "bg-gray-50 text-slate-400 group-hover:text-[#ee2039]"
                          }`}
                        >
                          {React.cloneElement(sector.icon, { size: 18 })}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm md:text-base">
                            {sector.title}
                          </h4>
                          <p
                            className={`text-[10px] mt-0.5 line-clamp-1 ${activeSector && activeSector.id === sector.id ? "text-gray-400" : "text-gray-400"}`}
                          >
                            {sector.areas.length} Areas
                          </p>
                        </div>
                        {activeSector && activeSector.id === sector.id && (
                          <ArrowRight className="text-[#ee2039]" size={18} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* --- Right Content (Desktop) --- */}
                <div className="w-full lg:w-2/3">
                  {activeSector && (
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden h-full flex flex-col">
                      {/* Background Icon */}
                      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        {React.cloneElement(activeSector.icon, { size: 400 })}
                      </div>

                      {/* Header */}
                      <div className="relative z-10 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-start gap-5">
                          <div className="w-14 h-14 bg-[#ee2039] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#ee2039]/30 shrink-0">
                            {React.cloneElement(activeSector.icon, {
                              size: 28,
                            })}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-3xl font-bold text-slate-900">
                              {activeSector.title}
                            </h2>
                            <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-lg">
                              {activeSector.description}
                            </p>

                            {/* --- TABS SECTION START --- */}
                            {activeSector.tabs &&
                              activeSector.tabs.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                                  {activeSector.tabs.map((tab, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-red-50 text-[#ee2039] border border-[#ee2039]/10"
                                    >
                                      <CheckCircle2 size={12} strokeWidth={3} />
                                      {tab}
                                    </span>
                                  ))}
                                </div>
                              )}
                            {/* --- TABS SECTION END --- */}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        {!activeArea ? (
                          /* View 1: Areas List */
                          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                              <MapPin size={20} className="text-[#ee2039]" />
                              Select Engineering Area
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeSector.areas.map((area) => (
                                <div
                                  key={area.id}
                                  onClick={() => setActiveAreaId(area.id)}
                                  className="group/area bg-gray-50 hover:bg-white p-5 rounded-2xl border border-transparent hover:border-[#ee2039] hover:shadow-lg cursor-pointer transition-all duration-300 flex items-center justify-between"
                                >
                                  <div>
                                    <h4 className="font-bold text-slate-700 group-hover/area:text-[#ee2039] transition-colors">
                                      {area.title}
                                    </h4>
                                    <span className="text-xs text-gray-400 font-medium mt-1 inline-block">
                                      {area.products.length} Products
                                    </span>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-300 group-hover/area:text-[#ee2039] shadow-sm">
                                    <ArrowRight size={16} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* View 2: Products List (Drill Down) */
                          <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                              <button
                                onClick={() => setActiveAreaId(null)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold hover:bg-[#ee2039] hover:text-white transition-all"
                              >
                                <ArrowLeft size={14} /> Back to Areas
                              </button>
                              <span className="text-gray-300">|</span>
                              <span className="text-[#ee2039] font-bold text-lg">
                                {activeArea.title}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeArea.products.map((product, idx) => (
                                <ProductCard key={idx} name={product} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Layout: Accordion Style */}
              <div className="lg:hidden space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                  Select Industry
                </h3>
                {filteredSectors.map((sector) => (
                  <div key={sector.id} className="space-y-3">
                    {/* Sector Button */}
                    <button
                      onClick={() => handleSectorChange(sector.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        activeSector && activeSector.id === sector.id
                          ? "bg-black border-slate-900 text-white shadow-xl"
                          : "bg-white border-gray-100 text-slate-600 hover:border-[#ee2039] hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          activeSector && activeSector.id === sector.id
                            ? "bg-[#ee2039] text-white"
                            : "bg-gray-50 text-slate-400 group-hover:text-[#ee2039]"
                        }`}
                      >
                        {React.cloneElement(sector.icon, { size: 18 })}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{sector.title}</h4>
                        <p className="text-[10px] mt-0.5 text-gray-400">
                          {sector.areas.length} Areas
                        </p>
                      </div>
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          activeSector && activeSector.id === sector.id
                            ? "rotate-180 text-[#ee2039]"
                            : "text-gray-400"
                        }`}
                        size={18}
                      />
                    </button>

                    {/* Dropdown Content */}
                    {activeSector && activeSector.id === sector.id && (
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
                        {/* Header */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#ee2039] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#ee2039]/30 shrink-0">
                              {React.cloneElement(activeSector.icon, {
                                size: 24,
                              })}
                            </div>
                            <div className="flex-1">
                              <h2 className="text-xl font-bold text-slate-900">
                                {activeSector.title}
                              </h2>
                              <p className="text-gray-500 mt-1 text-xs leading-relaxed">
                                {activeSector.description}
                              </p>

                              {/* Tabs */}
                              {activeSector.tabs &&
                                activeSector.tabs.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-1.5">
                                    {activeSector.tabs.map((tab, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide bg-red-50 text-[#ee2039] border border-[#ee2039]/10"
                                      >
                                        <CheckCircle2
                                          size={10}
                                          strokeWidth={3}
                                        />
                                        {tab}
                                      </span>
                                    ))}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        {!activeArea ? (
                          /* Areas List */
                          <div>
                            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                              <MapPin size={16} className="text-[#ee2039]" />
                              Engineering Areas
                            </h3>
                            <div className="space-y-2">
                              {activeSector.areas.map((area) => (
                                <div
                                  key={area.id}
                                  onClick={() => setActiveAreaId(area.id)}
                                  className="bg-gray-50 hover:bg-white p-4 rounded-xl border border-transparent hover:border-[#ee2039] hover:shadow-md cursor-pointer transition-all duration-300 flex items-center justify-between"
                                >
                                  <div>
                                    <h4 className="font-bold text-sm text-slate-700">
                                      {area.title}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 font-medium mt-0.5 inline-block">
                                      {area.products.length} Products
                                    </span>
                                  </div>
                                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-300 shadow-sm">
                                    <ArrowRight size={14} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* Products List */
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <button
                                onClick={() => setActiveAreaId(null)}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 text-[10px] font-bold hover:bg-[#ee2039] hover:text-white transition-all"
                              >
                                <ArrowLeft size={12} /> Back
                              </button>
                              <span className="text-gray-300">|</span>
                              <span className="text-[#ee2039] font-bold text-sm">
                                {activeArea.title}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                              {activeArea.products.map((product, idx) => (
                                <ProductCard key={idx} name={product} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Box size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-400 font-bold">
                No sectors found matching "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-[#ee2039] font-bold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Sectors;
