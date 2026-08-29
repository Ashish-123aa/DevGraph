export interface CompanySeed {
  id: string;
  name: string;
  industry: string;
  location: string;
  description: string;
}

export const companies: CompanySeed[] = [
  { id: "company_microsoft", name: "Microsoft", industry: "Enterprise Software & Cloud", location: "Redmond, WA", description: "A multinational technology company known for Windows, Azure, and productivity software." },
  { id: "company_google", name: "Google", industry: "Internet Services & Cloud", location: "Mountain View, CA", description: "A technology company spanning search, advertising, cloud, and consumer products." },
  { id: "company_amazon", name: "Amazon", industry: "E-Commerce & Cloud", location: "Seattle, WA", description: "A global e-commerce and cloud computing company operating AWS." },
  { id: "company_adobe", name: "Adobe", industry: "Creative & Marketing Software", location: "San Jose, CA", description: "A software company known for creative, document, and marketing tools." },
  { id: "company_atlassian", name: "Atlassian", industry: "Developer & Collaboration Tools", location: "Sydney, Australia", description: "Maker of Jira, Confluence, and other team collaboration software." },
  { id: "company_flipkart", name: "Flipkart", industry: "E-Commerce", location: "Bangalore, India", description: "A leading Indian e-commerce marketplace." },
  { id: "company_netflix", name: "Netflix", industry: "Streaming Media", location: "Los Gatos, CA", description: "A global streaming entertainment service known for large-scale distributed systems." },
  { id: "company_stripe", name: "Stripe", industry: "Fintech / Payments", location: "San Francisco, CA", description: "A payments infrastructure company powering online commerce." },
  { id: "company_uber", name: "Uber", industry: "Mobility & Delivery", location: "San Francisco, CA", description: "A ride-hailing and delivery platform operating at global real-time scale." },
  { id: "company_spotify", name: "Spotify", industry: "Music Streaming", location: "Stockholm, Sweden", description: "A global audio streaming platform." },

  { id: "company_meta", name: "Meta", industry: "Social Media & VR", location: "Menlo Park, CA", description: "The company behind Facebook, Instagram, and Reality Labs." },
  { id: "company_apple", name: "Apple", industry: "Consumer Electronics & Software", location: "Cupertino, CA", description: "A technology company known for iPhone, Mac, and iOS/macOS software." },
  { id: "company_salesforce", name: "Salesforce", industry: "Enterprise SaaS", location: "San Francisco, CA", description: "A leading customer relationship management (CRM) platform." },
  { id: "company_shopify", name: "Shopify", industry: "E-Commerce Platform", location: "Ottawa, Canada", description: "A platform powering online storefronts for merchants worldwide." },
  { id: "company_airbnb", name: "Airbnb", industry: "Travel & Hospitality", location: "San Francisco, CA", description: "A marketplace connecting travelers with unique places to stay." },
  { id: "company_linkedin", name: "LinkedIn", industry: "Professional Networking", location: "Sunnyvale, CA", description: "A professional networking and job-search platform." },
  { id: "company_twilio", name: "Twilio", industry: "Communications APIs", location: "San Francisco, CA", description: "A cloud platform providing programmable messaging and voice APIs." },
  { id: "company_snowflake", name: "Snowflake", industry: "Data Cloud", location: "Bozeman, MT", description: "A cloud-based data warehousing and analytics platform." },
];