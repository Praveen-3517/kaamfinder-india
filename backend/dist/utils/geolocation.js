"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearbyJobs = exports.calculateDistance = void 0;
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
exports.calculateDistance = calculateDistance;
const getNearbyJobs = (userLat, userLng, jobs, maxDistance) => {
    return jobs.filter((job) => {
        const distance = (0, exports.calculateDistance)(userLat, userLng, job.location.lat, job.location.lng);
        return distance <= maxDistance;
    });
};
exports.getNearbyJobs = getNearbyJobs;
//# sourceMappingURL=geolocation.js.map