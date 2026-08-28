import os, re, json, html
from collections import Counter, defaultdict

DIST = r'C:\Users\Administrator\Desktop\georgia-demolition-experts\dist'
SITE = 'https://georgiademolitionandremoval.com'

def walk_html():
    for root, dirs, files in os.walk(DIST):
        for f in files:
            if f.endswith('.html'):
                p = os.path.join(root, f).replace('\\', '/')
                rel = p[len(DIST.rstrip('/'))+1:]
                if rel == 'index.html':
                    url = SITE + '/'
                else:
                    u = rel[:-5]
                    if u.endswith('/index'):
                        u = u[:-6]
                    url = SITE + '/' + u + '/'
                yield url, p

def parse(path):
    raw = open(path, encoding='utf-8', errors='ignore').read()
    out = {}
    # title
    m = re.search(r'<title[^>]*>(.*?)</title>', raw, re.S|re.I)
    out['title'] = html.unescape(re.sub(r'\s+',' ',m.group(1)).strip()) if m else ''
    # meta description
    m = re.search(r'<meta[^>]+name=["\']description["\'][^>]*content=["\'](.*?)["\']', raw, re.S|re.I)
    if not m:
        m = re.search(r'<meta[^>]+content=["\'](.*?)["\'][^>]*name=["\']description["\']', raw, re.S|re.I)
    out['meta'] = html.unescape(m.group(1).strip()) if m else ''
    # canonical
    m = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']', raw, re.S|re.I)
    if not m:
        m = re.search(r'<link[^>]+href=["\'](.*?)["\'][^>]*rel=["\']canonical["\']', raw, re.S|re.I)
    out['canonical'] = m.group(1).strip() if m else ''
    # noindex
    out['noindex'] = bool(re.search(r'noindex', raw, re.I))
    # gtag/gtm
    out['gtag'] = bool(re.search(r'gtag\(|googletagmanager\.com|GTM-|gtag\.js', raw, re.I))
    out['gtm'] = bool(re.search(r'GTM-', raw))
    # h1
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', raw, re.S|re.I)
    out['h1'] = [html.unescape(re.sub(r'<[^>]+>','',h)).strip() for h in h1s]
    out['h1_count'] = len(h1s)
    # robots meta
    m = re.search(r'<meta[^>]+name=["\']robots["\'][^>]*content=["\'](.*?)["\']', raw, re.S|re.I)
    out['robots'] = m.group(1).strip() if m else ''
    # word count of body text (strip tags from main content area)
    body = raw
    mb = re.search(r'<main[^>]*>(.*?)</main>', raw, re.S|re.I)
    if mb: body = mb.group(1)
    text = re.sub(r'<script.*?</script>', ' ', body, flags=re.S|re.I)
    text = re.sub(r'<style.*?</style>', ' ', text, flags=re.S|re.I)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = html.unescape(text)
    words = re.findall(r"[A-Za-z][A-Za-z'\-]+", text)
    out['words'] = len(words)
    # contact iframe
    out['contact_iframe'] = bool(re.search(r'link\.westlanddre\.com', raw, re.I))
    # aggregateRating / json-ld
    out['agg_schema'] = bool(re.search(r'aggregateRating', raw, re.I))
    out['jsonld'] = bool(re.search(r'application/ld\+json', raw, re.I))
    out['rating_count'] = '127' if re.search(r'"reviewCount"\s*:\s*"127"', raw) else ('127n' if re.search(r'"reviewCount"\s*:\s*127', raw) else '')
    # internal links count
    links = re.findall(r'href=["\']([^"\']+)["\']', raw, re.I)
    internal = [l for l in links if l.startswith('/') or l.startswith(SITE) or l.startswith('https://georgiademolitionandremoval.com')]
    out['internal_links'] = len(internal)
    out['raw_path'] = path
    return out

rows = []
for url, p in walk_html():
    try:
        rows.append((url, parse(p)))
    except Exception as e:
        print("ERR", url, e)

print("Parsed pages:", len(rows))

# 1. Title analysis
titles = [(u, d['title']) for u,d in rows]
title_lens = [(u, len(t)) for u,t in titles]
too_long = [u for u,l in title_lens if l>60]
too_short = [u for u,l in title_lens if 0<l<30]
empty_title = [u for u,t in titles if t=='']
print("\n=== TITLE ===")
print("empty titles:", len(empty_title))
print("title >60 chars:", len(too_long))
print("title <30 chars:", len(too_short))
tc = Counter(t for u,t in titles)
dup_titles = {t:c for t,c in tc.items() if c>1}
print("distinct duplicate title strings:", len(dup_titles), " total pages sharing a dup title:", sum(dup_titles.values()))
for t,c in sorted(dup_titles.items(), key=lambda x:-x[1])[:15]:
    print("   [%d] %r" % (c, t[:90]))

