import os, re, json
from collections import Counter, defaultdict

DIST = r'C:\Users/Administrator\Desktop\georgia-demolition-experts/dist'
SITE = 'https://georgiademolitionandremoval.com'
data = json.load(open(r'C:\Users/Administrator\Desktop\georgia-demolition-experts/audit_data.json'))
rows = data['rows']

def fam(u):
    parts = [p for p in u[len(SITE):].split('/') if p]
    if not parts: return 'home'
    if parts[:1]==['services'] and len(parts)==1: return 'services_index'
    if parts[:1]==['services'] and len(parts)==2: return 'service_category'
    if parts[:1]==['services'] and len(parts)==3: return 'service_sub'
    if parts[:1]==['locations'] and len(parts)==1: return 'locations_index'
    if parts[:1]==['locations'] and len(parts)==2: return 'city'
    if parts[:1]==['locations'] and len(parts)==3: return 'city_service'
    if parts[:1]==['locations'] and len(parts)==4: return 'city_service_sub'
    return 'other'

# Brand string consistency in titles
print("=== BRAND STRING IN TITLES ===")
brand_hits = Counter()
for u,d in rows.items():
    t = d['title']
    brand_hits['Licensed & Insured' if 'Licensed & Insured' in t else
               'Georgia Demo Pros' if 'Georgia Demo Pros' in t else
               'Licensed Demo' if 'Licensed Demo' in t else
               'other'] += 1
for b,c in brand_hits.most_common():
    print("   %s : %d" % (b,c))

# Which pages use 'Georgia Demo Pros'
gdp = [u for u,d in rows.items() if 'Georgia Demo Pros' in d['title']]
print("\nPages with 'Georgia Demo Pros' in title:", len(gdp))
print("families:", Counter(fam(u) for u in gdp))
# are these same as broken-meta cities?
gdp_cities = set(u.split('/')[4] for u in gdp if 'locations/' in u)
print("cities w/ Georgia Demo Pros branding:", sorted(gdp_cities))

# Address detail: extract street address from footer of a few pages
print("\n=== STREET ADDRESS SAMPLE ===")
for u in [SITE+'/', SITE+'/contact/', SITE+'/locations/albany/']:
    raw = open(rows[u]['raw_path'], encoding='utf-8', errors='ignore').read()
    m = re.search(r'(\d{3,5}\s+[A-Z][A-Za-z.]+\s+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Lane|Ln|Dr|Drive|Hwy|Way|Circle|Ct|Court)[^<]*)', raw)
    print("  %s => %r" % (u, m.group(1)[:80] if m else 'none'))
    # postal
    pm = re.search(r'GA\s*\d{5}', raw)
    print("     postal: %r" % (pm.group(0) if pm else 'none'))

# Is there a Google Business Profile / GBP signal (NAP + GBP link)?
print("\n=== GBP SIGNAL ===")
home = open(rows[SITE+'/']['raw_path'], encoding='utf-8', errors='ignore').read()
print("'Google Business' mentioned:", bool(re.search(r'google business', home, re.I)))
print("'g.page' / 'business.site' link:", bool(re.search(r'g\.page|business\.google\.com|google\.com/maps/place', home, re.I)))
print("maps link present:", bool(re.search(r'google\.com/maps', home, re.I)))

# 404 link status - is /404/ linked from site?
print("\n=== 404 LINKED? ===")
linked404 = False
for u,d in rows.items():
    raw = open(d['raw_path'], encoding='utf-8', errors='ignore').read()
    if '/404/' in raw or '404.html' in raw:
        linked404 = True
        break
print("any page links to /404/:", linked404)
print("404 canonical:", rows[SITE+'/404/']['canonical'])
print("404 self-canonical & indexable:", rows[SITE+'/404/']['canonical']==SITE+'/404/' and not rows[SITE+'/404/']['noindex'])

# Count of broken meta by family precisely
print("\n=== BROKEN META BY FAMILY ===")
broken = [u for u,d in rows.items() if len(d['meta'])<20 or d['meta'].endswith(', GA')]
print("meta <20 chars or just 'City, GA':", len(broken))
print(Counter(fam(u) for u in broken))

# Title length > 60 (Google truncation threshold). Google ~ 600px ~ 60 chars
over = [u for u,d in rows.items() if len(d['title'])>60]
print("\nTitles >60 chars (risk truncation):", len(over), "of", len(rows))
over70 = [u for u,d in rows.items() if len(d['title'])>70]
print("Titles >70 chars:", len(over70))

# Meta >160
print("Metas >160 chars:", sum(1 for u,d in rows.items() if len(d['meta'])>160))
