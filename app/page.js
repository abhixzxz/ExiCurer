import Image from "next/image";
import LandingImage from "../public/images/6478065.jpg";
import { Database, Save, Clock, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Database,
      title: "Easy Database Connection",
      description:
        "Connect to your MSSQL databases seamlessly with secure credential management",
    },
    {
      icon: Save,
      title: "Query Templates",
      description:
        "Save and organize frequently used queries for quick access and reuse",
    },
    {
      icon: Clock,
      title: "Query History",
      description:
        "Track and revisit your past queries with detailed execution history",
    },
    {
      icon: Zap,
      title: "Fast Execution",
      description:
        "Execute complex SQL queries with optimized performance and real-time results",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-16 pb-16 lg:pt-24">
            <div className="text-center space-y-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Simplify Your SQL Workflow
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                A modern MSSQL query editor for efficient database management
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/employees">
                  <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105">
                    Get Started
                  </button>
                </Link>

                <button className="px-8 py-3 rounded-lg border border-input bg-background hover:bg-accent transition-all hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="lg:w-1/2">
            <Image
              src={LandingImage}
              alt="SQL Query Editor Interface"
              width={600}
              height={600}
              className="rounded-xl shadow-2xl w-full"
              priority
            />
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
