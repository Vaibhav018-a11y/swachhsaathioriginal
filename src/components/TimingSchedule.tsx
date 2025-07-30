import React from 'react';
import { Clock, MapPin, Truck, ArrowLeft } from 'lucide-react';

interface TimingScheduleProps {
  onBack: () => void;
}

const TimingSchedule: React.FC<TimingScheduleProps> = ({ onBack }) => {
  const scheduleData = [
    {
      area: 'C-Scheme',
      morningTime: '6:00 AM - 8:00 AM',
      eveningTime: '5:00 PM - 7:00 PM',
      status: 'On Time',
      nextPickup: '6:15 AM',
      distance: '0.5 km away'
    },
    {
      area: 'Malviya Nagar',
      morningTime: '7:00 AM - 9:00 AM',
      eveningTime: '6:00 PM - 8:00 PM',
      status: 'Delayed',
      nextPickup: '7:30 AM',
      distance: '1.2 km away'
    },
    {
      area: 'Vaishali Nagar',
      morningTime: '8:00 AM - 10:00 AM',
      eveningTime: '7:00 PM - 9:00 PM',
      status: 'Completed',
      nextPickup: 'Tomorrow 8:00 AM',
      distance: '2.1 km away'
    },
    {
      area: 'Mansarovar',
      morningTime: '6:30 AM - 8:30 AM',
      eveningTime: '5:30 PM - 7:30 PM',
      status: 'In Progress',
      nextPickup: 'Now',
      distance: '0.8 km away'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time': return 'text-green-600 bg-green-100';
      case 'Delayed': return 'text-red-600 bg-red-100';
      case 'Completed': return 'text-blue-600 bg-blue-100';
      case 'In Progress': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Timing Schedule</h1>
              <p className="text-gray-600">Real-time garbage collection schedule for your area</p>
            </div>
          </div>

          <div className="grid gap-6">
            {scheduleData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <MapPin size={20} className="text-green-500" />
                      <h3 className="text-xl font-semibold text-gray-900">{item.area}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>Morning: {item.morningTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>Evening: {item.eveningTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end space-y-2">
                    <div className="flex items-center space-x-2 text-green-600 font-medium">
                      <Truck size={16} />
                      <span>Next: {item.nextPickup}</span>
                    </div>
                    <div className="text-sm text-gray-500">{item.distance}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-500 text-white rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">Areas Covered Today</h3>
            <div className="text-3xl font-bold">12/15</div>
            <p className="text-green-100 text-sm">3 areas remaining</p>
          </div>
          
          <div className="bg-blue-500 text-white rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">Average Delay</h3>
            <div className="text-3xl font-bold">15 min</div>
            <p className="text-blue-100 text-sm">Better than yesterday</p>
          </div>
          
          <div className="bg-purple-500 text-white rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">Next Update</h3>
            <div className="text-3xl font-bold">5 min</div>
            <p className="text-purple-100 text-sm">Auto-refresh enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimingSchedule;