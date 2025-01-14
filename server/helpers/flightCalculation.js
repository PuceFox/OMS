const { findAllAirports, findAllService } = require("../models/form");

async function createFlight(departureCity, arrivalCity, serviceType, totalPax) {
  const earthRadiusKm = 6371;

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  try {
    // let { departureCity, arrivalCity, serviceType, totalPax } = req.body;

    //const departureCity = "KNO"; //dari params
    //const arrivalCity = "DJB"; //dari params
    //const serviceType = "VIP"; //dari params
    //const totalPax = 12; //dari params

    const airportList = await findAllAirports();

    const services = await findAllService();

    //find airport object di db
    const departureAirport = airportList.find(
      (airport) => airport.iataCode === departureCity
    );

    //find airport object di db
    const arrivalAirport = airportList.find(
      (airport) => airport.iataCode === arrivalCity
    );

    //find service object di db
    const filteredServices = services.filter(
      (service) => service.type === serviceType
    );

    console.log(filteredServices, `data hasil filter`);
    console.log(serviceType, `data tipe service`);


    //???
    const sortedAssets = filteredServices[0].assets.sort(
      (a, b) => b.seatCapacity - a.seatCapacity
    );
    //??
    const suitableAssets = sortedAssets.filter(
      (asset) => asset.seatCapacity >= totalPax
    );

    const suitableAssetsSpeeds = suitableAssets.map((asset) => asset.speed);

    const speedKnots = suitableAssetsSpeeds;

    const departureLat = departureAirport.latitude;
    const departureLon = departureAirport.longitude;
    const arrivalLat = arrivalAirport.latitude;
    const arrivalLon = arrivalAirport.longitude;

    let distance = 0;
    if (departureCity !== "HLP" && arrivalCity !== "HLP") {
      const distance1 = calculateDistance(
        -6.266667,
        106.891667,
        departureLat,
        departureLon
      );
      const distance2 = calculateDistance(
        departureLat,
        departureLon,
        arrivalLat,
        arrivalLon
      );
      const distance3 = calculateDistance(
        arrivalLat,
        arrivalLon,
        -6.266667,
        106.891667
      );
      distance = distance1 + distance2 + distance3;
    } else if (departureCity !== "HLP" && arrivalCity === "HLP") {
      const distance1 = calculateDistance(
        -6.266667,
        106.891667,
        departureLat,
        departureLon
      );
      const distance2 = calculateDistance(
        departureLat,
        departureLon,
        arrivalLat,
        arrivalLon
      );
      distance = distance1 + distance2;
      console.log(distance, `dari arrival hlp`);

    } else if (departureCity === "HLP" && arrivalCity !== "HLP") {
      const distance1 = calculateDistance(
        departureLat,
        departureLon,
        arrivalLat,
        arrivalLon
      );
      const distance2 = calculateDistance(
        arrivalLat,
        arrivalLon,
        -6.266667,
        106.891667
      );
      distance = distance1 + distance2;
    }

    const flightTimes = speedKnots.map((speed) => {
      const flightTime = distance / 1.852 / speed;
      const flightTimeInMinutes = Math.ceil(flightTime * 60);
      return flightTimeInMinutes;
    });

    const results = suitableAssets.map((asset, index) => {
      const speed = speedKnots[index];
      const flightTime = distance / 1.852 / speed;
      // const hours = Math.floor(flightTime);
      // const minutes = Math.floor((flightTime - hours) * 60);
      // const flightTimeInHours = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const flightTimeInMinutes = Math.ceil(flightTime * 60);
      const priceBasic = (flightTimeInMinutes / 60) * asset.pricePerHour;
      let price = 0
      if (filteredServices === "Medevac") {
        price = Math.ceil(priceBasic + (priceBasic * 10) / 100) + 2500
      } else {
        price = Math.ceil(priceBasic + (priceBasic * 10) / 100);
      }
      return {
        serviceType,
        assetName: asset.name,
        speed,
        flightTimeInMinutes,
        price,
      };
    });

    if (!departureCity || !arrivalCity) {
      throw { name: "Wrong Airport Code" };
    }

    return results;
  } catch (err) {
    console.log(err);
    // next(err);
  }
}

module.exports = createFlight;
