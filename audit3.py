import os, re, json, html
from collections import Counter, defaultdict

DIST = r'C:\Users/Administrator/Desktop/georgia-demolition-experts/dist'
SITE = 'https://georgiademolitionandremoval.com'
data = json.load(open(r'C:\Users/Administrator/Desktop/georgia-demolition-experts/audit_data.json'))
rows = data['rows']

def fam(u):
    path = u[len(SITE):]
    parts = [p for p in path.split('/') if p]
    if path in ('', '/'): return 'home'
    if parts[:1]==['services'] and len(parts)==1: return 'services_index'
    if parts[:1]==['services'] and len(parts)==2: return 'service_category'
    if parts[:1]==['services'] and len(parts)==3: return 'service_sub'
    if parts[:1]==['locations'] and len(parts)==1: return 'locations_index'
    if parts[:1]==['locations'] and len(parts)==2: return 'city'
    if parts[:1]==['locations'] and len(parts)==3: return 'city_service'
    if parts[:1]==['locations'] and len(parts)==4: return 'city_service_sub'
    return 'other:'+'/'.join(parts[:2])

# Which cities have the "name-only" meta bug
print("=== CITY-SERVICE meta 'name only' BUG ===")
bad_meta = []
for u,d in rows.items():
    if fam(u)=='city_service' and len(d['meta']) < 20:
        bad_meta.append((u, d['meta']))
print("city_service pages with meta <20 chars:", len(bad_meta))
cities_bad = sorted(set(u.split('/')[4] for u,m in bad_meta))
print("affected cities (%d): %s" % (len(cities_bad), ', '.join(cities_bad)))
# Show all 5 for one city
for u,m in bad_meta:
    if 'alpharetta' in u:
        print("   ", u, "=> %r" % m)

# NAP / phone variants across site
print("\n=== NAP / PHONE VARIANTS ===")
phone_variants = Counter()
addr_street = 0
for u,d in rows.items():
    raw = open(d['raw_path'], encoding='utf-8', errors='ignore').read()
    found = re.findall(r'\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}', raw)
    for ph in found:
        phone_variants[re.sub(r'[^\d]','',ph)] += 1
for ph,c in phone_variants.most_common(12):
    print("   %s : %d" % (ph, c))

# Address consistency: does footer/contact show a street address?
print("\n=== ADDRESS PRESENCE ===")
addr_hits = 0
streetish = 0
for u,d in rows.items():
    raw = open(d['raw_path'], encoding='utf-8', errors='ignore').read()
    if 'Atlanta' in raw and 'GA' in raw:
        addr_hits += 1
    if re.search(r'\d{3,5}\s+[A-Z][a-z]+', raw):
        streetish += 1
print("pages mentioning Atlanta, GA:", addr_hits, " | pages with street-number+name:", streetish)

# Review markup details
print("\n=== REVIEW / AGGREGATE RATING MARKUP ===")
home_raw = open(rows[SITE+'/']['raw_path'], encoding='utf-8', errors='ignore').read()
am = re.search(r'"aggregateRating"\s*:\s*\{.*?\}', home_raw, re.S)
print("Home aggregateRating JSON-LD:", am.group(0)[:260] if am else 'NONE')
# Does ANY page contain individual Review objects?
rev_pages = []
for u,d in rows.items():
    raw = open(d['raw_path'], encoding='utf-8', errors='ignore').read()
    if re.search(r'"@type"\s*:\s*"Review"', raw) or re.search(r'"review"\s*:', raw):
        rev_pages.append(u)
print("pages with actual Review objects:", len(rev_pages))
# count how many pages include aggregateRating with ratingValue 4.9 + 127
agg_all = sum(1 for u,d in rows.items() if d['agg_schema'])
print("pages with aggregateRating present:", agg_all, "of", len(rows))

# 404 page audit
print("\n=== 404 PAGE ===")
p404 = SITE+'/404/'
d = rows.get(p404)
if d:
    print("canonical:", d['canonical'])
    print("title:", d['title'])
    print("words:", d['words'])
    print("aggregateRating on 404:", d['agg_schema'])
    print("indexable (no noindex, in sitemap?): noindex=%s" % d['noindex'])

# Title-template near-duplication among city_service_sub
print("\n=== TEMPLATED TITLE CHECK (city_service_sub) ===")
css = [u for u in rows if fam(u)=='city_service_sub']
templates = defaultdict(list)
for u in css:
    t = rows[u]['title']
    norm = re.sub(r'[A-Za-z]+', '#', t)
    templates[norm].append(u)
print("distinct title templates among %d city_service_sub pages: %d" % (len(css), len(templates)))
for tpl,us in sorted(templates.items(), key=lambda x:-len(x[1]))[:3]:
    print("   [%d] %s" % (len(us), tpl[:70]))
    for u in us[:1]:
        print("        e.g.", rows[u]['title'][:100])

# Duplicate meta strings overall (top)
print("\n=== TOP DUPLICATE METAS (all families) ===")
mc = Counter(d['meta'] for u,d in rows)
for m,c in mc.most_common(8):
    print("   [%d] %r" % (c, m[:80]))
