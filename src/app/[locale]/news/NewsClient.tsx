"use client"
import { useState, useEffect } from 'react'
import { ArrowRight, Clock, Search, ChevronRight, Newspaper, Calendar, X, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Layout from '@/components/Layout/Layout'
import Section from '@/components/ui/section'
import Image from 'next/image'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from "react-share"
import Link from 'next/link'

type ArticleType = {
  _id: string
  title: string
  slug: string
  publishedAt?: string
  excerpt?: string
  body?: unknown
  category?: string
  readTime?: string
  media?: string
  pdfurl?: string
}

interface NewsClientProps {
  locale: string
  t: (key: string, params?: Record<string, unknown>) => string
  initialArticles: ArticleType[]
}

export default function NewsClient({ locale, t, initialArticles }: NewsClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [email, setEmail] = useState('')
  const [loadingSubscribe, setLoadingSubscribe] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null)
  const [articles] = useState<ArticleType[]>(initialArticles)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.excerpt ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    try { return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
    catch { return dateString || '' }
  }

  const truncate = (text: string, maxLength: number) => {
    if (!text) return ''
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubscribe = async () => {
    setSubscribeMessage(null)
    if (!/^\S+@\S+\.\S+$/.test(email)) { setSubscribeMessage(t('news.newsletter.invalidEmail')); return }
    try {
      setLoadingSubscribe(true)
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      const data = await res.json()
      if (!res.ok) { setSubscribeMessage(data?.error || t('news.newsletter.error')) }
      else { setSubscribeMessage(t('news.newsletter.success')); setEmail('') }
    } catch { setSubscribeMessage(t('news.newsletter.networkError')) }
    finally { setLoadingSubscribe(false) }
  }

  return (
    <Layout>
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Actualités</span>
          </nav>
          <div className={`max-w-3xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-linear-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 mb-6">
              <Newspaper className="w-4 h-4 mr-2" />Actualités &amp; Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">Actualités scientifiques</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">Derniers articles, notes d'application et événements</p>
          </div>
        </div>
      </section>

      <Section background="muted">
        <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher un article..." className="pl-12 h-12 rounded-xl border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="mb-8"><p className="text-sm text-muted-foreground">{filteredArticles.length} articles</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <article key={article.slug} className={`group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}>
              <div className="relative h-52 overflow-hidden">
                {article.media && article.media !== "a remplir" ? (article.media.endsWith('.mp4') ? <video src={article.media} controls className="w-full h-full object-cover" /> : <Image src={article.media} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />) : <div className="w-full h-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center"><Newspaper className="w-16 h-16 text-primary/30" /></div>}
                <div className="absolute top-4 left-4"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r border backdrop-blur-sm">{article.category}</span></div>
                <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5" /><span>{formatDate(article.publishedAt ?? '')}</span><span className="mx-1">-</span><Clock className="w-3.5 h-3.5" /><span>{article.readTime}</span></div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{truncate(article.excerpt ?? '', 120)}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1">
                    <FacebookShareButton url={`${typeof window !== 'undefined' ? window.location.origin : ''}${article.pdfurl}`}><div className="p-2 rounded-lg hover:bg-primary/10 transition-colors"><FacebookIcon size={18} round /></div></FacebookShareButton>
                    <TwitterShareButton url={`${typeof window !== 'undefined' ? window.location.origin : ''}${article.pdfurl}`} title={article.title}><div className="p-2 rounded-lg hover:bg-primary/10 transition-colors"><TwitterIcon size={18} round /></div></TwitterShareButton>
                    <LinkedinShareButton url={`${typeof window !== 'undefined' ? window.location.origin : ''}${article.pdfurl}`} title={article.title}><div className="p-2 rounded-lg hover:bg-primary/10 transition-colors"><LinkedinIcon size={18} round /></div></LinkedinShareButton>
                    <button onClick={() => handleCopyLink(article.pdfurl ?? '')} className="p-2 rounded-lg hover:bg-primary/10 transition-colors" title="Copier le lien">{copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-muted-foreground" />}</button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover hover:bg-primary/10 group/btn" onClick={() => setPdfUrl(article.pdfurl ?? null)}>
                    Lire la suite<ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center"><Search className="w-10 h-10 text-primary/50" /></div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Aucun article trouvé</h3>
            <p className="text-muted-foreground mb-6">Essayez une autre recherche ou catégorie</p>
            <Button variant="outline" className="rounded-xl" onClick={() => { setSearchTerm(''); setSelectedCategory('all') }}>Réinitialiser</Button>
          </div>
        )}
      </Section>

      <Section background="gradient" decorated>
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-foreground border border-white/20 mb-6">Newsletter</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Restez informé</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Recevez nos dernières actualités et notes d'application</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="votre@email.com" className="flex-1 h-12 rounded-xl bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button className="h-12 px-6 rounded-xl bg-linear-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25" onClick={handleSubscribe} disabled={loadingSubscribe}>
              {loadingSubscribe ? "Envoi..." : "S'inscrire"}<ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          {subscribeMessage && <p className={`text-sm mt-4 ${subscribeMessage.includes('succès') || subscribeMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{subscribeMessage}</p>}
          <p className="text-xs text-muted-foreground mt-4">En vous inscrivant, vous acceptez notre politique de confidentialité.</p>
        </div>
      </Section>

      {pdfUrl && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden relative shadow-2xl border border-border/50">
            <div className="absolute top-0 left-0 right-0 h-14 bg-card/95 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-4 z-10">
              <span className="text-sm font-medium text-foreground">Aperçu du document</span>
              <button className="p-2 rounded-xl hover:bg-secondary/50 transition-colors" onClick={() => setPdfUrl(null)}><X className="w-5 h-5 text-foreground" /></button>
            </div>
            <iframe src={pdfUrl} className="w-full h-full pt-14" title="Article PDF" />
          </div>
        </div>
      )}
    </Layout>
  )
}
