"use client";
import Head from "next/head";
import Image from "next/image";
import MapComponent from "../components/MapComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import useResponsiveImage from "../hooks/useResponsiveImage";


const isIpAddress = (inputValue) => {
  // Regular expression for validating an IPv4 address
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // Regular expression for validating an IPv6 address
  const ipv6Regex = /([a-f0-9:]+:+)+[a-f0-9]+/i;
  return ipv4Regex.test(inputValue) || ipv6Regex.test(inputValue);
};


export default function MainComponent(){
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 }); // Default to London
  const [address, setAddress] = useState("0.0.0.0");

  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [geoNameId, setGeoNameId] = useState("");

  const [timezone, setTimezone] = useState("+0");
  const [isp, setIsp] = useState("Starlink");

  const [searchValue, setSearchValue] = useState("");

  const imageSrc = useResponsiveImage();

    
    
  const fetchLocation = async (inputValue) => {
    try {
      const params = isIpAddress(inputValue)
        ? { ip: inputValue }
        : { domain: inputValue };

      const response = await axios.get("/api/proxy", { params });

      const {
        latitude,
        longitude,
        region_name,
        city_name,
        zip_code,
        time_zone,
        ip: responseIp,
        as,
      } = response.data;

      setLocation({ lat: latitude, lng: longitude });
      setRegion(region_name);
      setCity(city_name);
      setGeoNameId(zip_code);
      setAddress(responseIp);
      setIsp(as);
      setTimezone(time_zone);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLocation(searchValue);
  };

    
    
  useEffect(() => {
    const fetchClientIp = async () => {
      try {
        const response = await axios.get("/api/getClientIp");
          const clientIp = response.data.ip;
          console.log(clientIp)
         fetchLocation(clientIp);
      } catch (error) {
        console.error("Error fetching client IP:", error);
      }
    };

    fetchClientIp();
  
  }, []);



  return (
    <div>
      <Head>
        <title>Leaflet Map in Next.js</title>
      </Head>
      <div className="relative max-w-screen z-10 flex justify-center items-end ">
        <Image
          alt="bg"
          height={500}
          width={1080}
          src={imageSrc}
          className="w-full"
        />
        <div className="absolute top-[20%] w-auto max-w-screen flex justify-center text-white text-2xl font-bold">
          IP Address Tracker
        </div>
        <div className="absolute top-[40%] w-screen flex justify-center ">
          <input
            type="text"
            className="md:w-1/3 py-3 px-4 rounded-l-xl focus:outline-none "
            placeholder="Type any IP Address or Domain Name to track"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="bg-black px-5 rounded-r-xl "
            onClick={handleSearch}
          >
            <Image
              alt="arrow"
              height={50}
              width={50}
              src="/icon-arrow.svg"
              className="w-4 h-4"
            />
          </button>
        </div>
        <div className="absolute md:-bottom-24 top-[70%] md:top-auto bg-white md:h-36 lg:h-48 h-auto lg:w-[70%] w-[75%] shadow-2xl rounded-xl text-2xl px-5 flex flex-col justify-center">
          <div className="flex flex-col gap-5 lg:gap-0 md:flex-row justify-between items text-black w-full text-xl font-bold md:pl-10 py-8 md:py-0 text-center lg:text-left">
            <div className="lg:w-1/4 flex flex-col">
              <h1 className="text-sm lg:text-lg text-gray-500 mb-1">
                IP Address:
              </h1>
              <h1>{address}</h1>
            </div>
            <div className="lg:w-1/4 flex flex-col">
              <h1 className="text-sm lg:text-lg text-gray-500 mb-1">
                Location:
              </h1>
              <div className="flex flex-col justify-center lg:justify-start">
                <h1>{city},</h1>
                <div className="flex justify-center">
                  <h1>{region},</h1>
                  <h1>{geoNameId}</h1>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4">
              <h1 className="text-sm lg:text-lg text-gray-500 mb-1">
                Timezone:
              </h1>
              <h1>GMT{timezone}</h1>
            </div>
            <div className="lg:w-1/4">
              <h1 className="text-sm lg:text-lg text-gray-500 mb-1">ISP:</h1>
              <h1>{isp}</h1>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <MapComponent location={location} />
    </div>
  );
};


