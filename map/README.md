# Travel Map

This folder holds the interactive travel map for Rayford Knowledge Atlas: a county-level U.S. map
that lights up every county within a state Yifan Yang has visited. The live page is [`index.html`](./index.html),
served at `https://rayford295.github.io/rayford-knowledge-atlas/map/` and linked from the site
navigation as **Map**.

Amber counties mark the 18 visited states, and blue points locate recorded U.S. city stops. Hover a
county to see its county and state name. The page also lists every visited state and city.

## Coverage

- **18 of 50 U.S. states**
- **34 cities**
- **3 countries** (United States, Canada, and China)
- **4 life milestones** (hometown, B.S., M.S., Ph.D.)

## Visited states and cities

| Place                     | Cities                                                        |
| ------------------------- | ------------------------------------------------------------- |
| California                | Los Angeles (M.S.), San Diego, San Francisco, Irvine          |
| Nevada                    | Las Vegas                                                     |
| Arizona                   | Tucson, Phoenix                                               |
| New York                  | New York City                                                 |
| New Jersey                | Newark                                                        |
| Pennsylvania              | Philadelphia                                                  |
| Florida                   | Orlando, Miami, Gainesville, Tampa                            |
| South Carolina            | Columbia                                                      |
| North Carolina            | Charlotte                                                     |
| Texas                     | Houston, San Antonio, Dallas, Austin, College Station (Ph.D.) |
| Hawaii                    | Honolulu                                                      |
| Michigan                  | Detroit                                                       |
| New Mexico                | White Sands National Park                                     |
| Oregon                    | Portland                                                      |
| Washington                | Seattle                                                       |
| Alaska                    | Anchorage, Fairbanks                                          |
| Minnesota                 | Minneapolis                                                   |
| Illinois                  | Urbana-Champaign (UIUC) · I-GUIDE Summer School 2026, Chicago |
| Shaanxi (China)           | Xi'an (hometown)                                              |
| Hainan (China)            | Haikou (B.S.)                                                 |
| British Columbia (Canada) | Vancouver                                                     |

## Technical notes

- Rendered with [D3](https://d3js.org/) and [TopoJSON](https://github.com/topojson/topojson-client),
  using the Census-derived [`us-atlas`](https://github.com/topojson/us-atlas) county topology.
- City coordinates and the visited-state list are defined inline in `index.html` (the `PLACES` and
  `STATE_GROUPS` arrays). To add a place, append an entry to both, update the hero counters, and add
  its two-digit state FIPS code to `visitedStateIds` in the county-map script.
- Life milestones carry a `milestone` field in `PLACES` and render as larger blue points.
- Styling reuses the site theme (`../styles.css`) and the shared starfield background.
