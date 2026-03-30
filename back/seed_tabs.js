const db = require('./config/database');
const Sector = require('./models/Sector');

const SECTORS_DATA = [
  { slug: "educational", tabs: ["Schools", "Universities", "Research Institutes", "Training Centers"] },
  { slug: "infrastructure", tabs: ["Bridges", "Roadworks", "Tunnels", "Drainage Systems"] },
  { slug: "power-energy", tabs: ["Power Stations", "Cooling Towers", "Substations", "Wind Farms"] },
  { slug: "industrial", tabs: ["Factories", "Warehouses", "Data Centers", "Power Plants"] },
  { slug: "high-rise", tabs: [] },
  { slug: "healthcare", tabs: ["Hospitals", "Clinics", "Laboratories", "Sterile Rooms"] },
  { slug: "hospitality", tabs: ["Hotels", "Resorts", "Restaurants", "Recreational Facilities"] },
  { slug: "residential", tabs: ["Apartments", "Villas"] },
  { slug: "commercial-retail", tabs: ["Office Buildings", "Shopping Malls", "Supermarkets", "Showrooms"] },
  { slug: "correctional-security", tabs: ["Jails", "Military Bases"] },
  { slug: "cultural-entertainment", tabs: ["Theaters", "Museums", "Sports Arenas", "Cinemas"] },
  { slug: "transportation", tabs: ["Airports", "Train Stations", "Bus Terminals", "Seaports"] },
  { slug: "cement", tabs: ["Cement Plants"] },
  { slug: "concrete", tabs: ["Batching Plants", "Precast Facilities"] },
  { slug: "marine", tabs: ["Quay Walls", "Jetties", "Docks"] },
  { slug: "oil-gas", tabs: ["Refineries", "Storage Tanks", "Pipelines"] },
  { slug: "water", tabs: ["Treatment Plants", "Pumping Stations", "Reservoirs", "Pipelines"] }
];

async function seedTabs() {
  try {
    for (const data of SECTORS_DATA) {
      const sector = await Sector.findOne({ where: { slug: data.slug } });
      if (sector && data.tabs.length > 0) {
        sector.tabs = data.tabs;
        await sector.save();
        console.log(`Updated tabs for ${data.slug}`);
      }
    }
    console.log("Done seeding tabs.");
  } catch (e) {
    console.error(e);
  }
}

seedTabs();
