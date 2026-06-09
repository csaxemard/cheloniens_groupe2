# Chelonians App (Group 2)

A desktop application to give informations about chelonians in Martinique

## Contributing

### Project Setup

```bash
# Requirements
git clone https://github.com/csaxemard/cheloniens_groupe2
cd cheloniens_groupe2
npm install

# Run (development)
npm run dev

# Build
npm run build:win   # For windows
npm run build:mac   # For macOS
npm run build:linux # For Linux
```

### Backlog
- Users login
    - User is connected, how to store these infos on his computer to avoid connecting every time ?
- Map
    - How to add a map of Martinique using leaflet or open street map (both ?)
    - Display a map of martinique only, with zoom enabled
    - on click, display a pin at this location on the map, get real world coordinates to store in a variable
    - _+ get other infos based on this location (surroundingCity, isInSea, )