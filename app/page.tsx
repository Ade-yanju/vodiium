"use client";

import React, { useState, MouseEvent, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  Plane,
  CreditCard,
  Globe,
  Shield,
  Sparkles,
  ChevronRight,
  Smartphone,
  Download,
  Apple,
  X,
  CheckCircle2,
  Lock,
  ChevronDown,
  Quote,
  Star,
  Zap,
  Crown,
  ArrowRight,
  TrendingUp,
  Check,
  Settings,
  Building,
  Award,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITIES ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LangType = "EN" | "FR" | "ES";

// --- MASTER LOCALIZATION DICTIONARY ---
const t = {
  EN: {
    nav: {
      perks: "Perks",
      tiers: "Tiers",
      app: "The App",
      faq: "FAQ",
      reqInvite: "Request Invite",
    },
    hero: {
      badge: "Vodium Beta is Live",
      title1: "Your Credit Score.",
      title2: "Your Global Passport.",
      desc: "Leverage your credit score to unlock elite hospitality, luxury stays, and unlimited airport lounge access anywhere in the world.",
      btn: "Join Waitlist",
      success: "You're on the list. Keep an eye on your inbox.",
      placeholder: "Enter your email address...",
    },
    metrics: {
      fx: "Luxury Partners",
      currencies: "Countries Covered",
      lounges: "Global Lounges",
      uptime: "Elite Concierge",
    },
    tiers: {
      title: "Choose your tier",
      desc: "From premium access to infinite luxury.",
      standard: "Standard",
      standardDesc: "Essential premium travel.",
      plus: "Plus",
      plusDesc: "For the frequent globalist.",
      gold: "Gold",
      goldDesc: "Infinite hospitality.",
      getPrefix: "Get Vodium ",
      reqGold: "Request Invite",
    },
    app: {
      title1: "Elite hospitality,",
      title2: "in your pocket.",
      desc: "Track your global credit power in real-time. Discover personalized luxury stays, instantly unlock VIP airport lounges, and access your 24/7 concierge directly from the app.",
      exclBeta: "Exclusive Beta",
      dlAndroid: "Download APK (Android)",
      appStore: "App Store",
      comingSoon: "Coming Soon",
      scoreTitle: "Global Credit Power",
      unlock: "Unlocked",
    },
    features: {
      title: "Engineered for the Elite",
      desc: "Everything you need to traverse the globe with unparalleled status.",
      f1: "Credit-Powered Perks",
      f1d: "Your good financial standing automatically upgrades your hotel rooms, secures priority reservations, and unlocks VIP airport transfers.",
      f2: "Priority Pass™",
      f2d: "Unlimited access to 1,300+ global airport lounges, regardless of the airline you fly.",
      f3: "Global Concierge",
      f3d: "24/7 access to dedicated lifestyle managers to handle your travel itinerary and reservations.",
    },
    testimonials: {
      title: "Wall of Love",
      desc: "Do not just take our word for it.",
      roles: ["Digital Nomad", "Founder", "Tech Exec", "Creative Director"],
    },
    faq: {
      title: "Frequently Asked Questions",
      desc: "Everything you need to know about Vodium.",
      q1: "How does Vodium use my credit score?",
      a1: "We do not issue loans. Instead, we use your credit score as a verification of your premium status, allowing our global hospitality partners to offer you exclusive access and upgrades.",
      q2: "How does lounge access work?",
      a2: "Your Vodium card acts as your global lounge pass. Present your physical card or the dynamic QR code in the App at 1,300+ lounges globally.",
      q3: "When will the iOS App be available?",
      a3: "Our Android APK is in exclusive public beta. The iOS application has been submitted and will be available to waitlisted users in Q3 2026.",
      q4: "Is my personal data secure?",
      a4: "Absolutely. We utilize military-grade encryption and partner with tier-1 bureaus. Your data is strictly used to unlock lifestyle benefits.",
    },
    footer: {
      desc: "The definitive lifestyle instrument for global citizens. Travel, stay, and live without borders.",
      prod: "Product",
      comp: "Company",
      leg: "Legal",
      rights: "All rights reserved.",
    },
    cookies: {
      title: "Your Privacy Matters",
      desc: "We use necessary cookies to ensure Vault Security and performance cookies to optimize your experience.",
      accept: "Accept All",
      manage: "Manage",
      save: "Save Preferences",
      nec: "Strictly Necessary",
      necd: "Required for core security and app functionality.",
      ana: "Analytics",
      anad: "Helps us improve performance by tracking usage.",
      mark: "Marketing",
      markd: "Used to deliver relevant hospitality offers to you.",
    },
  },
  FR: {
    nav: {
      perks: "Avantages",
      tiers: "Niveaux",
      app: "L'Appli",
      faq: "FAQ",
      reqInvite: "Demander une invit.",
    },
    hero: {
      badge: "La Bêta Vodium est en ligne",
      title1: "Votre Score de Crédit.",
      title2: "Votre Passeport Mondial.",
      desc: "Utilisez votre score de crédit pour débloquer une hospitalité d'élite, des séjours de luxe et un accès illimité aux salons d'aéroport.",
      btn: "S'inscrire",
      success: "Vous êtes sur la liste. Surveillez votre boîte de réception.",
      placeholder: "Entrez votre e-mail...",
    },
    metrics: {
      fx: "Partenaires de Luxe",
      currencies: "Pays Couverts",
      lounges: "Salons Mondiaux",
      uptime: "Conciergerie d'Élite",
    },
    tiers: {
      title: "Choisissez votre niveau",
      desc: "De l'accès premium au luxe infini.",
      standard: "Standard",
      standardDesc: "Voyage premium essentiel.",
      plus: "Plus",
      plusDesc: "Pour le voyageur fréquent.",
      gold: "Or",
      goldDesc: "Hospitalité infinie.",
      getPrefix: "Obtenir Vodium ",
      reqGold: "Demander une invit.",
    },
    app: {
      title1: "L'hospitalité d'élite,",
      title2: "dans votre poche.",
      desc: "Suivez votre pouvoir de crédit mondial en temps réel. Découvrez des séjours de luxe personnalisés et débloquez instantanément des salons VIP.",
      exclBeta: "Bêta Exclusive",
      dlAndroid: "Télécharger APK",
      appStore: "App Store",
      comingSoon: "Bientôt",
      scoreTitle: "Pouvoir de Crédit",
      unlock: "Débloqué",
    },
    features: {
      title: "Conçu pour l'Élite",
      desc: "Tout ce dont vous avez besoin pour parcourir le globe avec un statut inégalé.",
      f1: "Avantages Liés au Crédit",
      f1d: "Votre bonne situation financière surclasse automatiquement vos chambres d'hôtel et sécurise vos réservations prioritaires.",
      f2: "Priority Pass™",
      f2d: "Accès illimité à plus de 1 300 salons d'aéroport mondiaux.",
      f3: "Conciergerie Mondiale",
      f3d: "Accès 24/7 à des gestionnaires de style de vie dédiés pour vos itinéraires.",
    },
    testimonials: {
      title: "Mur d'Amour",
      desc: "Ne nous croyez pas sur parole.",
      roles: [
        "Nomade Digital",
        "Fondateur",
        "Cadre Tech",
        "Directrice Créative",
      ],
    },
    faq: {
      title: "Questions Fréquemment Posées",
      desc: "Tout ce que vous devez savoir sur Vodium.",
      q1: "Comment Vodium utilise mon score de crédit ?",
      a1: "Nous n'accordons pas de prêts. Nous utilisons votre score comme vérification de votre statut premium pour vous offrir des accès exclusifs.",
      q2: "Comment fonctionne l'accès aux salons ?",
      a2: "Votre carte Vodium fait office de pass. Présentez votre carte ou le QR code dynamique dans plus de 1 300 salons.",
      q3: "Quand l'application iOS sera-t-elle disponible ?",
      a3: "Notre APK Android est en bêta. L'application iOS sera disponible au troisième trimestre 2026.",
      q4: "Mes données sont-elles en sécurité ?",
      a4: "Absolument. Nous utilisons un cryptage militaire. Vos données servent uniquement à débloquer des avantages de style de vie.",
    },
    footer: {
      desc: "L'instrument de style de vie définitif pour les citoyens du monde.",
      prod: "Produit",
      comp: "Entreprise",
      leg: "Légal",
      rights: "Tous droits réservés.",
    },
    cookies: {
      title: "Votre Confidentialité",
      desc: "Nous utilisons des cookies nécessaires pour la sécurité et des cookies de performance.",
      accept: "Tout Accepter",
      manage: "Gérer",
      save: "Enregistrer",
      nec: "Nécessaires",
      necd: "Requis pour la sécurité.",
      ana: "Analytiques",
      anad: "Nous aide à améliorer les performances.",
      mark: "Marketing",
      markd: "Utilisé pour des offres d'hospitalité pertinentes.",
    },
  },
  ES: {
    nav: {
      perks: "Beneficios",
      tiers: "Niveles",
      app: "La App",
      faq: "FAQ",
      reqInvite: "Pedir Invitación",
    },
    hero: {
      badge: "La Beta de Vodium está en vivo",
      title1: "Tu Puntaje de Crédito.",
      title2: "Tu Pasaporte Global.",
      desc: "Aprovecha tu puntaje de crédito para desbloquear hospitalidad de élite, estadías de lujo y acceso ilimitado a salas VIP.",
      btn: "Unirse a la lista",
      success: "Estás en la lista. Revisa tu bandeja de entrada.",
      placeholder: "Ingresa tu correo...",
    },
    metrics: {
      fx: "Socios de Lujo",
      currencies: "Países Cubiertos",
      lounges: "Salones Globales",
      uptime: "Conserje de Élite",
    },
    tiers: {
      title: "Elige tu nivel",
      desc: "Desde acceso premium hasta lujo infinito.",
      standard: "Estándar",
      standardDesc: "Viaje premium esencial.",
      plus: "Plus",
      plusDesc: "Para el viajero global.",
      gold: "Oro",
      goldDesc: "Hospitalidad infinita.",
      getPrefix: "Obtener Vodium ",
      reqGold: "Pedir Invitación",
    },
    app: {
      title1: "Hospitalidad de élite,",
      title2: "en tu bolsillo.",
      desc: "Rastrea tu poder crediticio en tiempo real. Descubre estadías de lujo y desbloquea salas VIP de aeropuertos directamente desde la app.",
      exclBeta: "Beta Exclusiva",
      dlAndroid: "Descargar APK",
      appStore: "App Store",
      comingSoon: "Próximamente",
      scoreTitle: "Poder Crediticio",
      unlock: "Desbloqueado",
    },
    features: {
      title: "Diseñado para la Élite",
      desc: "Todo lo que necesitas para atravesar el mundo con un estatus inigualable.",
      f1: "Beneficios de Crédito",
      f1d: "Tu buena salud financiera mejora automáticamente tus habitaciones de hotel y asegura reservas prioritarias.",
      f2: "Priority Pass™",
      f2d: "Acceso ilimitado a más de 1,300 salas VIP de aeropuertos.",
      f3: "Conserjería Global",
      f3d: "Acceso 24/7 a gestores de estilo de vida dedicados.",
    },
    testimonials: {
      title: "Muro de Amor",
      desc: "No te quedes solo con nuestra palabra.",
      roles: [
        "Nómada Digital",
        "Fundadora",
        "Ejecutivo Tech",
        "Directora Creativa",
      ],
    },
    faq: {
      title: "Preguntas Frecuentes",
      desc: "Todo lo que necesitas saber sobre Vodium.",
      q1: "¿Cómo usa Vodium mi puntaje de crédito?",
      a1: "No emitimos préstamos. Usamos tu puntaje como verificación de estatus premium para ofrecerte accesos exclusivos.",
      q2: "¿Cómo funciona el acceso a salas VIP?",
      a2: "Tu tarjeta Vodium actúa como tu pase global. Presenta el código QR dinámico en la App en más de 1,300 salas.",
      q3: "¿Cuándo estará disponible la App iOS?",
      a3: "Nuestro APK de Android está en beta pública. La app de iOS estará disponible en el Q3 de 2026.",
      q4: "¿Están seguros mis datos?",
      a4: "Absolutamente. Utilizamos cifrado de grado militar. Tus datos se usan estrictamente para desbloquear beneficios.",
    },
    footer: {
      desc: "El instrumento de estilo de vida definitivo para ciudadanos globales.",
      prod: "Producto",
      comp: "Empresa",
      leg: "Legal",
      rights: "Todos los derechos reservados.",
    },
    cookies: {
      title: "Tu Privacidad Importa",
      desc: "Usamos cookies necesarias para garantizar la seguridad y optimizar tu experiencia.",
      accept: "Aceptar Todo",
      manage: "Gestionar",
      save: "Guardar",
      nec: "Estrictamente Necesarias",
      necd: "Requeridas para seguridad.",
      ana: "Analíticas",
      anad: "Nos ayuda a mejorar el rendimiento.",
      mark: "Marketing",
      markd: "Usado para mostrarte ofertas relevantes.",
    },
  },
};

// --- ACETERNITY-INSPIRED UI COMPONENTS ---

const CustomSwitch = ({
  active,
  onChange,
  disabled = false,
}: {
  active: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={disabled ? undefined : onChange}
    className={cn(
      "w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300",
      active ? "bg-yellow-500" : "bg-zinc-700",
      disabled && "opacity-50 cursor-not-allowed",
    )}
  >
    <motion.div
      layout
      className={cn("w-4 h-4 bg-white rounded-full shadow-md")}
      animate={{ x: active ? 24 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </button>
);

const MovingBorderButton = ({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => (
  <button
    type={type}
    onClick={onClick}
    className={cn(
      "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black",
      className,
    )}
  >
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#eab308_50%,#E2CBFF_100%)]" />
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-8 py-1 text-sm font-medium text-yellow-500 backdrop-blur-3xl transition-colors hover:bg-zinc-900 hover:text-yellow-400">
      {children}
    </span>
  </button>
);

const SpotlightCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col items-start justify-start overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 px-8 py-10 shadow-2xl transition-colors hover:border-yellow-500/30",
        className,
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(234, 179, 8, 0.12), transparent 80%)`,
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

// --- PAGE SECTIONS ---

const CookieManager = ({ lang }: { lang: LangType }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });
  const loc = t[lang].cookies;

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    setPrefs({ analytics: true, marketing: true });
    setShowBanner(false);
    setShowModal(false);
  };
  const handleSave = () => {
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[100] p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-white font-medium">
                <Shield className="w-4 h-4 text-yellow-500" />
                <span>{loc.title}</span>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              {loc.desc}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2 text-sm font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors"
              >
                {loc.accept}
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 py-2 text-sm font-semibold text-white bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                {loc.manage}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-500" /> {loc.manage}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{loc.nec}</p>
                    <p className="text-xs text-zinc-500 mt-1 pr-4">
                      {loc.necd}
                    </p>
                  </div>
                  <CustomSwitch active={true} disabled={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{loc.ana}</p>
                    <p className="text-xs text-zinc-500 mt-1 pr-4">
                      {loc.anad}
                    </p>
                  </div>
                  <CustomSwitch
                    active={prefs.analytics}
                    onChange={() =>
                      setPrefs((p) => ({ ...p, analytics: !p.analytics }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{loc.mark}</p>
                    <p className="text-xs text-zinc-500 mt-1 pr-4">
                      {loc.markd}
                    </p>
                  </div>
                  <CustomSwitch
                    active={prefs.marketing}
                    onChange={() =>
                      setPrefs((p) => ({ ...p, marketing: !p.marketing }))
                    }
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                className="w-full py-3 text-sm font-semibold text-black bg-yellow-500 rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(234,179,8,0.2)]"
              >
                {loc.save}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const Navbar = ({
  lang,
  setLang,
}: {
  lang: LangType;
  setLang: (l: LangType) => void;
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const loc = t[lang].nav;
  const languages: { code: LangType; name: string }[] = [
    { code: "EN", name: "English" },
    { code: "FR", name: "Français" },
    { code: "ES", name: "Español" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-2xl border-b border-white/5 h-[73px]">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-900 border border-white/10">
            <img
              src="/logo.png"
              alt="Vodium Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.innerHTML =
                  '<span class="text-yellow-500 font-bold">V</span>';
              }}
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            Vodium
          </span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#features" className="hover:text-yellow-500 transition-colors">
          {loc.perks}
        </a>
        <a href="#tiers" className="hover:text-yellow-500 transition-colors">
          {loc.tiers}
        </a>
        <a href="#app" className="hover:text-yellow-500 transition-colors">
          {loc.app}
        </a>
        <a href="#faq" className="hover:text-yellow-500 transition-colors">
          {loc.faq}
        </a>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 px-3 py-1.5 rounded-full border border-white/5"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{lang}</span>
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform",
                isLangOpen && "rotate-180",
              )}
            />
          </button>
          <AnimatePresence>
            {isLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-40 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                        lang === l.code
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                      )}
                    >
                      {l.name}{" "}
                      {lang === l.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="hidden md:block">
          <button className="px-6 py-2 text-sm font-semibold text-black bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all">
            {loc.reqInvite}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ lang }: { lang: LangType }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const loc = t[lang].hero;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 overflow-hidden text-center bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl space-y-8 z-10 flex flex-col items-center mt-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wide text-yellow-500 uppercase border rounded-full border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm">
          <Sparkles className="w-3 h-3" />
          <span>{loc.badge}</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
          {loc.title1} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
            {loc.title2}
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400">
          {loc.desc}
        </p>

        <div className="pt-4 w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="flex items-center w-full bg-zinc-900/50 border border-white/10 rounded-full p-1.5 backdrop-blur-md focus-within:border-yellow-500/50 focus-within:bg-zinc-900 transition-all shadow-xl"
              >
                <input
                  type="email"
                  required
                  placeholder={loc.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white text-sm px-4 focus:outline-none focus:ring-0 placeholder:text-zinc-500"
                />
                <MovingBorderButton type="submit" className="h-10 px-6 sm:px-8">
                  <span className="hidden sm:inline">{loc.btn}</span>
                  <ArrowRight className="w-4 h-4 sm:hidden" />
                </MovingBorderButton>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 w-full bg-yellow-500/10 border border-yellow-500/30 rounded-full py-3 px-6 text-yellow-500 font-medium text-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{loc.success}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 30, rotateY: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 15, rotateY: 5 }}
        transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.4 }}
        whileHover={{ rotateX: 0, rotateY: 0, scale: 1.05 }}
        className="relative w-full max-w-md h-72 mt-20 rounded-2xl bg-gradient-to-br from-yellow-900 via-yellow-600 to-yellow-300 p-[1px] shadow-[0_20px_50px_rgba(234,179,8,0.3)] cursor-pointer"
      >
        <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col justify-between p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          <div className="flex justify-between items-start text-yellow-500 z-10">
            <Sparkles className="w-8 h-8" />
            <Crown className="w-8 h-8" />
          </div>
          <div className="space-y-2 z-10 text-left">
            <p className="text-sm font-medium text-yellow-500/80 uppercase tracking-widest">
              Vodium Gold
            </p>
            <p className="text-2xl font-mono text-white tracking-widest drop-shadow-md">
              VIP ACCESS
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const MetricsSection = ({ lang }: { lang: LangType }) => {
  const loc = t[lang].metrics;
  return (
    <section className="py-16 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          <div className="text-center px-4">
            <div className="flex justify-center mb-3">
              <Building className="w-6 h-6 text-yellow-500" />
            </div>
            <h4 className="text-4xl font-bold text-white mb-1">500+</h4>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              {loc.fx}
            </p>
          </div>
          <div className="text-center px-4">
            <div className="flex justify-center mb-3">
              <Globe className="w-6 h-6 text-yellow-500" />
            </div>
            <h4 className="text-4xl font-bold text-white mb-1">120</h4>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              {loc.currencies}
            </p>
          </div>
          <div className="text-center px-4">
            <div className="flex justify-center mb-3">
              <Plane className="w-6 h-6 text-yellow-500" />
            </div>
            <h4 className="text-4xl font-bold text-white mb-1">1,300+</h4>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              {loc.lounges}
            </p>
          </div>
          <div className="text-center px-4">
            <div className="flex justify-center mb-3">
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <h4 className="text-4xl font-bold text-white mb-1">24/7</h4>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              {loc.uptime}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TiersSection = ({ lang }: { lang: LangType }) => {
  const [activeTier, setActiveTier] = useState(2);
  const loc = t[lang].tiers;

  const tiers = [
    {
      id: "standard",
      name: loc.standard,
      price: "Free",
      tagline: loc.standardDesc,
      cardColors: "from-zinc-400 to-zinc-600",
      accent: "text-zinc-400",
      shadow: "shadow-[0_20px_50px_rgba(161,161,170,0.15)]",
      perks: [
        {
          icon: <Building className="w-4 h-4" />,
          text: "Basic Hotel Upgrades",
        },
        {
          icon: <CreditCard className="w-4 h-4" />,
          text: "1 Digital Status Card",
        },
        { icon: <Shield className="w-4 h-4" />, text: "Basic Concierge" },
      ],
    },
    {
      id: "plus",
      name: loc.plus,
      price: "$15/mo",
      tagline: loc.plusDesc,
      cardColors: "from-blue-600 to-purple-900",
      accent: "text-purple-400",
      shadow: "shadow-[0_20px_50px_rgba(147,51,234,0.2)]",
      perks: [
        {
          icon: <Plane className="w-4 h-4" />,
          text: "4 Free Lounge passes annually",
        },
        {
          icon: <Building className="w-4 h-4" />,
          text: "Priority Hotel Reservations",
        },
        { icon: <Zap className="w-4 h-4" />, text: "Priority 24/7 Support" },
      ],
    },
    {
      id: "gold",
      name: loc.gold,
      price: "Invite Only",
      tagline: loc.goldDesc,
      cardColors: "from-yellow-900 via-yellow-600 to-yellow-300",
      accent: "text-yellow-500",
      shadow: "shadow-[0_20px_50px_rgba(234,179,8,0.3)]",
      perks: [
        {
          icon: <Crown className="w-4 h-4" />,
          text: "Unlimited Global Lounge Access",
        },
        {
          icon: <Award className="w-4 h-4" />,
          text: "Elite Partner Status Match",
        },
        {
          icon: <Star className="w-4 h-4" />,
          text: "Dedicated Lifestyle Concierge",
        },
      ],
    },
  ];

  const active = tiers[activeTier];

  return (
    <section
      id="tiers"
      className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden"
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] -z-10 transition-colors duration-700 opacity-20",
          activeTier === 0
            ? "bg-zinc-500"
            : activeTier === 1
              ? "bg-purple-600"
              : "bg-yellow-500",
        )}
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {loc.title}
          </h2>
          <p className="text-zinc-400 text-lg">{loc.desc}</p>
        </div>
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 p-1.5 bg-zinc-900/80 backdrop-blur-md rounded-full border border-white/10">
            {tiers.map((tier, idx) => (
              <button
                key={tier.id}
                onClick={() => setActiveTier(idx)}
                className={cn(
                  "relative px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300",
                  activeTier === idx
                    ? "text-black"
                    : "text-zinc-400 hover:text-white",
                )}
              >
                {activeTier === idx && (
                  <motion.div
                    layoutId="active-tier"
                    className={cn(
                      "absolute inset-0 rounded-full",
                      tier.id === "gold" ? "bg-yellow-500" : "bg-white",
                    )}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tier.id === "gold" && (
                    <Sparkles
                      className={cn(
                        "w-3 h-3",
                        activeTier === idx ? "text-black" : "text-yellow-500",
                      )}
                    />
                  )}
                  {tier.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center bg-zinc-950/50 border border-white/5 p-8 md:p-12 rounded-[2.5rem]">
          <div className="flex justify-center perspective-[1000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 15, rotateX: 5, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={cn(
                  "relative w-full max-w-sm h-64 rounded-2xl p-[1px] cursor-pointer",
                  active.cardColors,
                  active.shadow,
                )}
                style={{
                  background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col justify-between p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                  <div
                    className={cn(
                      "flex justify-between items-start z-10",
                      active.accent,
                    )}
                  >
                    {active.id === "gold" ? (
                      <Crown className="w-8 h-8" />
                    ) : (
                      <Shield className="w-8 h-8" />
                    )}
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 z-10 text-left">
                    <p
                      className={cn(
                        "text-xs font-bold uppercase tracking-widest",
                        active.accent,
                      )}
                    >
                      Vodium {active.name}
                    </p>
                    <p className="text-xl font-mono text-white tracking-widest drop-shadow-md">
                      VIP ACCESS
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-content"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2">
                    {active.price}
                  </h3>
                  <p className="text-zinc-400">{active.tagline}</p>
                </div>
                <ul className="space-y-4">
                  {active.perks.map((perk, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-zinc-300"
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center bg-zinc-900 border border-white/5",
                          active.accent,
                        )}
                      >
                        {perk.icon}
                      </div>
                      <span className="text-sm font-medium">{perk.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-sm transition-all",
                    active.id === "gold"
                      ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                      : "bg-white text-black hover:bg-zinc-200",
                  )}
                >
                  {active.id === "gold"
                    ? loc.reqGold
                    : `${loc.getPrefix}${active.name}`}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const BetaAppSection = ({ lang }: { lang: LangType }) => {
  const loc = t[lang].app;
  return (
    <section
      id="app"
      className="py-32 px-6 max-w-7xl mx-auto bg-black relative border-t border-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-50 pointer-events-none" />
      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {loc.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              {loc.title2}
            </span>
          </h2>
          <p className="text-lg text-zinc-400">{loc.desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="https://expo.dev/accounts/olamilekan42424242/projects/vodium/builds/e0c811aa-9c81-4367-ac8e-e174167d0f60"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-zinc-900 border border-yellow-500/30 hover:bg-zinc-800 hover:border-yellow-500 transition-all group shadow-[0_0_20px_rgba(234,179,8,0.1)]"
            >
              <Smartphone className="w-6 h-6 text-yellow-500 group-hover:animate-bounce" />
              <div className="text-left">
                <p className="text-xs text-zinc-400">{loc.exclBeta}</p>
                <p className="text-sm font-bold text-white">{loc.dlAndroid}</p>
              </div>
              <Download className="w-4 h-4 text-zinc-500 ml-2" />
            </a>
            <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-black border border-white/10 opacity-60 cursor-not-allowed">
              <Apple className="w-6 h-6 text-zinc-400" />
              <div className="text-left">
                <p className="text-xs text-zinc-500">{loc.appStore}</p>
                <p className="text-sm font-bold text-zinc-400">
                  {loc.comingSoon}
                </p>
              </div>
              <Lock className="w-4 h-4 text-zinc-600 ml-2" />
            </div>
          </div>
        </motion.div>

        {/* Dynamic Credit Score Visualizer Mockup */}
        <div className="relative h-[500px] w-full max-w-sm mx-auto rounded-[2.5rem] border-8 border-zinc-900 bg-black overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.1)]">
          <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-3xl w-40 mx-auto z-20" />
          <div className="p-6 pt-16 h-full flex flex-col relative bg-gradient-to-b from-zinc-900/50 to-black">
            {/* Credit Score Arc */}
            <div className="text-center mb-6">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">
                {loc.scoreTitle}
              </p>
              <div className="relative w-40 h-20 mx-auto overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-40 rounded-full border-[10px] border-zinc-800" />
                <motion.div
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 30 }}
                  transition={{ duration: 2, type: "spring", bounce: 0.1 }}
                  className="absolute top-0 left-0 w-full h-40 rounded-full border-[10px] border-transparent border-t-yellow-500 border-r-yellow-500"
                  style={{ transformOrigin: "center center" }}
                />
                <div className="absolute bottom-0 left-0 w-full text-center">
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    812
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Perks Notifications */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              className="bg-zinc-800/90 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-xl mb-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Plane className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  Murtala Muhammed VIP
                </p>
                <p className="text-[10px] text-zinc-400">Access Granted</p>
              </div>
              <span className="ml-auto text-xs font-bold text-yellow-500">
                {loc.unlock}
              </span>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
              className="bg-zinc-800/90 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Building className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  Ritz-Carlton London
                </p>
                <p className="text-[10px] text-zinc-400">
                  Suite Upgrade Confirmed
                </p>
              </div>
              <span className="ml-auto text-xs font-bold text-yellow-500">
                {loc.unlock}
              </span>
            </motion.div>

            {/* Digital Card Bottom */}
            <div className="mt-auto w-full h-24 rounded-t-2xl bg-gradient-to-br from-yellow-600 to-yellow-400 p-4 shadow-[0_-10px_30px_rgba(234,179,8,0.2)] flex flex-col justify-end">
              <div className="flex justify-between items-center text-black">
                <span className="font-mono font-bold tracking-widest">
                  **** 8892
                </span>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoFeatures = ({ lang }: { lang: LangType }) => {
  const loc = t[lang].features;
  return (
    <section
      id="features"
      className="py-24 px-6 max-w-7xl mx-auto bg-black border-t border-white/5"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {loc.title}
        </h2>
        <p className="text-zinc-400 text-lg">{loc.desc}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard className="md:col-span-2 md:row-span-2 items-start justify-end min-h-[400px]">
          <Award className="w-12 h-12 text-yellow-500 mb-6" />
          <h3 className="text-3xl font-bold text-white mb-3">{loc.f1}</h3>
          <p className="text-zinc-400 text-lg max-w-md">{loc.f1d}</p>
        </SpotlightCard>
        <SpotlightCard className="items-start text-left min-h-[200px]">
          <Plane className="w-8 h-8 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{loc.f2}</h3>
          <p className="text-zinc-400 text-sm">{loc.f2d}</p>
        </SpotlightCard>
        <SpotlightCard className="items-start text-left min-h-[200px]">
          <Building className="w-8 h-8 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{loc.f3}</h3>
          <p className="text-zinc-400 text-sm">{loc.f3d}</p>
        </SpotlightCard>
      </div>
    </section>
  );
};

const Testimonials = ({ lang }: { lang: LangType }) => {
  const loc = t[lang].testimonials;
  const reviews = [
    {
      name: "Tunde A.",
      role: loc.roles[0],
      text: "Vodium turned my good credit score into actual tangible luxury. The lounge access in Lagos and London is flawless.",
    },
    {
      name: "Sarah M.",
      role: loc.roles[1],
      text: "I don't need another loan app. Vodium gives me the VIP treatment I deserve for being financially responsible.",
    },
    {
      name: "David O.",
      role: loc.roles[2],
      text: "The app instantly upgraded my suite in Paris based purely on my verified credit profile. It's magic.",
    },
    {
      name: "Elena R.",
      role: loc.roles[3],
      text: "Finally, a platform that rewards financial health with premium hospitality instead of debt.",
    },
  ];
  const scrollingReviews = [...reviews, ...reviews];

  return (
    <section
      id="testimonials"
      className="py-24 bg-zinc-950 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {loc.title}
          </h2>
          <p className="text-zinc-400 text-lg">{loc.desc}</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
      </div>
      <div className="relative flex overflow-x-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
        <motion.div
          className="flex gap-6 whitespace-nowrap px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {scrollingReviews.map((review, idx) => (
            <div
              key={idx}
              className="w-[350px] flex-shrink-0 bg-black border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 transition-colors whitespace-normal"
            >
              <Quote className="w-8 h-8 text-zinc-800 mb-4" />
              <p className="text-zinc-300 mb-6 leading-relaxed">
                &quot;{review.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                <div>
                  <p className="text-white font-medium text-sm">
                    {review.name}
                  </p>
                  <p className="text-zinc-500 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-zinc-500 transition-transform duration-300",
            isOpen && "rotate-180 text-yellow-500",
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = ({ lang }: { lang: LangType }) => {
  const loc = t[lang].faq;
  const faqs = [
    { question: loc.q1, answer: loc.a1 },
    { question: loc.q2, answer: loc.a2 },
    { question: loc.q3, answer: loc.a3 },
    { question: loc.q4, answer: loc.a4 },
  ];
  return (
    <section id="faq" className="py-32 px-6 max-w-4xl mx-auto bg-black">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {loc.title}
        </h2>
        <p className="text-zinc-400 text-lg">{loc.desc}</p>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: LangType }) => {
  const loc = t[lang].footer;
  return (
    <footer className="bg-zinc-950 pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-900 border border-white/10 grayscale hover:grayscale-0 transition-all">
                <img
                  src="/logo.png"
                  alt="Vodium Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<span class="text-yellow-500 font-bold">V</span>';
                  }}
                />
              </div>
              <span className="text-2xl font-bold text-white">Vodium</span>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed">{loc.desc}</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">
                𝕏
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">
                in
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{loc.prod}</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li>
                <a
                  href="#tiers"
                  className="hover:text-yellow-500 transition-colors"
                >
                  VIP Tiers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  Lounge Access
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  Hotel Upgrades
                </a>
              </li>
              <li>
                <a
                  href="#app"
                  className="hover:text-yellow-500 transition-colors flex items-center gap-2"
                >
                  Beta App{" "}
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-500">
                    Live
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{loc.comp}</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  Press Kit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{loc.leg}</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-sm text-zinc-500">
          <p>© 2026 Vodium Technologies. {loc.rights}</p>
          <p className="flex items-center gap-1">
            Designed with <Shield className="w-3 h-3 text-zinc-400" /> in
            Silicon Valley
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function VodiumLandingPage() {
  const [lang, setLang] = useState<LangType>("EN");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="min-h-screen bg-black selection:bg-yellow-500/30 selection:text-yellow-200 font-sans overflow-x-hidden relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-yellow-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <CookieManager lang={lang} />
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <MetricsSection lang={lang} />
      <TiersSection lang={lang} />
      <BetaAppSection lang={lang} />
      <BentoFeatures lang={lang} />
      <Testimonials lang={lang} />
      <FAQSection lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
