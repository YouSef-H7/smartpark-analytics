
# SmartPark Analytics Dashboard

Enterprise-grade parking analytics frontend for the SmartPark Pro ecosystem.

## Features
- Real-time slot monitoring
- Utilization KPI dashboard
- Historical occupancy trends
- Infrastructure health monitoring
- Containerized for production deployment

## Development
```bash
npm install
npm run dev
```

## Production (Docker)
1. Set the backend URL in `docker-compose.yml`.
2. Run:
```bash
docker compose up -d --build
```

The application will be available on port 80. 
It uses a runtime configuration pattern to allow changing the backend URL without rebuilding the image.

## OCI Deployment
This application is designed to run on OCI Compute instances behind a Load Balancer. 
Ensure the Backend URL is configured to point to your internal Backend LB or API service.
