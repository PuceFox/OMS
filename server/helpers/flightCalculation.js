

async function createFlight(req, res, next) {

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
        // let { departureCity, arrivalCity, serviceType, totalPax } = req.body;

        const departureCity = "KNO" //dari params
        const arrivalCity = "DJB" //dari params
        const serviceType = "VIP" //dari params
        const totalPax = 12 //dari params

        const airportList = [
            {
                "city": "Banda Aceh",
                "airport": "Sultan Iskandar Muda International Airport",
                "longitude": 95.420556,
                "latitude": 5.523611,
                "iataCode": "BTJ"
            },
            {
                "city": "Medan",
                "airport": "Kualanamu International Airport",
                "longitude": 98.875,
                "latitude": 3.6425,
                "iataCode": "KNO"
            },
            {
                "city": "Padang",
                "airport": "Minangkabau International Airport",
                "longitude": 100.282222,
                "latitude": -0.786667,
                "iataCode": "PDG"
            },
            {
                "city": "Pekanbaru",
                "airport": "Sultan Syarif Kasim II International Airport",
                "longitude": 101.445278,
                "latitude": 0.456667,
                "iataCode": "PKU"
            },
            {
                "city": "Batam",
                "airport": "Hang Nadim International Airport",
                "longitude": 104.118611,
                "latitude": 1.121111,
                "iataCode": "BTH"
            },
            {
                "city": "Palembang",
                "airport": "Sultan Mahmud Badaruddin II International Airport",
                "longitude": 104.705556,
                "latitude": -2.898333,
                "iataCode": "PLM"
            },
            {
                "city": "Bandar Lampung",
                "airport": "Radin Inten II International Airport",
                "longitude": 105.242778,
                "latitude": -5.242222,
                "iataCode": "TKG"
            },
            {
                "city": "Jakarta",
                "airport": "Soekarno-Hatta International Airport",
                "longitude": 106.655556,
                "latitude": -6.125,
                "iataCode": "CGK"
            },
            {
                "city": "Jakarta",
                "airport": "Halim Perdanakusuma International Airport",
                "longitude": 106.891667,
                "latitude": -6.266667,
                "iataCode": "HLP"
            },
            {
                "city": "Bandung",
                "airport": "Husein Sastranegara International Airport",
                "longitude": 107.576111,
                "latitude": -6.900556,
                "iataCode": "BDO"
            },
            {
                "city": "Semarang",
                "airport": "Achmad Yani International Airport",
                "longitude": 110.374167,
                "latitude": -6.971389,
                "iataCode": "SRG"
            },
            {
                "city": "Yogyakarta",
                "airport": "Adisutjipto International Airport",
                "longitude": 110.437778,
                "latitude": -7.783333,
                "iataCode": "JOG"
            },
            {
                "city": "Surabaya",
                "airport": "Juanda International Airport",
                "longitude": 112.786111,
                "latitude": -7.379167,
                "iataCode": "SUB"
            },
            {
                "city": "Banyuwangi",
                "airport": "Banyuwangi Airport",
                "longitude": 114.366667,
                "latitude": -8.3,
                "iataCode": "BWX"
            },
            {
                "city": "Pontianak",
                "airport": "Sultan Syarif Abdurrahman Airport",
                "longitude": 109.371111,
                "latitude": 0.15,
                "iataCode": "PNK"
            },
            {
                "city": "Palangka Raya",
                "airport": "Tjilik Riwut Airport",
                "longitude": 113.933333,
                "latitude": -2.216667,
                "iataCode": "PKY"
            },
            {
                "city": "Banjarmasin",
                "airport": "Syamsudin Noor Airport",
                "longitude": 114.755556,
                "latitude": -3.442222,
                "iataCode": "BDJ"
            },
            {
                "city": "Balikpapan",
                "airport": "Sultan Aji Muhammad Sulaiman Sepinggan Airport",
                "longitude": 116.887778,
                "latitude": -1.268333,
                "iataCode": "BPN"
            },
            {
                "city": "Makassar",
                "airport": "Sultan Hasanuddin International Airport",
                "longitude": 119.554167,
                "latitude": -5.063333,
                "iataCode": "UPG"
            },
            {
                "city": "Manado",
                "airport": "Sam Ratulangi International Airport",
                "longitude": 124.678333,
                "latitude": 1.538333,
                "iataCode": "MDC"
            },
            {
                "city": "Ambon",
                "airport": "Pattimura Airport",
                "longitude": 128.089167,
                "latitude": -3.710556,
                "iataCode": "AMQ"
            },
            {
                "city": "Ternate",
                "airport": "Sultan Baab Ullah Airport",
                "longitude": 127.381667,
                "latitude": 0.831667,
                "iataCode": "TTE"
            },
            {
                "city": "Kupang",
                "airport": "El Tari Airport",
                "longitude": 123.671111,
                "latitude": -10.171667,
                "iataCode": "KOE"
            },
            {
                "city": "Mataram",
                "airport": "Lombok International Airport",
                "longitude": 116.273333,
                "latitude": -8.743333,
                "iataCode": "LOP"
            },
            {
                "city": "Bengkulu",
                "airport": "Fatmawati Soekarno Airport",
                "longitude": 102.336111,
                "latitude": -3.863333,
                "iataCode": "BKS"
            },
            {
                "city": "Jambi",
                "airport": "Sultan Thaha Airport",
                "longitude": 103.644167,
                "latitude": -1.638333,
                "iataCode": "DJB"
            },
            {
                "city": "Pangkal Pinang",
                "airport": "Depati Amir Airport",
                "longitude": 106.138333,
                "latitude": -2.161667,
                "iataCode": "PGK"
            },
            {
                "city": "Tanjung Pandan",
                "airport": "Buluh Tumbang Airport",
                "longitude": 107.755556,
                "latitude": -2.733333,
                "iataCode": "TJQ"
            },
            {
                "city": "Sampit",
                "airport": "Sampit Airport",
                "longitude": 113.066667,
                "latitude": -2.55,
                "iataCode": "SMQ"
            },
            {
                "city": "Palu",
                "airport": "Mutiara SIS Al-Jufrie Airport",
                "longitude": 119.911111,
                "latitude": -0.691667,
                "iataCode": "PLW"
            },
            {
                "city": "Gorontalo",
                "airport": "Jalaluddin Airport",
                "longitude": 122.85,
                "latitude": 0.633333,
                "iataCode": "GTO"
            },
            {
                "city": "Merauke",
                "airport": "Mopah Airport",
                "longitude": 139.666667,
                "latitude": -8.516667,
                "iataCode": "MKQ"
            },
            {
                "city": "Jayapura",
                "airport": "Sentani Airport",
                "longitude": 140.516667,
                "latitude": -2.583333,
                "iataCode": "DJJ"
            },
            {
                "city": "Biak",
                "airport": "Frans Kaisiepo Airport",
                "longitude": 136.108333,
                "latitude": -1.191667,
                "iataCode": "BIK"
            },
            {
                "city": "Sorong",
                "airport": "Dominique Edward Osok Airport",
                "longitude": 131.283333,
                "latitude": -0.9,
                "iataCode": "SOQ"
            },
            {
                "city": "Manokwari",
                "airport": "Rendani Airport",
                "longitude": 134.05,
                "latitude": -0.883333,
                "iataCode": "MKW"
            },
            {
                "city": "Fakfak",
                "airport": "Fakfak Airport",
                "longitude": 132.283333,
                "latitude": -2.916667,
                "iataCode": "FKQ"
            },
            {
                "city": "Kaimana",
                "airport": "Kaimana Airport",
                "longitude": 133.683333,
                "latitude": -3.65,
                "iataCode": "KNG"
            },
            {
                "city": "Tambolaka",
                "airport": "Tambolaka Airport",
                "longitude": 119.233333,
                "latitude": -9.4,
                "iataCode": "TMC"
            },
            {
                "city": "Waingapu",
                "airport": "Waingapu Airport",
                "longitude": 120.3,
                "latitude": -9.65,
                "iataCode": "WGP"
            },
            {
                "city": "Bima",
                "airport": "Bima Airport",
                "longitude": 118.683333,
                "latitude": -8.533333,
                "iataCode": "BMU"
            },
            {
                "city": "Sumbawa Besar",
                "airport": "Sumbawa Besar Airport",
                "longitude": 117.45,
                "latitude": -8.5,
                "iataCode": "SWQ"
            },
            {
                "city": "Labuanbajo",
                "airport": "Komodo Airport",
                "longitude": 119.883333,
                "latitude": -8.483333,
                "iataCode": "LBJ"
            },
            {
                "city": "Ruteng",
                "airport": "Ruteng Airport",
                "longitude": 120.45,
                "latitude": -8.6,
                "iataCode": "RTG"
            },
            {
                "city": "Bajawa",
                "airport": "Bajawa Airport",
                "longitude": 120.966667,
                "latitude": -8.8,
                "iataCode": "BJW"
            },
            {
                "city": "Ende",
                "airport": "H. Hasan Aroeboesman Airport",
                "longitude": 121.65,
                "latitude": -8.85,
                "iataCode": "ENE"
            },
            {
                "city": "Maumere",
                "airport": "Frans Seda Airport",
                "longitude": 122.233333,
                "latitude": -8.633333,
                "iataCode": "MOF"
            },
            {
                "city": "Larantuka",
                "airport": "Gewayantana Airport",
                "longitude": 122.983333,
                "latitude": -8.283333,
                "iataCode": "LKA"
            },
            {
                "city": "Kupang",
                "airport": "El Tari Airport",
                "longitude": 123.671111,
                "latitude": -10.171667,
                "iataCode": "KOE"
            },
            {
                "city": "Atambua",
                "airport": "A. A. Bere Tallo Airport",
                "longitude": 124.883333,
                "latitude": -9.083333,
                "iataCode": "ABU"
            },
            {
                "city": "Alor",
                "airport": "Mali Airport",
                "longitude": 124.533333,
                "latitude": -8.133333,
                "iataCode": "ARD"
            },
            {
                "city": "Saumlaki",
                "airport": "Olilit Airport",
                "longitude": 131.3,
                "latitude": -7.983333,
                "iataCode": "SXK"
            },
            {
                "city": "Tual",
                "airport": "Karel Sadsuitubun Airport",
                "longitude": 132.75,
                "latitude": -5.65,
                "iataCode": "LUV"
            },
            {
                "city": "Langgur",
                "airport": "Dumatubin Airport",
                "longitude": 132.733333,
                "latitude": -5.65,
                "iataCode": "LUV"
            },
            {
                "city": "Dobo",
                "airport": "Dobo Airport",
                "longitude": 134.216667,
                "latitude": -5.766667,
                "iataCode": "DOB"
            },
            {
                "city": "Merauke",
                "airport": "Mopah Airport",
                "longitude": 139.666667,
                "latitude": -8.516667,
                "iataCode": "MKQ"
            },

            {
                "city": "Sorong",
                "airport": "Dominique Edward Osok Airport",
                "longitude": 131.283333,
                "latitude": -0.9,
                "iataCode": "SOQ"
            },
            {
                "city": "Manokwari",
                "airport": "Rendani Airport",
                "longitude": 134.05,
                "latitude": -0.883333,
                "iataCode": "MKW"
            },
            {
                "city": "Biak",
                "airport": "Frans Kaisiepo Airport",
                "longitude": 136.108333,
                "latitude": -1.191667,
                "iataCode": "BIK"
            },
            {
                "city": "Nabire",
                "airport": "Nabire Airport",
                "longitude": 135.5,
                "latitude": -3.366667,
                "iataCode": "NBX"
            },
            {
                "city": "Timika",
                "airport": "Moses Kilangin Airport",
                "longitude": 136.883333,
                "latitude": -4.533333,
                "iataCode": "TIM"
            },
            {
                "city": "Wamena",
                "airport": "Wamena Airport",
                "longitude": 138.95,
                "latitude": -4.1,
                "iataCode": "WMX"
            },
            {
                "city": "Merauke",
                "airport": "Mopah Airport",
                "longitude": 139.666667,
                "latitude": -8.516667,
                "iataCode": "MKQ"
            },
            {
                "city": "Jayapura",
                "airport": "Sentani Airport",
                "longitude": 140.516667,
                "latitude": -2.583333,
                "iataCode": "DJJ"
            },
            {
                "city": "Sarmi",
                "airport": "Sarmi Airport",
                "longitude": 138.75,
                "latitude": -1.866667,
                "iataCode": "ZRM"
            },
            {
                "city": "Serui",
                "airport": "Sudjarwo Tjondronegoro Airport",
                "longitude": 136.233333,
                "latitude": -1.883333,
                "iataCode": "ZRI"
            },
            {
                "city": "Tahuna",
                "airport": "Naha Airport",
                "longitude": 125.5,
                "latitude": 3.6,
                "iataCode": "NAH"
            },
            {
                "city": "Melangguane",
                "airport": "Melangguane Airport",
                "longitude": 125.483333,
                "latitude": 3.6,
                "iataCode": "MNA"
            },
            {
                "city": "Talaud",
                "airport": "Melonguane Airport",
                "longitude": 126.7,
                "latitude": 4.033333,
                "iataCode": "MNA"
            },
            {
                "city": "Morotai",
                "airport": "Pitu Airport",
                "longitude": 128.333333,
                "latitude": 2.033333,
                "iataCode": "OTI"
            },
            {
                "city": "Ternate",
                "airport": "Sultan Baab Ullah Airport",
                "longitude": 127.381667,
                "latitude": 0.831667,
                "iataCode": "TTE"
            },
            {
                "city": "Labuha",
                "airport": "Oesman Sadik Airport",
                "longitude": 127.5,
                "latitude": 0.616667,
                "iataCode": "LAH"
            },
            {
                "city": "Bacan",
                "airport": "Bacan Airport",
                "longitude": 127.5,
                "latitude": 0.7,
                "iataCode": "BCN"
            },
            {
                "city": "Obi",
                "airport": "Obi Airport",
                "longitude": 127.733333,
                "latitude": 1.55,
                "iataCode": "OBI"
            },
            {
                "city": "Namlea",
                "airport": "Namlea Airport",
                "longitude": 127.083333,
                "latitude": 3.25,
                "iataCode": "WNP"
            },
            {
                "city": "Ambon",
                "airport": "Pattimura Airport",
                "longitude": 128.089722,
                "latitude": -3.710556,
                "iataCode": "AMQ"
            },
            {
                "city": "Jember",
                "airport": "Notohadinegoro Airport",
                "longitude": 113.7,
                "latitude": -8.3,
                "iataCode": "JBB"
            },
            {
                "city": "Malang",
                "airport": "Abdul Rachman Saleh Airport",
                "longitude": 112.7,
                "latitude": -7.933333,
                "iataCode": "MLG"
            },
            {
                "city": "Probolinggo",
                "airport": "Probolinggo Airport",
                "longitude": 113.166667,
                "latitude": -7.783333,
                "iataCode": "BLL"
            },
            {
                "city": "Sumenep",
                "airport": "Trunojoyo Airport",
                "longitude": 114.033333,
                "latitude": -7.033333,
                "iataCode": "SUP"
            },
            {
                "city": "Cirebon",
                "airport": "Penggung Airport",
                "longitude": 108.55,
                "latitude": -6.75,
                "iataCode": "CBN"
            },
            {
                "city": "Majalengka",
                "airport": "Kertajati International Airport",
                "longitude": 108.166667,
                "latitude": -6.666667,
                "iataCode": "KJT"
            },
            {
                "city": "Pangandaran",
                "airport": "Nusawiru Airport",
                "longitude": 108.65,
                "latitude": -7.65,
                "iataCode": "PJG"
            },
            {
                "city": "Tasikmalaya",
                "airport": "Wiriadinata Airport",
                "longitude": 108.25,
                "latitude": -7.35,
                "iataCode": "TSY"
            },
            {
                "city": "Bengkulu",
                "airport": "Fatmawati Soekarno Airport",
                "longitude": 102.333333,
                "latitude": -3.866667,
                "iataCode": "BKS"
            },
            {
                "city": "Kerinci",
                "airport": "Depati Parbo Airport",
                "longitude": 101.466667,
                "latitude": -2.083333,
                "iataCode": "KRC"
            },
            {
                "city": "Sibolga",
                "airport": "Ferdinand Lumban Tobing Airport",
                "longitude": 98.883333,
                "latitude": 1.55,
                "iataCode": "FLZ"
            },
            {
                "city": "Gunung Sitoli",
                "airport": "Binaka Airport",
                "longitude": 97.7,
                "latitude": 1.166667,
                "iataCode": "GNS"
            }
        ] //fetching database
        const services = [
            {
                "type": "VIP",
                "assets": [
                    {
                        "name": "Challenger 650",
                        "speed": 425,
                        "pricePerHour": 10000,
                        "seatCapacity": 11
                    },
                    {
                        "name": "Gulfstream G150",
                        "speed": 430,
                        "pricePerHour": 5500,
                        "seatCapacity": 6
                    },
                    {
                        "name": "Legacy 600",
                        "speed": 420,
                        "pricePerHour": 9000,
                        "seatCapacity": 13
                    },
                    {
                        "name": "Hawker 900",
                        "speed": 400,
                        "pricePerHour": 5000,
                        "seatCapacity": 7
                    },
                    {
                        "name": "King Air 350",
                        "speed": 230,
                        "pricePerHour": 3400,
                        "seatCapacity": 9
                    }
                ]
            },
            {
                "type": "Medevac",
                "assets": [
                    {
                        "name": "Hawker 900",
                        "speed": 400,
                        "pricePerHour": 4700,
                        "seatCapacity": 3
                    },
                    {
                        "name": "Hawker 400",
                        "speed": 410,
                        "pricePerHour": 4000,
                        "seatCapacity": 2
                    },
                    {
                        "name": "Learjet 45",
                        "speed": 415,
                        "pricePerHour": 4500,
                        "seatCapacity": 2
                    },
                    {
                        "name": "King Air 350",
                        "speed": 230,
                        "pricePerHour": 3500,
                        "seatCapacity": 3
                    },
                    {
                        "name": "Bell 206",
                        "speed": 110,
                        "pricePerHour": 2800,
                        "seatCapacity": 1
                    }
                ]
            },
            {
                "type": "City-tour",
                "assets": [
                    {
                        "name": "Bell 206",
                        "speed": 110,
                        "pricePerHour": 3000,
                        "seatCapacity": 4
                    },
                    {
                        "name": "Eurocopter EC 145",
                        "speed": 130,
                        "pricePerHour": 4500,
                        "seatCapacity": 8
                    },
                    {
                        "name": "Bell 429",
                        "speed": 130,
                        "pricePerHour": 5000,
                        "seatCapacity": 5
                    }
                ]
            }
        ] //fetching database

        const departureAirport = airportList.find((airport) => airport.iataCode === departureCity);
        const arrivalAirport = airportList.find((airport) => airport.iataCode === arrivalCity);

        const filteredServices = services.filter((service) => service.type === serviceType);
        const sortedAssets = filteredServices[0].assets.sort((a, b) => b.seatCapacity - a.seatCapacity);

        const suitableAssets = sortedAssets.filter((asset) => asset.seatCapacity >= totalPax);
        const suitableAssetsSpeeds = suitableAssets.map((asset) => asset.speed);

        const speedKnots = suitableAssetsSpeeds

        const departureLat = departureAirport.latitude;
        const departureLon = departureAirport.longitude;
        const arrivalLat = arrivalAirport.latitude;
        const arrivalLon = arrivalAirport.longitude;

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
            const priceBasic = (flightTimeInMinutes / 60 * asset.pricePerHour)
            const price = Math.ceil(priceBasic + (priceBasic * 10 / 100))
            return { serviceType, assetName: asset.name, speed, flightTimeInMinutes, price };
        });

        console.log(flightTimes, `flight time`);
        console.log(results, `data results`);

        if (!departureCity || !arrivalCity) {
            throw { name: "Wrong Airport Code" };
        }

        // const flight = await Flight.create({
        //     departureCity,
        //     arrivalCity,
        //     departureDate,
        //     returnDate,
        //     flightTime: formatTime(flightTimeInMinutes),
        //     price
        // });

        // res.status(201).json({
        //     message: "Success create new flight",
        //     flight,
        // });
    } catch (err) {
        console.log(err);
        // next(err);
    }
}


createFlight()