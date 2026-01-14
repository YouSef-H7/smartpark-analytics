# ✅ SMARTPARK ANALYTICS - OCI DEPLOYMENT GUIDE

## STATUS: PRODUCTION-READY FOR DEPLOYMENT

All validation passed. Zero OCI configuration changes required.

---

## STEP 1: Load Image on OCI VM

```bash
# SSH into OCI VM
ssh -i /path/to/ssh-key.key opc@<VM_IP>

# Navigate to where you uploaded the tar file
cd /home/opc

# Load the Docker image from tar
docker load -i smartpark-analytics.tar

# Verify image is loaded
docker images | grep smartpark-analytics
```

---

## STEP 2: Run Container on OCI VM

```bash
# Run the container
docker run -d \
  --name smartpark-analytics \
  -p 80:80 \
  -e VITE_BACKEND_URL=http://<YOUR_BACKEND_IP>:<PORT> \
  smartpark-analytics:production

# Example (adjust backend URL to your actual backend):
docker run -d \
  --name smartpark-analytics \
  -p 80:80 \
  -e VITE_BACKEND_URL=http://10.0.0.50:8080 \
  smartpark-analytics:production
```

**Note:** Replace `<YOUR_BACKEND_IP>:<PORT>` with your actual backend service address.

---

## STEP 3: Verify Container is Running

```bash
# Check container status
docker ps | grep smartpark-analytics

# Check logs (should show nginx started)
docker logs smartpark-analytics

# Test endpoint from VM
curl http://localhost/analytics/

# Expected output: HTML page with "SmartPark Analytics"
```

---

## STEP 4: Verify OCI Load Balancer Routing

The OCI Load Balancer is already configured with:
- ✅ Listener on port 80
- ✅ Path-based routing: `/analytics/*` → This VM
- ✅ Health check on `/analytics/`

**No additional OCI configuration is needed.**

Test from your local machine:
```bash
curl http://<LOAD_BALANCER_IP>/analytics/
```

---

## STEP 5: Test All Routes

```bash
# From OCI VM or local machine:
curl http://<LOAD_BALANCER_IP>/analytics/
curl http://<LOAD_BALANCER_IP>/analytics/slots
curl http://<LOAD_BALANCER_IP>/analytics/health

# All should return 200 OK with HTML content
```

---

## TROUBLESHOOTING

### Container won't start
```bash
docker logs smartpark-analytics
# Check for port 80 conflicts or missing backend URL
```

### Routes return 404
```bash
# SSH to VM and check nginx config
docker exec smartpark-analytics nginx -t
docker logs smartpark-analytics
```

### Assets not loading
```bash
# Check that assets exist in container
docker exec smartpark-analytics ls /usr/share/nginx/html/assets/

# Test asset directly
curl http://<VM_IP>/analytics/assets/index-e03b932f.js
```

### Backend not connected
Set the correct `VITE_BACKEND_URL` environment variable:
```bash
docker stop smartpark-analytics
docker rm smartpark-analytics
docker run -d \
  --name smartpark-analytics \
  -p 80:80 \
  -e VITE_BACKEND_URL=http://<CORRECT_BACKEND_URL> \
  smartpark-analytics:production
```

---

## PRODUCTION CHECKS

Run these commands on the OCI VM after deployment:

```bash
# 1. Container is healthy
docker inspect smartpark-analytics --format='{{.State.Health.Status}}'
# Expected: "healthy"

# 2. Nginx is running
docker exec smartpark-analytics nginx -t
# Expected: "configuration file test is successful"

# 3. No errors in logs
docker logs smartpark-analytics | grep -i error
# Expected: (no output)

# 4. Main page responds
docker exec smartpark-analytics wget -q -O- http://localhost/analytics/ | grep "SmartPark"
# Expected: HTML content with "SmartPark"
```

---

## QUICK REFERENCE

| Task | Command |
|------|---------|
| **Load image** | `docker load -i smartpark-analytics.tar` |
| **Start container** | `docker run -d --name smartpark-analytics -p 80:80 -e VITE_BACKEND_URL=http://<backend> smartpark-analytics:production` |
| **View logs** | `docker logs smartpark-analytics` |
| **Test app** | `curl http://localhost/analytics/` |
| **Stop container** | `docker stop smartpark-analytics` |
| **Remove container** | `docker rm smartpark-analytics` |
| **Restart** | `docker restart smartpark-analytics` |

---

## ✅ WHAT'S INCLUDED

- ✅ **React + Vite SPA** configured for `/analytics` sub-path
- ✅ **BrowserRouter** with `basename="/analytics"`
- ✅ **Vite base path** set to `/analytics/`
- ✅ **Nginx** configured for SPA routing with alias
- ✅ **Multi-stage Docker build** with health checks
- ✅ **Assets** serving from `/analytics/assets/`
- ✅ **Environment-configurable** backend URL
- ✅ **Port 80** - matches OCI Load Balancer listener

---

## 🚀 DEPLOYMENT READY

This container is production-grade and ready to deploy:
- Build validated ✅
- Routes tested ✅
- Assets verified ✅
- No errors ✅
- OCI compatible ✅

**Status: READY FOR PRODUCTION**
