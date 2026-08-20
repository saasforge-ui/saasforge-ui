import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/common/github-icon";
import { PurchaseButton } from "@/components/common/purchase-button";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { freeComponents } from "@/data/components";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } },
} as const;

export function HeroSection() {
  return (
    <motion.section
      className="mx-auto max-w-5xl px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={itemVariants}
        className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
      >
        Stop rebuilding the same SaaS dashboard UI.
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground"
      >
        {siteConfig.tagline} Built with React, TypeScript and Tailwind CSS — copy, customize, and ship.
      </motion.p>
      <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" asChild>
          <Link to="/components">
            Explore Components
            <ArrowRight />
          </Link>
        </Button>
        <PurchaseButton size="lg" variant="outline">
          Get SaaSForge UI Pro
        </PurchaseButton>
        <Button size="lg" variant="outline" asChild>
          <Link to="/components?tier=free" onClick={() => trackEvent("free_component_click", { path: "hero" })}>
            Get {freeComponents.length} Components Free
          </Link>
        </Button>
        <Button size="lg" variant="ghost" asChild>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("github_click", { path: "hero" })}
          >
            <GithubIcon className="h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </motion.div>
    </motion.section>
  );
}
