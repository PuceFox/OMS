class Controller {
    static async createFlight(req, res, next) {

        const earthRadiusKm = 6371;

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) *
                Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return earthRadiusKm * c;
        }

        function formatTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
        }

        try {
            let { departureCity, arrivalCity, serviceType, totalPax } = req.body;

            // const airportList = fetching dari database
            // const services = fetching dari database

            // const departure = airportList.iata === departureCity
            // const arrival = airportList.iata === arrivalCity

            const speedKnots = services.assets.speeds;

            departureCity = departure.data.location
            arrivalCity = arrival.data.location
            const departureLat = departure.data.latitude
            const departureLon = departure.data.longitude
            const arrivalLat = arrival.data.latitude
            const arrivalLon = arrival.data.longitude

            let distance = 0
            if (departureCity !== "hlp" && arrivalCity !== "hlp") {
                const distance1 = calculateDistance(-6.266667, 106.891667, departureLat, departureLon);
                const distance2 = calculateDistance(departureLat, departureLon, arrivalLat, arrivalLon);
                const distance3 = calculateDistance(arrivalLat, arrivalLon, -6.266667, 106.891667);
                distance = distance1 + distance2 + distance3
            } else if (departureCity !== "hlp" && arrivalCity === "hlp") {
                const distance1 = calculateDistance(-6.266667, 106.891667, departureLat, departureLon);
                const distance2 = calculateDistance(departureLat, departureLon, arrivalLat, arrivalLon);
                distance = distance1 + distance2
            } else if (departureCity === "hlp" && arrivalCity !== "hlp") {
                const distance1 = calculateDistance(departureLat, departureLon, arrivalLat, arrivalLon);
                const distance2 = calculateDistance(arrivalLat, arrivalLon, -6.266667, 106.891667);
                distance = distance1 + distance2
            }

            const flightTime = distance / 1.852 / speedKnots;
            const flightTimeInMinutes = Math.ceil(flightTime * 60);

            const price = flightTimeInMinutes / 60 * services.assets.pricePerHour

            if (!departureCity || !arrivalCity) {
                throw { name: "Wrong Airport Code" };
            }

            const flight = await Flight.create({
                departureCity,
                arrivalCity,
                departureDate,
                returnDate,
                flightTime: formatTime(flightTimeInMinutes),
                price
            });

            // res.status(201).json({
            //     message: "Success create new flight",
            //     flight,
            // });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}