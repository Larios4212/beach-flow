import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui';
import {
  Waves, Map, BarChart3, CreditCard, Clock, Users,
  ArrowRight, Sparkles, Shield, Zap,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const FEATURES = [
  { icon: Map, title: 'Mapa Interactivo', desc: 'Vista top-down en tiempo real de todas las zonas: mar, arena, lounge y VIP.' },
  { icon: BarChart3, title: 'Métricas en Vivo', desc: 'Revenue por zona, ticket promedio, ocupación y tendencias por hora.' },
  { icon: CreditCard, title: 'Consumo Mínimo', desc: 'Control visual del progreso de consumo mínimo por mesa y zona.' },
  { icon: Clock, title: 'Tiempo Real', desc: 'Cronómetros activos, actualizaciones instantáneas y estado al segundo.' },
  { icon: Users, title: 'Gestión de Meseros', desc: 'Asignación de mesas, performance tracking y revenue por mesero.' },
  { icon: Shield, title: 'Multi-Zona', desc: 'Zonas diferenciadas con reglas independientes de consumo mínimo.' },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface-900">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-ocean-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-coral-500/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[350px] w-[500px] rounded-full bg-palm-500/6 blur-[90px]" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Logo size="md" />
        <Link
          to="/dashboard"
          className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2"
        >
          Abrir Dashboard <ArrowRight size={16} />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-20 text-center md:pt-24">
        <motion.div initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-ocean-500/30 bg-ocean-500/10 px-4 py-1.5 text-sm text-ocean-300">
            <Sparkles size={14} /> Smart Beach Club Management
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Gestiona tu beach club{' '}
            <span className="ocean-gradient-text">como nunca antes</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="mx-auto max-w-2xl text-lg text-surface-400 md:text-xl">
            Mapa interactivo en tiempo real, control de consumo mínimo por zona,
            métricas de revenue al instante. Todo desde un solo dashboard.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="btn-primary group rounded-xl px-7 py-3.5 text-base font-semibold flex items-center gap-2"
            >
              <Waves size={18} /> Ver Demo en Vivo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/Larios4212/beach-flow"
              target="_blank"
              rel="noopener"
              className="rounded-xl border border-surface-600 bg-surface-800/60 px-7 py-3.5 text-base font-semibold text-surface-300 transition hover:bg-surface-700"
            >
              GitHub ↗
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          variants={fadeUp}
          custom={5}
          initial="hidden"
          animate="visible"
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="glass-strong overflow-hidden rounded-2xl border border-surface-600/40 p-1 shadow-2xl shadow-ocean-500/5">
            <div className="relative aspect-[16/9] rounded-xl bg-surface-800/90 overflow-hidden">
              {/* Simulated map preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Ocean band */}
                <div className="absolute inset-x-0 top-0 h-[22%] bg-ocean-500/10">
                  <svg className="absolute bottom-0 w-[200%] animate-wave opacity-50" viewBox="0 0 1440 80" preserveAspectRatio="none">
                    <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,20 1440,40 L1440,80 L0,80 Z" fill="rgba(34,211,238,0.1)" />
                  </svg>
                </div>
                {/* Sand */}
                <div className="absolute inset-x-0 top-[22%] h-[20%] bg-sand-500/5" />
                {/* Lounge */}
                <div className="absolute inset-x-0 top-[42%] h-[24%] bg-palm-500/5" />
                {/* VIP */}
                <div className="absolute inset-x-0 top-[66%] bottom-0 bg-coral-500/5" />

                {/* Sample dots */}
                {[
                  { x: 20, y: 12, color: 'bg-ocean-400' },
                  { x: 45, y: 10, color: 'bg-palm-400' },
                  { x: 70, y: 14, color: 'bg-surface-600' },
                  { x: 15, y: 32, color: 'bg-ocean-400' },
                  { x: 50, y: 30, color: 'bg-coral-400' },
                  { x: 80, y: 34, color: 'bg-ocean-400' },
                  { x: 25, y: 55, color: 'bg-sand-400' },
                  { x: 60, y: 52, color: 'bg-ocean-400' },
                  { x: 85, y: 56, color: 'bg-palm-400' },
                  { x: 20, y: 78, color: 'bg-sand-300' },
                  { x: 50, y: 80, color: 'bg-ocean-400' },
                  { x: 80, y: 77, color: 'bg-sand-300' },
                ].map((d, i) => (
                  <motion.div
                    key={i}
                    className={`absolute h-4 w-4 rounded-full ${d.color} shadow-lg`}
                    style={{ left: `${d.x}%`, top: `${d.y}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.08 }}
                  />
                ))}

                {/* Overlay text */}
                <div className="relative z-10 text-center">
                  <p className="text-sm font-medium text-surface-400">Beach Map Preview</p>
                  <p className="text-xs text-surface-500">21 mesas · 4 zonas · tiempo real</p>
                </div>
              </div>
            </div>
          </div>
          {/* Shadow glow under preview */}
          <div className="absolute -bottom-8 inset-x-10 h-16 rounded-full bg-ocean-500/15 blur-2xl" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-surface-600/50 bg-surface-800/60 px-4 py-1.5 text-sm text-surface-400 mb-4">
            <Zap size={14} className="text-ocean-400" /> Features
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl font-bold text-white md:text-4xl">
            Todo lo que necesitas para gestionar tu beach club
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i}
              className="glass group rounded-2xl p-6 transition-all hover:border-ocean-500/20"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-700/80 text-ocean-400 transition-colors group-hover:bg-ocean-500/20">
                <f.icon size={22} />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-surface-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-surface-800 py-8 text-center">
        <p className="text-sm text-surface-500">
          BeachFlow © {new Date().getFullYear()} · Built by{' '}
          <a href="https://github.com/Larios4212" target="_blank" rel="noopener" className="text-ocean-400 hover:underline">
            Armando Larios
          </a>
        </p>
      </footer>
    </div>
  );
}
