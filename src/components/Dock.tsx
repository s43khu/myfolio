"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Code, 
  Briefcase, 
  Award, 
  Mail, 
  Download 
} from "lucide-react";
import { getNavigation } from "@/utils/data";

interface DockItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string; size?: number }> } = {
  About: User,
  Skills: Code,
  Projects: Briefcase,
  Experience: Award,
  Contact: Mail,
  Resume: Download,
};

export default function Dock() {
  const menuItems = getNavigation();
  const dockItems: DockItem[] = menuItems.map((item) => ({
    ...item,
    icon: iconMap[item.name] || User,
  }));

  const handleNavClick = (href: string) => {
    if (href === "#about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href === "#contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-end gap-1.5 px-3 py-2.5 rounded-3xl"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        {dockItems.map((item, index) => (
          <DockIcon key={item.name} item={item} index={index} onClick={handleNavClick} />
        ))}
      </motion.div>
    </div>
  );
}

interface DockIconProps {
  item: DockItem;
  index: number;
  onClick: (href: string) => void;
}

function DockIcon({ item, index, onClick }: DockIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      className="flex items-center justify-center w-14"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href={item.href}
        download={item.name === "Resume" ? "resume_my.pdf" : undefined}
        onClick={(e) => {
          if (item.href.startsWith("#")) {
            e.preventDefault();
            onClick(item.href);
          }
        }}
        className="flex items-center justify-center w-full h-14 rounded-2xl transition-all duration-300 cursor-pointer group relative"
        style={{
          background: isHovered 
            ? "rgba(255, 255, 255, 0.15)" 
            : "transparent",
          backdropFilter: isHovered ? "blur(20px)" : "none",
          WebkitBackdropFilter: isHovered ? "blur(20px)" : "none",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.3 : 1,
            y: isHovered ? -10 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex items-center justify-center"
          style={{
            filter: isHovered ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))" : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
          }}
        >
          <Icon 
            className="w-5 h-5 text-white/90 group-hover:text-white transition-colors duration-300" 
            size={20}
          />
        </motion.div>
        
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap pointer-events-none font-medium"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
            }}
          >
            {item.name}
          </motion.div>
        )}
      </motion.a>
    </motion.div>
  );
}
