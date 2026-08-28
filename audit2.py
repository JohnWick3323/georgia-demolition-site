import os, re, json, html
from collections import Counter, defaultdict

DIST = r'C:\Users\Administrator\Desktop\georgia-demolition-experts\dist'
SITE = 'https://georgiademolitionandremoval.com'
data = json.load(open(r'C:\Users\Administrator\Desktop\georgia-demolition-experts\audit_data.json'))
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

famc = Counter(fam(u) for u in rows.keys())
print("=== FAMILY COUNTS ===")
for f,c in sorted(famc.items(), key=lambda x:-x[1]):
    print("  %-20s %d" % (f,c))

# Title length distribution
print("\n=== TITLE LENGTH DISTRIBUTION ===")
tl = [(u, len(d['title'])) for u,d in rows.items()]
lens = sorted(L for u,L in tl)
print("min/median/max:", lens[0], lens[len(lens)//2], lens[-1])
buckets = Counter('<=30' if L<=30 else '31-50' if L<=50 else '51-60' if L<=60 else '61-70' if L<=70 else '71+' for u,L in tl)
for b in ['<=30','31-50','51-60','61-70','71+']:
    print("  %-6s %d" % (b, buckets.get(b,0)))
print("Sample long titles:")
for u,L in sorted(tl, key=lambda x:-x[1])[:5]:
    print("   %d | %s | %s" % (L, u, rows[u]['title'][:100]))
# the 2 short
print("Short titles (<=60):")
for u,L in tl:
    if L<=60:
        print("   %d | %s | %r" % (L, u, rows[u]['title']))

# Duplicate/near-dup meta investigation: city_service family sample
print("\n=== SAMPLE city_service META (dup pattern) ===")
cs = [u for u in rows.keys() if fam(u)=='city_service']
print("city_service count:", len(cs))
for u in cs[:6]:
    print("   %s meta=%r" % (u, rows[u]['meta']))

# NAP consistency: phone (843) 241-0787
print("\n=== NAP / PHONE ===")
phone_variants = defaultdict(int)
addr_present = 0
for u,d in rows.items().items():
    raw = open(d['raw_path'], encoding='utf-8', errors='ignore').read()
    # find phone-like patterns
    found = re.findall(r'\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}', raw)
    for ph in found:
        phone_variants[re.sub(r'[^\d]','',ph)] += 1
print("phone digit-strings (top):")
for ph,c in Counter(phone_variants).most_common(10):
    print("   %s : %d pages" % (ph, c))
# check 843 vs 404 area
print("8432410787 (config) occurrences:", phone_variants.get('8432410787',0))

# Review markup / aggregateRating detail
print("\n=== REVIEW MARKUP ===")
agg_pages = [u for u,d in rows.items() if d['agg_schema']]
print("pages with aggregateRating:", len(agg_pages))
# check 404 page has it
print("404 has agg:", rows[SITE+'/404/']['agg_schema'] if (SITE+'/404/') in rows else '404 not in rows')
# does city_service_sub have review markup AND aggregateRating
css = [u for u in rows.keys() if fam(u)=='city_service_sub']
print("city_service_sub with aggRating:", sum(1 for u in css if rows[u]['agg_schema']))
# check for actual Review items (individual reviews)
withrev = [u for u,d in rows.items().items() if d['agg_schema'] and 'Review' in open(d['raw_path'],encoding='utf-8',errors='ignore').read()]
print("pages whose schema contains 'Review' object:", len(withrev))
# Extract the aggregateRating value from homepage
home_raw = open(rows[SITE+'/']['raw_path'], encoding='utf-8', errors='ignore').read()
am = re.search(r'"aggregateRating"\s*:\s*\{[^}]*\}', home_raw, re.S)
print("Home aggregateRating snippet:", am.group(0)[:200] if am else 'none')

# Thin pages
print("\n=== THIN PAGES (<150 words) ===")
for u,d in rows.items().items():
    if d['words'] < 150:
        print("   %s words=%d fam=%s" % (u, d['words'], fam(u)))

# Templated/near-duplicate title check: strip city/service tokens, group by template
print("\n=== TEMPLATED TITLE CHECK (city_service_sub) ===")
templates = defaultdict(list)
for u in css:
    t = rows[u]['title']
    # normalize: replace slug tokens
    norm = re.sub(r'[A-Za-z]+', '#', t)
    templates[norm].append(u)
print("distinct title templates among %d city_service_sub pages: %d" % (len(css), len(templates)))
for tpl,us in sorted(templates.items(), key=lambda x:-len(x[1]))[:5]:
    print("   [%d] %s" % (len(us), tpl[:80]))
    for u in us[:2]:
        print("        ", rows[u]['title'][:90])

# Canonical on 404
print("\n=== 404 PAGE CHECK ===")
p404 = SITE+'/404/'
if p404 in rows:
    print("404 canonical:", rows[p404]['canonical'])
    print("404 title:", rows[p404]['title'])
    print("404 words:", rows[p404]['words'])
    print("404 aggSchema:", rows[p404]['agg_schema'])