# 2. Meta description
metas = [(u,d['meta']) for u,d in rows]
empty_meta = [u for u,m in metas if m=='']
meta_long = [u for u,m in metas if len(m)>160]
mc = Counter(m for u,m in metas)
dup_metas = {m:c for m,c in mc.items() if c>1}
print("\n=== META DESCRIPTION ===")
print("empty meta:", len(empty_meta))
print("meta >160 chars:", len(meta_long))
print("distinct dup meta strings:", len(dup_metas), " pages sharing dup meta:", sum(dup_metas.values()))
for m,c in sorted(dup_metas.items(), key=lambda x:-x[1])[:10]:
    print("   [%d] %r" % (c, m[:90]))

# 3. H1
no_h1 = [u for u,d in rows if d['h1_count']==0]
multi_h1 = [u for u,d in rows if d['h1_count']>1]
print("\n=== H1 ===")
print("pages with NO h1:", len(no_h1))
print("pages with MULTIPLE h1:", len(multi_h1))
for u in multi_h1[:5]:
    print("   ", u, rows_with(u) if False else '')

# 4. Canonical
nocan = [u for u,d in rows if d['canonical']=='']
print("\n=== CANONICAL ===")
print("pages missing canonical:", len(nocan))
# check canonical self-pointing issues on combo pages
combo_bad = []
for u,d in rows:
    if d['canonical'] and 'locations/' in u:
        # canonical should match the page url (trailing slash)
        cu = d['canonical'].rstrip('/')
        pu = u.rstrip('/')
        if cu != pu:
            combo_bad.append((u, d['canonical']))
print("canonical != self (locations family):", len(combo_bad))
for u,c in combo_bad[:10]:
    print("   page=%s  canon=%s" % (u, c))

# 5. Noindex on indexable
nip = [u for u,d in rows if d['noindex']]
print("\n=== NOINDEX ===")
print("pages with noindex:", len(nip))
for u in nip[:10]: print("   ", u)

# 6. Analytics
print("\n=== ANALYTICS ===")
print("pages with gtag/GTM:", sum(1 for u,d in rows if d['gtag']))
print("pages with GTM id:", sum(1 for u,d in rows if d['gtm']))

# 7. Word count distribution
wl = sorted((d['words'] for u,d in rows))
import statistics
print("\n=== WORD COUNT ===")
print("min/median/max:", wl[0], wl[len(wl)//2], wl[-1])
thin = [u for u,d in rows if d['words'] < 150]
print("pages with <150 words:", len(thin))
# by family
def fam(u):
    if u==SITE+'/': return 'home'
    if u.startswith(SITE+'/services/') and u.count('/')==4: return 'service_category'
    if u.startswith(SITE+'/services/') and u.count('/')==5: return 'service_sub'
    if u==SITE+'/services/': return 'services_index'
    if u==SITE+'/locations/': return 'locations_index'
    if u.startswith(SITE+'/locations/') and u.count('/')==3: return 'city'
    if u.startswith(SITE+'/locations/') and u.count('/')==4: return 'city_service'
    if u.startswith(SITE+'/locations/') and u.count('/')==5: return 'city_service_sub'
    return 'other'
fam_words = defaultdict(list)
for u,d in rows:
    fam_words[fam(u)].append(d['words'])
print("\n=== WORDS BY FAMILY ===")
for f in sorted(fam_words):
    ws = fam_words[f]
    print("  %-20s n=%-5d min=%-5d med=%-5d max=%-5d thin(<150)=%d" % (f, len(ws), min(ws), sorted(ws)[len(ws)//2], max(ws), sum(1 for w in ws if w<150)))

# 8. Contact iframe
print("\n=== CONTACT IFRAME ===")
print("pages with westlanddre iframe:", sum(1 for u,d in rows if d['contact_iframe']))

# 9. Aggregate rating schema
print("\n=== AGGREGATE RATING ===")
print("pages with aggregateRating in schema:", sum(1 for u,d in rows if d['agg_schema']))
print("pages with json-ld:", sum(1 for u,d in rows if d['jsonld']))
# show which pages
agg_pages = [u for u,d in rows if d['agg_schema']]
for u in agg_pages[:10]: print("   ", u)

# 10. Internal links
print("\n=== INTERNAL LINKS ===")
il = sorted(d['internal_links'] for u,d in rows)
print("min/med/max internal links:", il[0], il[len(il)//2], il[-1])
low = [u for u,d in rows if d['internal_links'] < 10]
print("pages with <10 internal links:", len(low))

# save
json.dump({'rows':{u:d for u,d in rows}, 'fam':{k:v for k,v in fam_words.items()}}, open(os.path.join(DIST,'..','audit_data.json'),'w'), default=str)
print("\nsaved audit_data.json")
