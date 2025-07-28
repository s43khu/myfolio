import {
  Code,
  Database,
  Cloud,
  Smartphone,
  Zap,
  Palette,
  Globe,
  Briefcase,
  Award,
  Calendar,
  ExternalLink,
  Github,
  Mail,
  ArrowRight,
  Download,
  Menu,
  X,
  Phone,
  Linkedin,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { ComponentType } from "react";

export const iconMap: {
  [key: string]: ComponentType<{ className?: string; size?: number }>;
} = {
  Code,
  Database,
  Cloud,
  Smartphone,
  Zap,
  Palette,
  Globe,
  Briefcase,
  Award,
  Calendar,
  ExternalLink,
  Github,
  Mail,
  ArrowRight,
  Download,
  Menu,
  X,
  Phone,
  Linkedin,
  MapPin,
  GraduationCap,
};

export const getIcon = (
  iconName: string
): ComponentType<{ className?: string; size?: number }> => {
  return iconMap[iconName] || Globe;
};
