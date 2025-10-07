'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Wifi, Car, Utensils, Accessibility } from 'lucide-react';
import { Theater } from '@/lib/types';



export default function TheatersPage() {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState(true);
    const [locationLink, setLocationLink] = useState([
        {
            name: "Downtown",
            link: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1862.7975387496751!2d106.669533!3d10.770647!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edde029b133%3A0x97e90e1306ccf98e!2zQ0dWIFPGsCBW4bqhbiBI4bqhbmg!5e1!3m2!1svi!2sus!4v1759722404981!5m2!1svi!2sus"},
        {
            name: "Mall",
            link: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3724.8948025013547!2d106.689282!3d10.827114!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f9600a6f3d%3A0x6b75d60918c5fc05!2zQ0dWIFZpbmNvbSBQaGFuIFbEg24gVHLhu4s!5e1!3m2!1svi!2sus!4v1759722978005!5m2!1svi!2sus'
        }]);
  const [directionMap, setDirectionMap] = useState<string | null>(null)

    const fetchTheaters = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/theaters');
            if (!response.ok) {
                throw new Error('Failed to fetch theaters');
            }
            const data: Theater[] = await response.json();
            setTheaters(data);
        } catch (error) {
            console.error('Error fetching theaters:', error);
        } finally {
            setLoading(false);
        }
    }

    const loadDirectionMap = (id: number) => {
        console.log(id)
        switch(id) {
            case 0:
                console.log(locationLink[0].link!)
                setDirectionMap(locationLink[0].link!);
                break;
            case 1:
                setDirectionMap(locationLink[1].link!);
                break;
            default:
                setDirectionMap(null);
                break;
        }
    }




  useEffect(() => {
      fetchTheaters();
  }, []);

    useEffect(() => {

    }, [directionMap]);

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'free wifi':
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
      case 'free parking':
      case 'valet parking':
        return <Car className="h-4 w-4" />;
      case 'food court':
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'wheelchair accessible':
        return <Accessibility className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getFacilityColor = (facility: string) => {
    if (facility.includes('IMAX') || facility.includes('4DX')) return 'bg-purple-500';
    if (facility.includes('Premium')) return 'bg-yellow-500';
    if (facility.includes('3D')) return 'bg-blue-500';
    if (facility.includes('Dolby')) return 'bg-green-500';
    return 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading theaters...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Theaters</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the magic of cinema at our state-of-the-art theaters across the city. 
            Each location offers unique amenities and the latest in movie technology.
          </p>
        </div>

        {/* Theaters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {theaters.map((theater, index) => (
            <Card key={theater._id} className="bg-gray-900 border-gray-800 overflow-hidden hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">{theater.name}</CardTitle>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {theater.location.address}, {theater.location.city}, {theater.location.state} {theater.location.zipCode}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    Open
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{theater.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{theater.contact.email}</span>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Facilities & Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {theater.facilities.map((facility, index) => (
                      <Badge 
                        key={index} 
                        className={`${getFacilityColor(facility)} text-white flex items-center space-x-1`}
                      >
                        {getFacilityIcon(facility)}
                        <span>{facility}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    View Showtimes
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={() => loadDirectionMap(index)}>
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-center">Find Us on the Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">{
                    directionMap == null ? <div>

                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Interactive map coming soon</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Use the &#34;Get Directions&#34; button on each theater card for now
                  </p> </div>:
                    <iframe src={directionMap} className="w-[1150px] h-96"   loading="lazy" ></iframe>
                  }</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Theater Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Theaters?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium Technology</h3>
                <p className="text-gray-400">
                  Experience movies like never before with IMAX, 4DX, and Dolby Atmos sound systems.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🪑</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Comfortable Seating</h3>
                <p className="text-gray-400">
                  Relax in our premium reclining seats with extra legroom and cup holders.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍿</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Food & Drinks</h3>
                <p className="text-gray-400">
                  Enjoy fresh popcorn, gourmet snacks, and a full bar at select locations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
