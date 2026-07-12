# Travel Map

This folder holds the interactive travel map for Rayford Knowledge Atlas: a Globe.GL 3D globe
that lights up the places Yifan Yang has visited. The live page is [`index.html`](./index.html),
served at `https://rayford295.github.io/rayford-knowledge-atlas/map/` and linked from the site
navigation as **Map**.

Drag to rotate the globe, scroll to zoom, and hover a glowing point to see the city. Pulsing rings
mark each visited place. Sky-blue points mark four life milestones — Xi'an (hometown), Haikou (B.S.),
Los Angeles (M.S.), and College Station (Ph.D.) — connected by animated arcs that trace the journey.
The page also lists every visited state and city for readers without WebGL.

## Coverage

- **18 of 50 U.S. states**
- **30 cities**
- **3 countries** (United States, Canada, and China)
- **4 life milestones** (hometown, B.S., M.S., Ph.D.)

## Visited states and cities

| Place | Cities |
| --- | --- |
| California | Los Angeles (M.S.), San Diego, San Francisco |
| Nevada | Las Vegas |
| Arizona | Tucson, Phoenix |
| New York | New York City |
| New Jersey | Newark |
| Pennsylvania | Philadelphia |
| Florida | Orlando, Miami |
| South Carolina | Columbia |
| North Carolina | Charlotte |
| Texas | Houston, San Antonio, Dallas, Austin, College Station (Ph.D.) |
| Hawaii | Honolulu |
| Michigan | Detroit |
| New Mexico | White Sands National Park |
| Oregon | Portland |
| Washington | Seattle |
| Alaska | Anchorage, Fairbanks |
| Minnesota | Minneapolis |
| Illinois | Urbana-Champaign (UIUC) |
| Shaanxi (China) | Xi'an (hometown) |
| Hainan (China) | Haikou (B.S.) |
| British Columbia (Canada) | Vancouver |

## Technical notes

- Rendered with [Globe.GL](https://github.com/vasturiano/globe.gl), pinned to version 2.46.1 and
  loaded with Subresource Integrity.
- City coordinates and the visited-state list are defined inline in `index.html` (the `PLACES` and
  `STATE_GROUPS` arrays). To add a place, append an entry to both, and update the hero counters.
- Life milestones carry a `milestone` field in `PLACES` (rendered as larger sky-blue points), and the
  `JOURNEY` array defines the animated great-circle arcs between them.
- Styling reuses the site theme (`../styles.css`) and the shared starfield background.
