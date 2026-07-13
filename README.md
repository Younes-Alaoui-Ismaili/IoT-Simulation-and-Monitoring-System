# IoT Simulation and Monitoring System

> A front-end IoT monitoring dashboard built with React, TypeScript and Vite, driven by a self-contained simulated data layer.

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-prototype-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

A single-page dashboard that visualizes live device telemetry (temperature, humidity, power, signal) in real-time line charts. Instead of a backend, it ships a **simulated data layer**: a React hook generates and mutates device metrics on a fixed tick, which keeps the project fully self-contained and runnable with a single command, and makes it an easy base to later swap for a real data source (WebSocket, REST, or a message stream).

<!-- SCREENSHOTS: inserted during the polish pass (docs/screenshots/dashboard.png). Kept as a comment for now so nothing renders broken. -->

## Features

- **Real-time telemetry**: device metrics update on a 2-second tick and stream into the UI.
- **Live charts**: time-series line charts (Recharts) with a rolling history window per metric.
- **Device status cards**: per-device status, latest readings, and last-seen timestamp, with icon-based readouts (lucide-react).
- **Simulated network resilience**: the data layer models intermittent connection loss and recovery, surfaced through a status indicator with a manual retry control.
- **Dark mode ready**: Tailwind `dark:` styling throughout.
- **Fully typed domain model**: device, alert, metric, group, maintenance, automation and audit types defined as TypeScript interfaces.

## Architecture

The application is entirely client-side. A single hook owns the simulated state and pushes updates into the component tree, which renders it through Recharts.

```mermaid
flowchart LR
    Sim["useSimulatedData hook<br/>(setInterval, 2s tick)"] -->|device + metric state| State[App state]
    State --> Cards[DeviceCard grid]
    State --> Charts[MetricsChart]
    Charts -->|LineChart| Recharts[(Recharts)]
    State --> Net[NetworkStatus overlay]
```

- `src/hooks/useSimulatedData.ts`: owns all state, generates metric updates on an interval, models bounded random walks per metric and simulated connectivity loss.
- `src/components/Dashboard/`: presentational components (device cards, charts, and additional scaffolded views).
- `src/types/index.ts`: the shared domain model.

## Tech stack

- **Framework**: React 18 + TypeScript
- **Build tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Charts**: Recharts
- **Icons**: lucide-react

## Getting started

Requirements: Node.js 18+ and npm.

```bash
# install exact dependencies
npm ci

# start the dev server
npm run dev

# production build
npm run build

# preview the production build
npm run preview
```

Then open the URL printed by Vite (default `http://localhost:5173`).

## Roadmap

This is a prototype kept as a technical showcase. Candidate next steps, in rough order:

- Replace the simulated data layer with a real data source (WebSocket or REST).
- Flesh out the scaffolded views (device map, automation rules, maintenance and audit logs) or trim them to keep the dashboard focused.
- Add a test suite and continuous integration.
- Persist and configure devices instead of seeding them in code.

## License

Released under the [MIT License](LICENSE).
