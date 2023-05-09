import { useState } from 'react';
import Avatar from '../Post/Avatar';
import Addon from './addon';
import { sendRequest } from '../../API/Covoiturage/CovoiturageController';
import { Link } from 'react-router-dom';
import carpoolRequest from './carpoolRequest';

function TripCard({ id, trip, allTrips }) {
  const [requestStatus, setRequestStatus] = useState(null);
  const departureTime = new Date(trip.departureTime);
  const [showCarpoolRequests, setShowCarpoolRequests] = useState(false);

  const handleRequest = () => {
    setRequestStatus('sending');
    sendRequest(id, trip.id)
      .then(() => {
        setRequestStatus('sent');
      })
      .catch(() => {
        setRequestStatus('error');
      });
  };

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Paris',
  };

  const formattedDepartureTime = departureTime.toLocaleDateString('en-US', options).replace(',', '');
  return (
    <div class="bg-[#E6ECF0] rounded-xl lg:w-4/5 md:w-96 w-full">
      <div class="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 ">
        <div class="mb-2 font-semibold text-lg">{formattedDepartureTime}</div>
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-row justify-start">
            <Addon></Addon>
            <div className="flex flex-col">
              <div class="mx-3 font-semibold text-lg">{trip.departure}</div>
              <div class="mx-3 mt-6 font-semibold text-lg">{trip.destination}</div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <span class="font-bold text-lg">{trip.price} </span>
              <span class="font-light text-sm">Dt</span>
            </div>
            <div title="places left">
              <Avatar image={'pngegg.png'}></Avatar>
              <span class="font-bold text-lg  ml-2">{trip.numberOfPlaces - trip.numberOfPlacesTaken}</span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col lg:flex-row lg:justify-between lg:items-end items-end"
          style={!allTrips ? { display: 'none' } : { display: 'show' }}
        >
          <div className="flex flex-row">
            <Avatar size={3} image={trip.driver.profilePicture}></Avatar>
            <span class="font-light text-lg ml-2">{`${trip.driver.firstName} ${trip.driver.lastName} ${trip.driver.phone}`}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-end lg:items-center w-3/4 lg:space-x-2">
            <button
              class="bg-[#F4F5FA] py-3 rounded-full border border-[#F0F0F6] shadow-xl lg:w-1/3 w-56"
              disabled={requestStatus === 'sending' || requestStatus === 'sent'}
              onClick={handleRequest}
            >
              {requestStatus === 'sending' && 'Sending...'}
              {requestStatus === 'sent' && 'Request sent'}
              {requestStatus !== 'sending' && requestStatus !== 'sent' && 'Send request'}
            </button>

            <Link
              to={`/profile/${trip.driver.id}`}
              target="_blank"
              rel="noopener noreferrer"
              class="bg-[#F4F5FA] py-3 rounded-full border border-[#F0F0F6] shadow-xl lg:w-1/3 w-56 text-center"
            >
              <button>Contact</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
