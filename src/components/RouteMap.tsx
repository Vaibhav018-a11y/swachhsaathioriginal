import React from 'react';
import { Map, ArrowLeft, Navigation, Truck, MapPin } from 'lucide-react';

interface RouteMapProps {
  onBack: () => void;
}

const RouteMap: React.FC<RouteMapProps> = ({ onBack }) => {
  const truckData = [
    {
      id: 'TR001',
      location: 'C-Scheme Main Road',
      status: 'Active',
      progress: '60%',
      estimatedTime: '15 mins',
      driver: 'Raj Kumar'
    },
    {
      id: 'TR002',
      location: 'Malviya Nagar Sector 2',
      status: 'Active',
      progress: '30%',
      estimatedTime: '25 mins',
      driver: 'Suresh Singh'
    },
    {
      id: 'TR003',
      location: 'Vaishali Nagar',
      status: 'Completed',
      progress: '100%',
      estimatedTime: 'Finished',
      driver: 'Ramesh Gupta'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Completed': return 'text-blue-600 bg-blue-100';
      case 'Delayed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                    <Map size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Live Route Map</h1>
                    <p className="text-gray-600">Real-time tracking of garbage collection vehicles</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative">
                <div className="text-center">
                  <Navigation size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
                  <p className="text-gray-500">Live GPS tracking of garbage collection vehicles</p>
                </div>

                {/* Simulated Map Markers */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>🟢 Active Routes</span>
                  <span>🔵 Completed Routes</span>
                  <span>🔴 Your Location</span>
                </div>
              </div>
            </div>
          </div>

          {/* Truck Status Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Active Vehicles</h2>
              
              <div className="space-y-4">
                {truckData.map((truck, index) => (
                  <div key={truck.id} className="border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Truck size={20} className="text-green-500" />
                        <span className="font-semibold text-gray-900">{truck.id}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(truck.status)}`}>
                        {truck.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} />
                        <span>{truck.location}</span>
                      </div>
                      <div>Driver: {truck.driver}</div>
                      <div>ETA: {truck.estimatedTime}</div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{truck.progress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: truck.progress }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Routes Completed</span>
                  <span className="font-bold">8/12</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Vehicles</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage</span>
                  <span className="font-bold">67%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;