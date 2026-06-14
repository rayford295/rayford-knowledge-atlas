# Travel Map

This folder holds the interactive travel map for Rayford Knowledge Atlas: a Globe.GL 3D globe
that lights up the places Yifan Yang has visited. The live page is [`index.html`](./index.html),
served at `https://rayford295.github.io/rayford-knowledge-atlas/map/` and linked from the site
navigation as **Map**.

Drag to rotate the globe, scroll to zoom, and hover a glowing point to see the city. Pulsing rings
mark each visited place. The page also lists every visited state and city for readers without WebGL.

## Coverage

- **17 of 50 U.S. states**
- **26 cities**
- **2 countries** (United States and Canada)

## Visited states and cities

| Place | Cities |
| --- | --- |
| California | Los Angeles, San Diego, San Francisco |
| Nevada | Las Vegas |
| Arizona | Tucson, Phoenix |
| New York | New York City |
| New Jersey | Newark |
| Pennsylvania | Philadelphia |
| Florida | Orlando, Miami |
| South Carolina | Columbia |
| North Carolina | Charlotte |
| Texas | Houston, San Antonio, Dallas, Austin |
| Hawaii | Honolulu |
| Michigan | Detroit |
| New Mexico | White Sands National Park |
| Oregon | Portland |
| Washington | Seattle |
| Alaska | Anchorage, Fairbanks |
| Minnesota | Minneapolis |
| British Columbia (Canada) | Vancouver |

## Technical notes

- Rendered with [Globe.GL](https://github.com/vasturiano/globe.gl), pinned to version 2.46.1 and
  loaded with Subresource Integrity.
- City coordinates and the visited-state list are defined inline in `index.html` (the `PLACES` and
  `STATE_GROUPS` arrays). To add a place, append an entry to both.
- Styling reuses the site theme (`../styles.css`) and the shared starfield background.
