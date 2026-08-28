import os, re, json
from collections import Counter, defaultdict

DIST = r'C:\Users\Administrator\Desktop\georgia-demolition-experts/dist'
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

# 1. Content similarity: same sub-service, different city (doorway risk)
print("=== CONTENT SIMILARITY (same sub-service, diff city) ===")
def body_text(url):
    raw = open(rows[url]['raw_path'], encoding='utf-8', errors='ignore').read()
    mb = re.search(r'<main[^>]*>(.*?)</main>', raw, re.S|re.I)
    b = mb.group(1) if mb else raw
    b = re.sub(r'<script.*?</script>', ' ', b, flags=re.S|re.I)
    b = re.sub(r'<[^>]+>', ' ', b)
    # normalize city tokens
    return re.sub(r'\s+',' ', b)
# pick sub-service 'basement-removal' across 3 cities, compare
subs = ['basement-removal','debris-clean-up','building-demolition']
for s in subs:
    variants = sorted([u for u in rows if fam(u)=='city_service_sub' and u.endswith(s+'/')])
    if len(variants)>=3:
        txts = [body_text(v) for v in variants[:3]]
        # token overlap between a and b after removing city name
        import re as _re
        def toks(t):
            return set(w.lower() for w in _re.findall(r'[A-Za-z]{4,}', t))
        t0,t1 = toks(txts[0]), toks(txts[1])
        inter = len(t0 & t1); uni = len(t0 | t1)
        jac = inter/uni if uni else 0
        print("  %s: %d city pages; Jaccard(0,1)=%.2f ; len(0)=%d len(1)=%d" % (s, len(variants), jac, len(txts[0]), len(txts[1])))

# 2. Internal linking sample on a city_service_sub page
print("\n=== INTERNAL LINK SAMPLE (city_service_sub) ===")
u = [x for x in rows if fam(x)=='city_service_sub'][0]
raw = open(rows[u]['raw_path'], encoding='utf-8', errors='ignore').read()
links = re.findall(r'href="([^"]+)"', raw)
internal = [l for l in links if l.startswith('/')]
print("page:", u)
print("total hrefs:", len(links), " internal(/):", len(internal))
from collections import Counter as C
# categorize internal links by target family
def tgt(l):
    parts=[p for p in l.split('/') if p]
    if not parts: return 'home'
    if parts[0]=='services' and len(parts)==2: return 'service_category'
    if parts[0]=='services' and len(parts)==3: return 'service_sub'
    if parts[0]=='locations' and len(parts)==1: return 'locations_index'
    if parts[0]=='locations' and len(parts)==2: return 'city'
    if parts[0]=='locations' and len(parts)==3: return 'city_service'
    if parts[0]=='locations' and len(parts)==4: return 'city_service_sub'
    return 'other'
print("target families:", C(tgt(l) for l in internal).most_common())
# show a few distinct internal links
seen=set(); shown=0
for l in internal:
    if l not in seen:
        seen.add(l); print("   ", l); shown+=1
        if shown>=12: break

# 3. Canonical specific check on city_service_sub + parent
print("\n=== CANONICAL CHECK ===")
for u in [SITE+'/locations/albany/', SITE+'/locations/albany/residential-demolition/', SITE+'/locations/albany/residential-demolition/basement-removal/']:
    print("  %s" % u)
    print("     canonical => %s  (self=%s)" % (rows[u]['canonical'], rows[u]['canonical']==u))

# 4. 'Licensed Demo' / 'other' brand segments
print("\n=== BRAND SEGMENTS ===")
lic_demo = [u for u,d in rows.items() if 'Licensed Demo' in d['title'] and 'Georgia Demo Pros' not in d['title']]
print("'Licensed Demo' (not GDP) pages:", len(lic_demo), Counter(fam(u) for u in lic_demo))
other_t = [u for u,d in rows.items() if 'Licensed & Insured' not in d['title'] and 'Georgia Demo Pros' not in d['title'] and 'Licensed Demo' not in d['title']]
print("'other' brand pages:", len(other_t))
for u in other_t:
    print("   ", u, "=>", repr(rows[u]['title'][:90]))

# 5. The 2 broken-meta 'other'
print("\n=== BROKEN META 'other' (non city_service) ===")
broken_other = [u for u,d in rows.items() if (len(d['meta'])<20) and fam(u)!='city_service']
for u in broken_other:
    print("   ", u, "=>", repr(d_meta(u)) if False else '', repr(rows[u]['meta']))
