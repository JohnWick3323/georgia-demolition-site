import os, re, json
from collections import Counter, defaultdict

DIST = r'C:\Users/Administrator/Desktop/georgia-demolition-experts/dist'
SITE = 'https://georgiademolitionandremoval.com'
data = json.load(open(r'C:\Users/Administrator\Desktop/georgia-demolition-experts/audit_data.json'))
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

# Title brand suffix buckets
print("=== TITLE BRAND SUFFIX ===")
def brand(t):
    if 'Georgia Demo Pros' in t: return 'Georgia Demo Pros'
    if 'Georgia Demo ' in t: return 'Georgia Demo (truncated)'
    if 'Licensed & Insured' in t: return 'Licensed & Insured'
    if 'Licensed Contractors' in t: return 'Licensed Contractors'
    if 'Georgia Demolition & Removal' in t: return 'Brand only (no tagline)'
    return 'other:'+t[-40:]
bc = Counter(brand(d['title']) for u,d in rows.items())
for b,c in bc.most_common():
    print("  %-30s %d" % (b,c))

# Body copy also shows Georgia Demo Pros?
gdp_body = 0
for u,d in rows.items():
    raw = open(d['raw_path'], encoding='utf-8', errors='ignore').read()
    if 'Georgia Demo Pros' in raw: gdp_body += 1
print("pages with 'Georgia Demo Pros' anywhere in HTML:", gdp_body)

# Schema: extract homepage JSON-LD, check @type and address
home_raw = open(rows[SITE+'/']['raw_path'], encoding='utf-8', errors='ignore').read()
lds = re.findall(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>', home_raw, re.S)
print("\n=== HOMEPAGE JSON-LD BLOCKS ===", len(lds))
for i,ld in enumerate(lds):
    print("block %d length=%d" % (i, len(ld)))
    types = re.findall(r'"@type"\s*:\s*"([^"]+)"', ld)
    print("  @type:", types)
    print("  has address:", '"address"' in ld, " | has streetAddress:", '"streetAddress"' in ld, " | has aggregateRating:", '"aggregateRating"' in ld)
    am = re.search(r'"aggregateRating"\s*:\s*\{.*?\}', ld, re.S)
    if am: print("  agg:", am.group(0)[:160])

# City + city_service word counts
print("\n=== CITY / CITY_SERVICE WORD COUNTS ===")
for f in ['city','city_service']:
    ws = [d['words'] for u,d in rows.items() if fam(u)==f]
    if ws:
        print("  %s n=%d min=%d med=%d max=%d" % (f, len(ws), min(ws), sorted(ws)[len(ws)//2], max(ws)))

# Meta >160 by family
print("\n=== META >160 BY FAMILY ===")
for f in sorted(set(fam(u) for u in rows)):
    ws = [u for u,d in rows.items() if fam(u)==f and len(d['meta'])>160]
    if ws: print("  %-16s %d pages >160 chars" % (f, len(ws)))

# Broken meta detail: the 75 city_service are 15 cities x 5 cats
bad = [(u,d['meta']) for u,d in rows.items() if fam(u)=='city_service' and len(d['meta'])<25]
cits = sorted(set(u.split('/')[4] for u,m in bad))
print("\n=== BROKEN city_service META: 15 cities x 5 cats = %d pages ===" % len(bad))
print("cities:", cits)

# Duplicate meta strings (counts)
print("\n=== DUPLICATE META STRINGS (>=2) ===")
mc = Counter(d['meta'] for u,d in rows.items())
dup = {m:c for m,c in mc.items() if c>1}
print("distinct dup meta strings:", len(dup), " total pages:", sum(dup.values()))
for m,c in sorted(dup.items(), key=lambda x:-x[1])[:6]:
    print("  [%d] %r" % (c, m[:70]))

# 404 in sitemap?
print("\n=== 404 INDEXABILITY ===")
print("404 in sitemap:", (SITE+'/404/') in open(os.path.join(DIST,'sitemap-0.xml')).read())
