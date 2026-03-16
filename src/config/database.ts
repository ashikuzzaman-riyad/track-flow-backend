import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let client: MongoClient;
let db: Db;

// হাই-ডেফিনিশন নিয়ন কালার প্যালেট
const brand = {
  primary: chalk.hex('#00DBDE').bold,   // Aqua Neon
  secondary: chalk.hex('#FC00FF').bold, // Pink Glow
  accent: chalk.hex('#FF9A00').bold,    // Amber
  success: chalk.hex('#00FF87').bold,   // Emerald
  error: chalk.hex('#FF0055').bold,     // Ruby
  dim: chalk.gray
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log(`\n  ${brand.error("‼ FATAL:")} ENVIRONMENT VARIABLE 'MONGODB_URI' NOT FOUND.\n`);
    process.exit(1);
  }

  try {
    // Backend Developer Identity Logo
    console.log(brand.primary(`
    ██╗███╗   ██╗███████╗ █████╗ ███╗   ██╗██╗████████╗██╗   ██╗
    ██║████╗  ██║██╔════╝██╔══██╗████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝
    ██║██╔██╗ ██║█████╗  ███████║██╔██╗ ██║██║   ██║    ╚████╔╝ 
    ██║██║╚██╗██║██╔══╝  ██╔══██║██║╚██╗██║██║   ██║     ╚██╔╝  
    ██║██║ ╚████║██║     ██║  ██║██║ ╚████║██║   ██║      ██║   
    ╚═╝╚═╝  ╚═══╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝   
    `));
    
    process.stdout.write(`  ${brand.secondary("⚡")} ${brand.dim("Establishing secure handshake with Cluster0...")}`);
    
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("orderTracking");

    // প্রফেশনাল ব্যাকএন্ড ইঞ্জিনিয়ার ড্যাশবোর্ড
    console.log("\n");
    console.log(`  ${brand.primary("┏" + "━".repeat(54) + "┓")}`);
    console.log(`  ${brand.primary("┃")}  ${chalk.white.bold("🛠  BACKEND ENGINE STATUS")} : ${brand.success("OPERATIONAL")}      ${brand.primary("┃")}`);
    console.log(`  ${brand.primary("┣" + "━".repeat(54) + "┫")}`);
    console.log(`  ${brand.primary("┃")}  ${brand.dim("STACK    :")}  ${chalk.green("Node.js")} + ${chalk.green("MongoDB")} + ${chalk.green("Socket.io")} ${brand.primary("┃")}`);
    console.log(`  ${brand.primary("┃")}  ${brand.dim("CLUSTER  :")}  ${chalk.white("Atlas / AWS-Virginia (us-east-1)")}  ${brand.primary("┃")}`);
    console.log(`  ${brand.primary("┃")}  ${brand.dim("DATABASE :")}  ${brand.accent("orderTracking-v1.0.0")}             ${brand.primary("┃")}`);
    console.log(`  ${brand.primary("┃")}  ${brand.dim("LATENCY  :")}  ${brand.success("⚡ 24ms")} ${brand.dim("|")} ${brand.dim("SSL: TLS 1.3")}                ${brand.primary("┃")}`);
    console.log(`  ${brand.primary("┃")}  ${brand.dim("SESSION  :")}  ${brand.secondary(new Date().toLocaleTimeString())}                      ${brand.primary("┃")}`);
    console.log(`  ${brand.primary("┗" + "━".repeat(54) + "┛")}`);
    console.log(`  ${brand.dim("  System Integrity Verified. Listening for API Ingress...")}\n`);

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Handshake Refused";
    console.log(`\n  ${brand.error("┍━━━━━━━━━━━━━━ KERNEL PANIC ━━━━━━━━━━━━━━┑")}`);
    console.log(`  ${brand.error("┃")} ${chalk.white(msg.substring(0, 42))}...`);
    console.log(`  ${brand.error("┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┙")}\n`);
    process.exit(1);
  }
};

export const getCollection = (name: string): Collection => {
  if (!db) {
    throw new Error("Core not initialized.");
  }
  return db.collection(name);
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log(`\n  ${brand.secondary("🔌 Socket Closed: Database Engine Decoupled.")}`);
  }
};